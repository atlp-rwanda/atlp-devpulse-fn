
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle,User } from 'lucide-react';
import { useAppDispatch,useAppSelector } from '../../hooks/hooks';
import { getBlogById } from "../../redux/actions/blogActions";
import { Spinner } from 'flowbite-react';
import SingleBlogSkeleton from '../../skeletons/singleBlogSkeleton';

const SingleBlogView = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(20);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useAppDispatch();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

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


  return (
    <div className="min-h-screen pt-8 w-full bg-slate-900 text-white p-6">
      {isLoading||!blog? (
         <SingleBlogSkeleton/>
      ) : (<div>
        <div className='flex my-4 flex-col items-end gap-0 w-full'>
          <div className='mb-8 flex flex-row items-start justify-between'>
            <div className='w-2/5 flex items-center'>
               <img src={blog.coverImage}  alt={blog.title} className="w-80 h-80 rounded-xl object-cover"/>
            </div>
              <div className='w-3/5 '>
                <p className='text-sm mb-4 rounded-3xl w-fit py-1 px-4 bg-slate-800'>On {new Date(Number(blog.created_at)).toLocaleString()}</p>
                <p className="text-2xl text-left font-bold">{blog.title}</p>
                <div className='mt-8 flex gap-4 items-center rounded-3xl w-fit py-1 px-4 bg-slate-800 text-white transition-colors'>
                   <User size={32} />
                   <div>
                       <p className="text-md text-left">{`${blog.author.firstname} ${blog.author.lastname}`}</p>
                      <span className='text-sm text-left'>Joined on {new Date(Number(blog.author.createdAt)).toLocaleString()} </span>
                   </div>
                </div>
            </div>
          </div>
          <div className='flex gap-4 flex-col items-start'>
            <p className="text-slate-300 w-[80%] leading-relaxed">
              {blog.content}
              </p>
              <div className='flex itmes-start gap-4 flex-row'>
                {blog.tags.length == 1 ?
                  <span className="text-sm bg-rose-800 px-3 rounded-md">{blog.tags[0]}</span> :
                  blog.tags.length == 2 ? <div className='flex gap-2'>
                    <span className="text-sm bg-rose-800 px-3 rounded-md">{blog.tags[0]}</span>
                    <span className="text-sm bg-emerald-800 px-3 rounded-md">{blog.tags[1]}</span>
                  </div>
                    :
                    blog.tags.length >= 3 && <div className='flex gap-2'>
                      <span className="text-sm bg-rose-800 px-3 rounded-md">{blog.tags[0]}</span>
                      <span className="text-sm bg-emerald-800 px-3 rounded-md">{blog.tags[1]}</span>
                      <span className="text-sm bg-blue-800 px-3 rounded-md">{blog.tags[2]}</span>
                    </div>
                }
              </div>
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
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-2"
          >
            <Heart
              className={`w-6 h-6 ${isLiked ? 'fill-green-400 text-green-400' : 'text-white'}`}
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
            className="px-4 py-2 w-1/2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={handleComment}
            className="rounded py-1 px-4 bg-green text-white transition-colors hover:bg-dark-frame-bg hover:text-green hover:border hover:border-green"
          >
            Comment
          </button>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{blog.comments.length} Comments</h2>
          {blog.comments.length > 0 ?
            (<>
              {blog.comments.map((comment) => (
                <div key={comment.id} className="bg-slate-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-700 rounded-full overflow-hidden">
                      <img
                        src="/api/placeholder/40/40"
                        alt={comment.user.firstname}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{comment.user.firstname}</h3>
                      <p className="text-sm text-slate-400">{comment.created_at}</p>
                    </div>
                  </div>
              
                  <p className="text-slate-300">{comment.content}</p>
              
                  <div className="flex items-center gap-4 text-sm text-slate-400">
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
            </>)
            : (<div>
              <p className='text-left'>No comments yet</p>
            </div>)}
         
        </div>
      </div>
      )}
      </div>
  );
};

export default SingleBlogView;