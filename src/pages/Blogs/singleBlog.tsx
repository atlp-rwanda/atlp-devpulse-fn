import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getBlogById } from '../../redux/actions/blogActions';
import SingleBlogSkeleton from '../../skeletons/singleBlogSkeleton';
import BlogComment from './BlogComment'; 
import BlogReaction from './BlogReactions';

const SingleBlogView = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useAppSelector((state) => ({
    data: state.singleBlog.data,
    isLoading: state.singleBlog.isLoading,
  }));

  const blog = data;

  useEffect(() => {
    if (id) dispatch(getBlogById(id));
  }, [id, dispatch]);

  return (
    <div className="min-h-screen w-full pt-8 bg-white dark:bg-slate-900 text-black dark:text-white p-6">
      {isLoading || !blog ? (
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

          {id && <BlogReaction blogId={id} />}
          {id && <BlogComment blogId={id} />}
        </div>
      )}
    </div>
  );
};

export default SingleBlogView;

