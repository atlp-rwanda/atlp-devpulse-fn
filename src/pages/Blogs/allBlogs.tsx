import React, { useEffect, useState,ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBlogs, getBlogsByAuthor } from "../../redux/actions/blogActions";
import { createBlogAction } from "../../redux/actions/blogActions";
import * as icons from "react-icons/ai";
import blogSchema from "../../validation/blogSchema"
import { Spinner } from "flowbite-react";
import { handleBlogImageUpload } from "../../utils/imageUploadUtil";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import AllBlogsSkeleton from "../../skeletons/allBlogsSkeleton";
import SingleBlogSkeleton from "skeletons/singleBlogSkeleton";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlineClose } from 'react-icons/ai';
import HideUnhideButton from "../../components/hideBlog"

 interface Comment {
    _id: String
    content: String
    blog: Blog
    createdAt: String
  }
  interface Like {
    _id: String
    blog: Blog
    created_at: String
  }

   interface User {
    _id: String;
    createdAt: String;
    firstname: String;
    lastname: String;
    email: String;
    role: String;
    profile: String;
    isEmailVerified: Boolean;
    status: Boolean;
    resetToken: String;
  }

 interface Blog {
    _id: String;
    title: String;
    content: String;
    coverImage: String;
    images:[String];
    author: User;
    tags: [String];
    isHidden: Boolean;
    created_at: String;
    updated_at: String;
    likes: [Like];
    comments: [Comment];
  }

  interface SubmitData {
  title: string;
  content: string;
  tags: string[];
  coverImage: File | string;
  images: (File | string)[];
}


const AllBlogs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [addNewBlogModal, setAddNewBlogModal] = useState(false);
  const [addingBlog, setAddingBlog] = useState(false);
  const [manyImaages, setManyImages] = useState(false);
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [submitData, setSubmitData] = useState<SubmitData>({
    title: "",
    content: "",
    tags: [],
    coverImage:"",
    images: [],
  });
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    tags: [""],
    coverImage:"",
    images: [""],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('roleName');
  
  const { data ,isLoading} = useAppSelector((state) => ({data:state.blogs.data,isLoading:state.blogs.isLoading}));

   useEffect(() => {
    if (role == "applicant" || role == "trainee") {
      dispatch(getBlogsByAuthor(String(userId)));
    } else {
      dispatch(getAllBlogs());
    }
  }, [dispatch]);

  useEffect(() => {
    setBlogs(data);
  }, [data]);
  
  const handleBlogClick = (blogId: string) => {
    navigate(`${blogId}`);
  };
  
  
 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  if (e.target instanceof HTMLInputElement && e.target.files) {
    const files = e.target.files;

    if (name === "coverImage" && files.length > 0) {
      setSubmitData((prevState) => ({
        ...prevState,
        coverImage: files[0] 
      }));
    } else if (name === "images") {
        if (files.length > 4) {
          setManyImages(true);
        return;
      }
      setSubmitData((prevState) => ({
        ...prevState,
        images: Array.from(files) 
      }));
      setManyImages(false);
    }
  } else if (name === "tags") {
    const tagArray = value.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
    setSubmitData((prevState) => ({ ...prevState, tags: tagArray }));
    setTags(value);
  } else {
    setSubmitData((prevState) => ({ ...prevState, [name]: value }));
  } 
  } 

   const Open = () => {
    setAddNewBlogModal(true);
  };
  const removeModal = () => {
    let newState = !addNewBlogModal;
    setAddNewBlogModal(newState);

    setSubmitData({
      title: "",
      content: "",
      tags: [""],
      coverImage: "",
      images: [""],
    });

    setErrors({
      title: "",
      content: "",
      tags: [""],
      coverImage: "",
      images: [""],
    });
  };
  const validateForm = (data: any, schema: any) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) {
      //@ts-ignore
      setErrors({});
      return true;
    }

    const newErrors = {};
    error.details.forEach((detail: any) => {
      newErrors[detail.path[0]] = detail.message;
    });

    //@ts-ignore
    setErrors(newErrors);
    return false;
  };

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  setIsUploading(true);

   const isValid = validateForm(submitData, blogSchema);
  if (!isValid) {
    setIsUploading(false);
    return;
  }
   
  try {
    let coverImageUrl:string|null="";
    let imageUrls: string[] = [];

     if (submitData.coverImage instanceof File) {
      coverImageUrl = await handleBlogImageUpload(
        submitData.coverImage,
        (url) => {
          coverImageUrl = url;
        },
        setIsUploading
      );
    }

    if (submitData.images.length > 0) {
      const results = await Promise.all(
        submitData.images.map(async (file) => {
          if (file instanceof File) {
            return handleBlogImageUpload(file, (url) => url, setIsUploading);
          }
          return file; 
        })
      );
      imageUrls = results.filter((url): url is string => url !== null);
    }

    const obj = {
      title: submitData.title,
      content: submitData.content,
      coverImage: coverImageUrl,
      images: imageUrls,
      author: userId,
      tags: submitData.tags || []
    };
    setAddingBlog(true);
    await dispatch(createBlogAction(obj));
    setAddingBlog(false);
    removeModal();

    if (role == "applicant" || role == "trainee") {
      dispatch(getBlogsByAuthor(String(userId)));
    } else {
      dispatch(getAllBlogs());
    }
    
  } catch (error) {
    console.log(error);
  } finally {
    setIsUploading(false);
  }
 };

 const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ]
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'image',
  'align',
  'color', 'background'
];

const handleContentChange = (value: string) => {
  setContent(value);
  
  // Simulate an event object to match the expected input of handleInputChange
  const syntheticEvent = {
    target: {
      name: 'content',
      value: value
    }
  } as ChangeEvent<HTMLTextAreaElement>;

  handleInputChange(syntheticEvent);
};

  
  
  return (
    <div className="min-h-screen bg-white w-full dark:bg-slate-900 dark:text-white p-6">
      {addNewBlogModal && (
        <div className="fixed inset-0 mt-16 p-0 flex items-center justify-center bg-black bg-opacity-20 dark:bg-opacity-40">
          <div className="bg-white dark:bg-dark-bg w-11/12 md:w-3/5 lg:w-2/5 rounded-lg p-6 max-h-[600px] overflow-y-scroll">
            <div className="w-full flex mb-2 items-center justify-between">
              <h3 className="font-bold text-m dark:text-white ">
                CREATE A NEW BLOG
              </h3>
              <icons.AiOutlineClose
                className="float-right text-3xl cursor-pointer"
                onClick={() => removeModal()}
              />
            </div>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex flex-col">
                <label className="font-semibold text-sm">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  value={submitData.title}
                  maxLength={200}
                  onChange={handleInputChange}
                  className="border focus:ring-2 focus:ring-white dark:bg-black rounded px-4 py-2"
                  placeholder="Enter Blog Title"
                />
                {errors.title && (
                  <span className="text-red-500 text-xs">{errors.title}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm">Blog Content</label>
                <ReactQuill
                  value={content}
                  onChange={handleContentChange}
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  className="border rounded dark:bg-black"
                  placeholder="Enter Blog Content"
                />
                {errors.content && (
                  <span className="text-red-500 text-xs">{errors.content}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={tags}
                  maxLength={100}
                  onChange={handleInputChange}
                  className="border rounded focus:ring-2 focus:ring-white dark:bg-black px-4 py-2"
                  placeholder="Tags"
                />
                {errors.tags && (
                  <span className="text-red-500 text-xs">{errors.tags}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm">Cover Image</label>
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="border rounded focus:ring-2 focus:ring-white dark:bg-black px-4 py-2"
                />
                {errors.coverImage && (
                  <span className="text-red-500 text-xs">
                    {errors.coverImage}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-sm">
                  Blog Images(Maximum 4)
                </label>
                <input
                  type="file"
                  name="images"
                  multiple
                  maxLength={4}
                  accept="image/*"
                  onChange={handleInputChange}
                  className="border rounded dark:bg-black px-4 py-2"
                  placeholder="Upload images"
                />
                {manyImaages && (
                  <span className="text-red-500 text-xs">
                    Images should not exceed 4
                  </span>
                )}
                {errors.images && (
                  <span className="text-red-500 text-xs">{errors.images}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isUploading || addingBlog}
                className="w-1/3 rounded w-15 px-5 py-1 mt-10 bg-green text-white transition-colors hover:bg-dark-frame-bg hover:text-green hover:border hover:border-green"
              >
                {isUploading || (addingBlog && <Spinner />)}{" "}
                {isUploading || addingBlog ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex w-2/5 bg-gray-100 dark:bg-dark-tertiary rounded-xl h-10 items-center border-2">
        <input
          type="text"
          placeholder="Search Blogs"
          className="bg-transparent outline-none px-2 text-gray-700 dark:text-gray-300 w-96"
        />
        <button className="px-4">
          <icons.AiOutlineSearch className="cursor-pointer text-cyan-300" />
        </button>
      </div>
      <div className="max-w-6xl mt-2 mx-auto">
        <div className="mb-6 w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold">All Blogs</h1>

          <div className="w-full sm:w-auto">
            <button
              disabled={isLoading}
              onClick={Open}
              className={`flex items-center justify-center w-full sm:w-auto ${
                isLoading ? "bg-emerald-300" : "bg-primary dark:bg-[#56C870]"
              }  rounded-md py-2 px-4 text-white font-medium cursor-pointer hover:opacity-90 transition-opacity`}
            >
              <icons.AiOutlinePlus className="mr-2" /> Blog
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <AllBlogsSkeleton />
          ) : blogs?.length ? (
            blogs.map((blog: any) => (
              <div
                key={blog.id}
                onClick={() => handleBlogClick(blog.id)}
                className="flex items-center gap-4  bg-slate-100 dark:bg-slate-800 px-4 hover:bg-slate-50 py-2 rounded-lg dark:hover:bg-slate-700 transition-colors cursor-pointer group"
              >
                <div className="h-fit w-1/6 rounded-lg">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-28 h-28 object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow w-4/6 px-2">
                  <p className="text-lg font-medium break-words whitespace-normal overflow-wrap-break-word transition-colors">
                    {blog.title}
                  </p>
                  <div
                    className="dark:text-slate-400 text-slate-800 break break-words text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></div>
                </div>
                <div className="w-1/6 flex flex-col items-end text-sm dar:text-slate-400">
                  <span>{`${blog.author.firstname} ${blog.author.lastname}`}</span>
                  <span>
                    {new Date(Number(blog.created_at)).toLocaleString()}
                  </span>
                </div>
                {role === "admin" || role === "superAdmin" ? (
                  <HideUnhideButton blogId={blog.id} isHidden={blog.isHidden} />
                ) : null}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 dark:text-gray-500">
              <div className="dark:bg-gray-100 rounded-full p-6 mb-4 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m9-5a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold dark:text-gray-700 mb-2">
                No Blogs Available
              </h2>
              <p className="dark:text-gray-500 text-sm mb-6">
                It looks like there are no blog posts yet. Check back soon for
                updates!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
