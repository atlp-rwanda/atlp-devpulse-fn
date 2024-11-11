import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../redux/store";
import { getAllBlogs } from "../../redux/actions/blogActions";
import { createBlogAction } from "../../redux/actions/blogActions";
import * as icons from "react-icons/ai";
import blogSchema from "../../validation/blogSchema"
import { Spinner } from "flowbite-react";
import { handleBlogImageUpload } from "../../utils/imageUploadUtil";

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
    firstName: String;
    lastName: String;
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
const AllBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addNewBlogModal, setAddNewBlogModal] = useState(false);
  const [submitData, setSubmitData] = useState({
    title: "",
    content: "",
    tags: [""],
    coverImage:"",
    images: [""],
  });
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    tags: [""],
    coverImage:"",
    images: [""],
  });
  const [isUploading, setIsUploading] = useState(false);

   const mockBlogs = [
  {
    _id: "1",
    title: "Mock Blog 1",
    content: "This is a sample blog content for testing purposes.",
    coverImage: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: ["/path/to/image2.jpg", "/path/to/image3.jpg"],
    author: { firstName: "John", lastName: "Doe" },
    tags: ["React", "Testing"],
    isHidden: false,
    createdAt: new Date().toString(),
    likes: [],
    comments: [],
  },
  {
    _id: "2",
    title: "Mock Blog 2",
    content: "Another blog content for UI test.",
    coverImage: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: ["/path/to/image5.jpg"],
    author: { firstName: "Jane", lastName: "Doe" },
    tags: ["UI", "Mock Data"],
    isHidden: false,
    createdAt: new Date().toString(),
    likes: [],
    comments: [],
  },
   {
    _id: "1",
    title: "Mock Blog 1",
    content: "This is a sample blog content for testing purposes.",
    coverImage: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: ["/path/to/image2.jpg", "/path/to/image3.jpg"],
    author: { firstName: "John", lastName: "Doe" },
    tags: ["React", "Testing"],
    isHidden: false,
    createdAt: new Date().toString(),
    likes: [],
    comments: [],
  },
  ];
  
  const { loading, error, data = { blogs: [] } } = useSelector((state: RootState) => state.blogs);
  const blogs = data?.blogs ||mockBlogs;

   useEffect(() => {
     dispatch(getAllBlogs());
     console.log("All Blogs: ", blogs);
  }, [dispatch]);

  
  useEffect(() => {
    if (error) {
      toast.error("Failed to load blogs. Please try again later.");
    }
  }, [error]);

  const handleBlogClick = (blogId: string) => {
    navigate(`blog/${blogId}`);
  };
  

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  if (e.target instanceof HTMLInputElement && e.target.files) {
    const files = e.target.files;

    if (name === "coverImage" && files.length > 0) {
      // Upload cover image to Cloudinary
      const file = files[0];
      await handleBlogImageUpload(file, (url) => {
        setSubmitData((prevState) => ({ ...prevState, coverImage: url }));
      }, setIsUploading);

    } else if (name === "images") {
      // Upload each image and collect URLs
      const imageUrls = await Promise.all(
        Array.from(files).map(async (file) => 
          handleBlogImageUpload(file, (url) => url, setIsUploading)
        )
      );
      setSubmitData((prevState) => ({
  ...prevState,
  images: imageUrls.filter((url): url is string => url !== null), 
}));
      // setSubmitData((prevState) => ({ ...prevState, images: imageUrls }));
    }
  } else {

    if (name === "tags") {
      const tagArray = value.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
      setSubmitData((prevState) => ({ ...prevState, tags: tagArray }));
    } else {
      setSubmitData((prevState) => ({ ...prevState, [name]: value }));
    }
  }
};


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
    try {
      setSubmitData((prevState) => ({ ...prevState}));

      const obj = {
        title: submitData.title,
        content: submitData.content,
        tags: submitData.tags,
        coverImage: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        images: submitData.images,
      };
      if (validateForm(submitData, blogSchema)) {
        await dispatch(createBlogAction(obj));
        removeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white p-6">

       {addNewBlogModal && (
        <div className="fixed inset-0 mt-16 p-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-dark-bg w-11/12 md:w-3/5 lg:w-2/5 rounded-lg p-6">
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
              {/* Blog Title */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  value={submitData.title}
                  onChange={handleInputChange}
                  className="border bg-black rounded px-4 py-2"
                  placeholder="Enter Blog Title"
                />
                {errors.title && <span className="text-red-500 text-xs">{errors.title}</span>}
              </div>

              {/* Blog Content */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm">Blog Content</label>
                <textarea
                  name="content"
                  value={submitData.content}
                  onChange={handleInputChange}
                  className="border rounded bg-black px-4 py-2 h-24"
                  placeholder="Enter Blog Content"
                />
                {errors.content && <span className="text-red-500 text-xs">{errors.content}</span>}
              </div>

              {/* Blog Tags */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={submitData.tags}
                  onChange={handleInputChange}
                  className="border rounded bg-black px-4 py-2"
                  placeholder="Tags"
                />
                {errors.tags && <span className="text-red-500 text-xs">{errors.tags}</span>}
              </div>

              {/* Cover Image */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm">Cover Image</label>
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="border rounded bg-black px-4 py-2"
                />
                {errors.coverImage && <span className="text-red-500 text-xs">{errors.coverImage}</span>}
              </div>

              {/* Blog Images */}
              <div className="flex flex-col">
                <label className="font-semibold text-sm">Blog Images</label>
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleInputChange}
                  className="border rounded bg-black px-4 py-2"
                  placeholder="Upload images"
                />
                {errors.images && <span className="text-red-500 text-xs">{errors.images}</span>}
              </div>

             <button
                      type="submit"
                      disabled={loading || isUploading}
                      className="w-1/3 rounded w-15 px-5 py-1 mt-10 bg-green text-white transition-colors hover:bg-dark-frame-bg hover:text-green hover:border hover:border-green"
                    >
                      {loading || isUploading ? "Submitting..." : "Submit"}
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
        {/* Header */}
        <div className="mb-6 w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold">All Blogs</h1>
          <div className="w-full sm:w-auto">
            <button onClick={Open} className="flex items-center justify-center w-full sm:w-auto bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer hover:opacity-90 transition-opacity" >
               <icons.AiOutlinePlus className="mr-2" /> Blog
                </button>
              </div>
        </div>

        {/* Blog List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">Loading Blogs... <Spinner/></div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) :blogs?.length ? (
            blogs.map((blog: any) => (
              <div
                key={blog.id}
                onClick={() => handleBlogClick(blog.id)}
                className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer group"
              >
                {/* Blog Image */}
                <div className="w-16 h-16 bg-slate-700 rounded-lg overflow-hidden">
                  <img
                    src={blog.image || "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Blog Content */}
                <div className="flex-grow">
                  <h2 className="text-lg font-medium group-hover:text-green-400 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-slate-400 text-sm line-clamp-2">{blog.description}</p>
                </div>

                {/* Author and Date */}
                <div className="flex flex-col items-end text-sm text-slate-400">
                  {/* <span>{blog.author}</span> */}
                  <span>{`${blog.author.firstName} ${blog.author.lastName}`}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">No blogs available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
