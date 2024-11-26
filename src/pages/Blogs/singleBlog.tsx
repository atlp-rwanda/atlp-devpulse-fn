
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle,User } from 'lucide-react';
import { useAppDispatch,useAppSelector } from '../../hooks/hooks';
import { getBlogById, getBlogRelatedArticles, deleteBlogAction } from "../../redux/actions/blogActions";
import { Spinner } from 'flowbite-react';
import SingleBlogSkeleton from '../../skeletons/singleBlogSkeleton';
import * as icons from "react-icons/ai";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

const SingleBlogView = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(20);
  const [isLiked, setIsLiked] = useState(false);
  const userId = localStorage.getItem('userId');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteBlogModal,setDeleteBlogModal] = useState(false)
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const {
    blogRelatedArticles,isLoading: isLoadingRelatedArticles } = useAppSelector((state) => 
    ({blogRelatedArticles: state.blogRelatedArticle.blogRelatedArticles,
    isLoading: state.blogRelatedArticle.isLoading,}));
    const topArticles = Array.isArray(blogRelatedArticles)? blogRelatedArticles.sort(() => Math.random() - 0.5).slice(0, 3): [];
  useEffect(() => {
    const blogId: any = id; 
    dispatch(getBlogRelatedArticles(blogId))
  }, [dispatch, id]); 
  
  const handleComment = (e) => {
    e.preventDefault();
    // Add comment logic here
    setComment('');
  };

  const { data ,isLoading} = useAppSelector((state) => ({data:state.singleBlog.data,isLoading:state.singleBlog.isLoading}));
  const blog = data;
  useEffect(() => {
     if(id)
      dispatch(getBlogById(id));
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
    setDeleteBlogModal(true)
  }

  const closeDeleteModal = () => {
    setDeleteBlogModal(false)
  }

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
               <button className="flex mt-5 gap-2 border border-red-500 px-4 py-2 rounded-lg w-fit text-red-500" onClick={() => handleDeleteBlog(blog.id)}>
            <icons.AiFillDelete className="h-6 w-6 " />
            Delete this blog
            </button>
          </div>
        </div>
      )}
      {isLoading ||isLoadingRelatedArticles || !blog ?  (
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
              </div>
            </div>
            <div className="flex gap-4 flex-col w-full items-start">
              <p className="dark:text-slate-300 w-[80%] leading-relaxed">
                {blog.content}
              </p>
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
          {topArticles && topArticles.length > 0 ? (
              <div className='mt-10'>
                <h1>Related Articles</h1>
                <div className='flex flex-row gap-1'>
                {topArticles.map((article, index) => (
                  <div className="flex flex-col w-1/4  bg-slate-100 dark:bg-slate-800 px-2  hover:bg-slate-50 py-2 rounded-lg dark:hover:bg-slate-700 transition-colors cursor-pointer group" onClick={() =>  window.open(article.url, "_blank")}>
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
              ): (
                <p>No related articles available</p>
              )}
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className="flex items-center gap-2">
              <Heart
                className={`w-6 h-6 ${
                  isLiked ? "fill-green-400 text-green-400" : "dark:text-white"
                }`}
              />
              <span>{blog.likes.length}</span>
            </button>
          </div>
          <div className="flex flex-row my-2 gap-4 w-full items-center justify-start">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment here..."
              className="px-4 py-2 w-1/2 dark:bg-slate-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleComment}
              className="rounded py-1 px-4 bg-green text-white transition-colors dark:hover:bg-dark-frame-bg hover:text-green hover:border hover:border-green"
            >
              Comment
            </button>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {blog.comments.length} Comments
            </h2>
            {blog.comments.length > 0 ? (
              <>
                {blog.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="dark:bg-slate-800 bg-slate-400 rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                        <img
                          src="/api/placeholder/40/40"
                          alt={comment.user.firstname}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {comment.user.firstname}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {comment.created_at}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-300">{comment.content}</p>

                    <div className="flex items-center gap-4 text-sm dark:text-slate-400">
                      <button className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {comment.replies.length} Replies
                      </button>
                      <button className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {comment.likes.length}
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div>
                <p className="text-left">No comments yet</p>
              </div>
            )}
          </div>
      
          <div className={`${userId === blog.author.id ? "" : "hidden"} flex flex-col gap-2 mt-10`}>
            <h1 className='text-red-500 font-bold'>Danger Zone</h1>

            <button className={`flex gap-2 border border-red-500 px-4 py-2 rounded-lg w-fit text-red-500 `} onClick={() => openDeleteModal() }>
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