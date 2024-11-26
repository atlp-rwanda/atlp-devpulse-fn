import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { Heart, MessageCircle, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getBlogById,
  getBlogRelatedArticles,
  deleteBlogAction,
  updateBlogAction,
} from "../../redux/actions/blogActions";
import blogSchema from "../../validation/blogSchema";
import { handleBlogImageUpload } from "../../utils/imageUploadUtil";
import { Spinner } from "flowbite-react";
import SingleBlogSkeleton from "../../skeletons/singleBlogSkeleton";
import * as icons from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AiOutlineClose } from "react-icons/ai";

interface Comment {
  _id: String;
  content: String;
  blog: Blog;
  createdAt: String;
}
interface Like {
  _id: String;
  blog: Blog;
  created_at: String;
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
  images: [String];
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
import BlogComment from "./BlogComment";
import BlogReaction from "./BlogReactions";

const SingleBlogView = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(20);
  const [isLiked, setIsLiked] = useState(false);
  const userId = localStorage.getItem("userId");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteBlogModal, setDeleteBlogModal] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const { blogRelatedArticles, isLoading: isLoadingRelatedArticles } =
    useAppSelector((state) => ({
      blogRelatedArticles: state.blogRelatedArticle.blogRelatedArticles,
      isLoading: state.blogRelatedArticle.isLoading,
    }));
  const topArticles = Array.isArray(blogRelatedArticles)
    ? blogRelatedArticles.sort(() => Math.random() - 0.5).slice(0, 3)
    : [];
  useEffect(() => {
    const blogId: any = id;
    dispatch(getBlogRelatedArticles(blogId));
  }, [dispatch, id]);

  const handleComment = (e) => {
    e.preventDefault();
    // Add comment logic here
    setComment("");
  };

  const { data, isLoading } = useAppSelector((state) => ({
    data: state.singleBlog.data,
    isLoading: state.singleBlog.isLoading,
  }));
  const blog = data;
  useEffect(() => {
    if (id) dispatch(getBlogById(id));
  }, [dispatch]);

  const handleDeleteBlog = async (id: string) => {
    try {
      const result = await dispatch(deleteBlogAction(id));

      // Check the result's type for success or failure
      if (result.type === "DELETE_BLOG_SUCCESS") {
        toast.success("Blog deleted");
        navigate(-1); // Go back to the previous page
      } else {
        toast.error("Failed to delete blog! Try again");
      }
    } catch (error: any) {
      // This block is now for unexpected errors
      toast.error(error.message || "Unexpected error! Try again");
    }
  };

  const openDeleteModal = () => {
    setDeleteBlogModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteBlogModal(false);
  };

  const [addNewBlogModal, setAddNewBlogModal] = useState(false);
  const [addingBlog, setAddingBlog] = useState(false);
  const [manyImaages, setManyImages] = useState(false);
  const [tags, setTags] = useState("");
  const [submitData, setSubmitData] = useState<SubmitData>({
    title: "",
    content: "",
    tags: [],
    coverImage: "",
    images: [],
  });
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    tags: [""],
    coverImage: "",
    images: [""],
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.files) {
      const files = e.target.files;

      if (name === "coverImage" && files.length > 0) {
        setSubmitData((prevState) => ({
          ...prevState,
          coverImage: files[0],
        }));
      } else if (name === "images") {
        if (files.length > 4) {
          setManyImages(true);
          return;
        }
        setSubmitData((prevState) => ({
          ...prevState,
          images: Array.from(files),
        }));
        setManyImages(false);
      }
    } else if (name === "tags") {
      const tagArray = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      setSubmitData((prevState) => ({ ...prevState, tags: tagArray }));
      setTags(value);
    } else {
      setSubmitData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const Open = () => {
    setAddNewBlogModal(true);
    setSubmitData({
      title: blog.title,
      content: blog.content,
      tags: blog.tags,
      coverImage: "",
      images: [],
    });
    setTags(blog.tags.join(", "));
    setContent(blog.content);
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
      let coverImageUrl: string | null = blog.coverImage;
      let imageUrls: string[] = blog.images;

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
        tags: submitData.tags || [],
      };
      setAddingBlog(true);
      await dispatch(updateBlogAction(blog.id, obj));
      setAddingBlog(false);
      removeModal();
      dispatch(getBlogById(id as string));
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const [content, setContent] = useState(submitData.content || "");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  const handleContentChange = (value: string) => {
    setContent(value);

    // Simulate an event object to match the expected input of handleInputChange
    const syntheticEvent = {
      target: {
        name: "content",
        value: value,
      },
    } as ChangeEvent<HTMLTextAreaElement>;

    handleInputChange(syntheticEvent);
  };

  return (
    <div className="min-h-screen w-full pt-8 bg-white dark:bg-dark-bg text-black dark:text-white p-6">
      {deleteBlogModal && (
        <div className="fixed inset-0 mt-16 p-0 flex items-center justify-center bg-black bg-opacity-20 dark:bg-opacity-40">
          <div className="bg-white dark:bg-dark-bg w-11/12 md:w-3/5 lg:w-2/5 rounded-lg p-6">
            <div className="w-full flex mb-2 items-center justify-between">
              <div>
                <h3 className="font-bold text-m dark:text-white ">
                  Delete Blog
                </h3>
                <p>This action cannot be undone</p>
              </div>
              <icons.AiOutlineClose
                className="float-right text-2xl cursor-pointer"
                onClick={() => closeDeleteModal()}
              />
            </div>
            <button
              className="flex mt-5 gap-2 border border-red-500 px-4 py-2 rounded-lg w-fit text-red-500"
              onClick={() => handleDeleteBlog(blog.id)}
            >
              <icons.AiFillDelete className="h-6 w-6 " />
              Delete this blog
            </button>
          </div>
        </div>
      )}
      {addNewBlogModal && (
        <div className="fixed inset-0 mt-16 p-0 flex items-center justify-center bg-black bg-opacity-20 dark:bg-opacity-40">
          <div className="bg-white dark:bg-dark-bg w-11/12 md:w-3/5 lg:w-2/5 rounded-lg p-6 max-h-[600px] overflow-y-scroll">
            <div className="w-full flex mb-2 items-center justify-between">
              <h3 className="font-bold text-m dark:text-white">UPDATE BLOG</h3>
              <AiOutlineClose
                className="float-right text-3xl cursor-pointer"
                onClick={removeModal}
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
                {isUploading || addingBlog ? <Spinner /> : ""}
                {isUploading || addingBlog ? " Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
      {isLoading || isLoadingRelatedArticles || !blog ? (
        <SingleBlogSkeleton />
      ) : (
        <div className="min-h-screen w-ful dark:text-white p-6">
          <div className="flex my-4 flex-col items-end gap-0 w-full">
            <div className="mb-8 w-full gap-8 flex flex-row items-start justify-between">
              <div className="w-[55%] flex items-center">
                <img
                  src={blog.coverImage}
                  alt={blog.author.firstname}
                  className="w-full h-80 rounded-xl object-cover"
                />
              </div>
              <div className="w-[45vw] px-4">
                <p className="text-sm mb-4 rounded-3xl w-fit py-1 px-4 bg-slate-300 dark:bg-slate-800">
                  On {new Date(Number(blog.created_at)).toLocaleString()}
                </p>
                <p className=" text-2xl text-left break-words whitespace-normal overflow-wrap-break-word font-semibold">
                  {blog.title}
                </p>
                <div className="mt-8 flex gap-4 items-center rounded-3xl w-fit py-1 px-4 bg-slate-300 dark:bg-slate-800 dark:text-white transition-colors">
                  <User size={32} />
                  <div>
                    <p className="text-md text-left">{`${blog.author.firstname} ${blog.author.lastname}`}</p>
                    <span className="text-sm text-left">
                      Joined on{" "}
                      {new Date(Number(blog.author.createdAt)).toLocaleString()}{" "}
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-auto">
                  <button
                    disabled={isLoading}
                    onClick={Open}
                    className={`${
                      userId === blog.author.id ? "" : "hidden"
                    } flex items-center justify-center w-full sm:w-auto ${
                      isLoading
                        ? "bg-emerald-300"
                        : "bg-primary border dark:border-[#56C870]"
                    }  rounded-md py-2 px-4 text-white font-medium cursor-pointer`}
                  >
                    <icons.AiFillEdit className="mr-2" /> Edit
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col w-full items-start">
              <div
                className="dark:text-slate-300 w-[80%] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>
              <div className="flex itmes-start gap-4 flex-row">
                {blog.tags.length == 1 ? (
                  <span className="text-sm bg-rose-800 px-3 rounded-md">
                    {blog.tags[0]}
                  </span>
                ) : blog.tags.length == 2 ? (
                  <div className="flex gap-2">
                    <span className="text-sm bg-rose-800 px-3 rounded-md">
                      {blog.tags[0]}
                    </span>
                    <span className="text-sm bg-emerald-800 px-3 rounded-md">
                      {blog.tags[1]}
                    </span>
                  </div>
                ) : (
                  blog.tags.length >= 3 && (
                    <div className="flex gap-2">
                      <span className="text-sm bg-rose-800 px-3 rounded-md">
                        {blog.tags[0]}
                      </span>
                      <span className="text-sm bg-emerald-800 px-3 rounded-md">
                        {blog.tags[1]}
                      </span>
                      <span className="text-sm bg-blue-800 px-3 rounded-md">
                        {blog.tags[2]}
                      </span>
                    </div>
                  )
                )}
              </div>
              {blog.images.length > 0 && (
                <div className="grid grid-cols-4 mt-2 gap-2">
                  {blog.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {userId ? (
            <>
              {id && <BlogReaction blogId={id} />}
              {id && <BlogComment blogId={id} />}
            </>
          ) : (
            <div className="py-4">
              <p className="text-sm dark:text-slate-300">
                Please{" "}
                <a href="/" className="text-green  hover:text-green-700">
                  log in
                </a>{" "}
                or{" "}
                <a href="/" className="text-green  hover:text-green-700">
                  create an account
                </a>{" "}
                to like or comment.
              </p>
            </div>
          )}

          {topArticles && topArticles.length > 0 ? (
            <div className="mt-10">
              <h1>Related Articles</h1>
              <div className="flex flex-row gap-1">
                {topArticles.map((article, index) => (
                  <div
                    className="flex flex-col w-1/4  bg-slate-100 dark:bg-slate-800 px-2  hover:bg-slate-50 py-2 rounded-lg dark:hover:bg-slate-700 transition-colors cursor-pointer group"
                    onClick={() => window.open(article.url, "_blank")}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-28 w-full rounded-lg object-cover"
                    />
                    <h3 className="text-sm font-semibold mb-2">
                      {article.title}
                    </h3>
                    <div className="text-sm text-gray-400">
                      <span>Source: {article.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No related articles available</p>
          )}

          <div
            className={`${
              userId === blog.author.id ? "" : "hidden"
            } flex flex-col gap-2 mt-10`}
          >
            <h1 className="text-red-500 font-bold">Danger Zone</h1>

            <button
              className={`flex gap-2 border border-red-500 px-4 py-2 rounded-lg w-fit text-red-500 `}
              onClick={() => openDeleteModal()}
            >
              <icons.AiFillDelete className="h-6 w-6 " />
              Delete this blog
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlogView;
