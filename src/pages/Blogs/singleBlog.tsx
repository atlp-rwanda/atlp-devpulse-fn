
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { useAppDispatch,useAppSelector } from '../../hooks/hooks';
import { getBlogById } from "../../redux/actions/blogActions";
import { Spinner } from 'flowbite-react';
const SingleBlogView = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(20);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useAppDispatch();

  // Mock blog data - replace with actual data fetching
  const mockedBlog = {
    title: "AI is taking over",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu porta arci, nec fermentum ligula. Nullam mollis dolor vitae nulla torrent, quis imperdiet leo pulvinar at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu porta arci, nec fermentum ligula. Nullam mollis dolor vitae nulla torrent, quis imperdiet leo",
    coverImage: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: ["https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    comments: [
      {
        id: 1,
        author: "Nyanja Cyane",
        date: "Friday, 2022-12-03",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu porta arci, nec fermentum ligula. Nullam mollis dolor vitae nulla",
        replies: 5,
        likes: 20
      },
      {
        id: 2,
        author: "Nyanja Cyane",
        date: "Friday, 2022-12-03",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu porta arci, nec fermentum ligula. Nullam mollis dolor vitae nulla",
        replies: 5,
        likes: 20
      },
      {
        id: 3,
        author: "Nyanja Cyane",
        date: "Friday, 2022-12-03",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu porta arci, nec fermentum ligula. Nullam mollis dolor vitae nulla",
        replies: 5,
        likes: 20
      }
    ]
  };

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
    <div className="min-h-screen w-full bg-slate-900 text-white p-6">
      {isLoading ? (
        <div className="text-center py-8">Loading a Single Blog... <Spinner /></div>
      ) : (<div>
        <div className='flex my-4 flex-row items-end gap-0 w-full h-[50vh]'>
          <div className='w-1/2 flex gap-2 flex-col items-start'>
            <h1 className="text-3xl text-left font-bold">{blog.title}</h1>
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-4/5 h-3/4 rounded-lg object-cover"
            />
          </div>
          <div className='w-1/2 flex gap-4 flex-col items-start'>
            <p className="text-slate-300 leading-relaxed">
              {blog.content}
            </p>
            <div className="grid grid-cols-4 gap-2">
               {blog.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
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
            className="px-4 py-2 w-1/2 px-2 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
                        alt={comment.user.firstName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{comment.user.firstName}</h3>
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