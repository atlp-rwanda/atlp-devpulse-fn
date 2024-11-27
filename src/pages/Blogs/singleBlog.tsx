import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
<<<<<<< HEAD
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
=======
import { Heart, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getBlogById } from '../../redux/actions/blogActions';
import SingleBlogSkeleton from '../../skeletons/singleBlogSkeleton';
import BlogComment from './BlogComment'; 
import BlogReaction from './BlogReactions';

const SingleBlogView = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
>>>>>>> 23f0ee5 (Fix: added comments and reactions)

  const { data, isLoading } = useAppSelector((state) => ({
    data: state.singleBlog.data,
    isLoading: state.singleBlog.isLoading,
  }));

  const blog = data;

<<<<<<< HEAD
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
=======
  useEffect(() => {
    if (id) dispatch(getBlogById(id));
  }, [id, dispatch]);

  return (
    <div className="min-h-screen w-full pt-8 bg-white dark:bg-slate-900 text-black dark:text-white p-6">
      {isLoading || !blog ? (
>>>>>>> 23f0ee5 (Fix: added comments and reactions)
        <SingleBlogSkeleton />
      ) : (
        <div className="min-h-screen w-full dark:text-white p-6">
          <div className="flex my-4 flex-col items-end gap-0 w-full">
            <div className="mb-8 w-full gap-8 flex flex-row items-start justify-between">
              <div className="w-2/5 flex items-center">
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
                <p className="text-2xl text-left break-words whitespace-normal overflow-wrap-break-word font-semibold">
                  {blog.title}
                </p>
                <div className="mt-8 flex gap-4 items-center rounded-3xl w-fit py-1 px-4 bg-slate-300 dark:bg-slate-800 dark:text-white transition-colors">
                  <User size={32} />
                  <div>
                    <p className="text-md text-left">{`${blog.author.firstname} ${blog.author.lastname}`}</p>
                    <span className="text-sm text-left">
                      Joined on {new Date(Number(blog.author.createdAt)).toLocaleString()}{' '}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col w-full items-start">
              <p className="dark:text-slate-300 w-[80%] leading-relaxed">{blog.content}</p>
              <div className="flex itmes-start gap-4 flex-row">
                {blog.tags.length === 1 ? (
                  <span className="text-sm bg-rose-800 px-3 rounded-md">{blog.tags[0]}</span>
                ) : blog.tags.length === 2 ? (
                  <div className="flex gap-2">
                    <span className="text-sm bg-rose-800 px-3 rounded-md">{blog.tags[0]}</span>
                    <span className="text-sm bg-emerald-800 px-3 rounded-md">{blog.tags[1]}</span>
                  </div>
                ) : (
                  blog.tags.length >= 3 && (
                    <div className="flex gap-2">
                      <span className="text-sm bg-rose-800 px-3 rounded-md">{blog.tags[0]}</span>
                      <span className="text-sm bg-emerald-800 px-3 rounded-md">{blog.tags[1]}</span>
                      <span className="text-sm bg-blue-800 px-3 rounded-md">{blog.tags[2]}</span>
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

<<<<<<< HEAD
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
=======
          {id && <BlogReaction blogId={id} />}
          {id && <BlogComment blogId={id} />}
>>>>>>> 23f0ee5 (Fix: added comments and reactions)
        </div>
      )}
    </div>
  );
};

export default SingleBlogView;