import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleBlog, updateBlog } from '../../redux/actiontypes/blogTypes';
import { useAppSelector,useAppDispatch } from '../../hooks/hooks'; 
import { RootState } from '../../redux/store';
import { Heart, EyeOff } from 'lucide-react';
import  Alert from "../../components/ui/alert";

const SingleBlogView = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, data: blog, error } = useAppSelector((state: RootState) => state.blogs); ;
  const [comment, setComment] = useState('');
  const userRole = useAppSelector((state) => state.auth.user?.role); // Assuming you have auth state

  useEffect(() => {
    dispatch({ 
      type: fetchSingleBlog.FETCH_SINGLE_BLOG_LOADING,
      data: { id }
    });
  }, [dispatch, id]);

  const handleHideBlog = () => {
    if (window.confirm('Are you sure you want to hide this blog?')) {
      dispatch({
        type: updateBlog.UPDATE_BLOG_LOADING,
        data: {
          id: blog.id,
          isHidden: true
        }
      });
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    // Add comment implementation here
    setComment('');
  };

  if (loading) return <div className="text-center py-8 text-white">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Admin Controls */}
        {userRole === 'admin' && (
          <div className="mb-4">
            <button
              onClick={handleHideBlog}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors"
            >
              <EyeOff size={20} />
              Hide Blog
            </button>
          </div>
        )}

        {/* Hidden Blog Alert */}
        {blog?.isHidden && (
          <Alert  className="mb-4 bg-yellow-500/10 text-yellow-500 border-yellow-500/50" 
             type="warning" onClose={() => {  }}>
             This blog is currently hidden from public view
          </Alert>
        )}

        {/* Main Blog Content */}
        <div className="mb-8">
          <div className="aspect-square w-full mb-4 bg-slate-800 rounded-lg overflow-hidden">
            <img
              src={blog?.image || "/api/placeholder/600/600"}
              alt={blog?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-slate-300 mb-4">
            {blog?.description}
          </p>

          {/* Image Gallery */}
          <div className="flex gap-4 mb-6 overflow-x-auto">
            {blog?.gallery?.map((image, i) => (
              <div key={i} className="w-1/4 flex-shrink-0 aspect-square bg-slate-800 rounded-lg overflow-hidden">
                <img
                  src={image || `/api/placeholder/150/150`}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Likes */}
          <div className="flex items-center gap-2 mb-6">
            <Heart className="text-slate-400" size={20} />
            <span className="text-slate-400">{blog?.likes || 0}</span>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          
          {/* Comment Form */}
          <form onSubmit={handleComment} className="mb-6 flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment here..."
              className="flex-grow bg-slate-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition-colors"
            >
              Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {blog?.comments?.map((comment, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                    <img
                      src="/api/placeholder/32/32"
                      alt={comment.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-sm text-slate-400">{comment.date}</span>
                </div>
                <p className="text-slate-300">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                  <button className="hover:text-white transition-colors">
                    {comment.replies} Replies
                  </button>
                  <button className="hover:text-white transition-colors">
                    <Heart size={16} className="inline mr-1" />
                    {comment.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogView;