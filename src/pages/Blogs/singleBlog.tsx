// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchSingleBlog, updateBlog } from '../../redux/actiontypes/blogTypes';
// import { useAppSelector,useAppDispatch } from '../../hooks/hooks';
// import { RootState } from '../../redux/store';
// import { Heart, EyeOff } from 'lucide-react';
// import  Alert from "../../components/ui/alert";

// const SingleBlogView = () => {
//   const { id } = useParams();
//   const dispatch = useAppDispatch();
//   const { loading, data: blog, error } = useAppSelector((state: RootState) => state.blogs); ;
//   const [comment, setComment] = useState('');
//   const userRole = useAppSelector((state) => state.auth.user?.role); // Assuming you have auth state

//   useEffect(() => {
//     dispatch({
//       type: fetchSingleBlog.FETCH_SINGLE_BLOG_LOADING,
//       data: { id }
//     });
//   }, [dispatch, id]);

//   const handleHideBlog = () => {
//     if (window.confirm('Are you sure you want to hide this blog?')) {
//       dispatch({
//         type: updateBlog.UPDATE_BLOG_LOADING,
//         data: {
//           id: blog.id,
//           isHidden: true
//         }
//       });
//     }
//   };

//   const handleComment = (e) => {
//     e.preventDefault();
//     // Add comment implementation here
//     setComment('');
//   };

//   if (loading) return <div className="text-center py-8 text-white">Loading...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen bg-slate-900 text-white p-6">
//       <div className="max-w-3xl mx-auto">
//         {/* Admin Controls */}
//         {userRole === 'admin' && (
//           <div className="mb-4">
//             <button
//               onClick={handleHideBlog}
//               className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors"
//             >
//               <EyeOff size={20} />
//               Hide Blog
//             </button>
//           </div>
//         )}

//         {/* Hidden Blog Alert */}
//         {blog?.isHidden && (
//           <Alert  className="mb-4 bg-yellow-500/10 text-yellow-500 border-yellow-500/50"
//              type="warning" onClose={() => {  }}>
//              This blog is currently hidden from public view
//           </Alert>
//         )}

//         {/* Main Blog Content */}
//         <div className="mb-8">
//           <div className="aspect-square w-full mb-4 bg-slate-800 rounded-lg overflow-hidden">
//             <img
//               src={blog?.image || "/api/placeholder/600/600"}
//               alt={blog?.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <p className="text-slate-300 mb-4">
//             {blog?.description}
//           </p>

//           {/* Image Gallery */}
//           <div className="flex gap-4 mb-6 overflow-x-auto">
//             {blog?.gallery?.map((image, i) => (
//               <div key={i} className="w-1/4 flex-shrink-0 aspect-square bg-slate-800 rounded-lg overflow-hidden">
//                 <img
//                   src={image || `/api/placeholder/150/150`}
//                   alt={`Gallery ${i}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Likes */}
//           <div className="flex items-center gap-2 mb-6">
//             <Heart className="text-slate-400" size={20} />
//             <span className="text-slate-400">{blog?.likes || 0}</span>
//           </div>
//         </div>

//         {/* Comments Section */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Comments</h2>
          
//           {/* Comment Form */}
//           <form onSubmit={handleComment} className="mb-6 flex gap-2">
//             <input
//               type="text"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Add your comment here..."
//               className="flex-grow bg-slate-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             <button
//               type="submit"
//               className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition-colors"
//             >
//               Comment
//             </button>
//           </form>

//           {/* Comments List */}
//           <div className="space-y-4">
//             {blog?.comments?.map((comment, index) => (
//               <div key={index} className="bg-slate-800 rounded-lg p-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
//                     <img
//                       src="/api/placeholder/32/32"
//                       alt={comment.author}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <span className="font-medium">{comment.author}</span>
//                   <span className="text-sm text-slate-400">{comment.date}</span>
//                 </div>
//                 <p className="text-slate-300">{comment.content}</p>
//                 <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
//                   <button className="hover:text-white transition-colors">
//                     {comment.replies} Replies
//                   </button>
//                   <button className="hover:text-white transition-colors">
//                     <Heart size={16} className="inline mr-1" />
//                     {comment.likes}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleBlogView;


import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';

const SingleBlogView = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(20);
  const [isLiked, setIsLiked] = useState(false);

  // Mock blog data - replace with actual data fetching
  const blog = {
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

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
        <div className='flex my-4 flex-row items-end gap-0 w-full h-[50vh]'>
          {/* Blog Title and cover iamge */}
          <div className='w-1/2 flex gap-2 flex-col items-start'>
            <h1 className="text-3xl text-left font-bold">{blog.title}</h1>
          <img 
            src={blog.coverImage} 
            alt={blog.title}
            className="w-4/5 h-3/4 bg-slate-800 rounded-lg object-cover"
          />
       </div>

        {/* Blog Images and  Content */}
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

        {/* Interactions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLike}
            className="flex items-center gap-2"
          >
            <Heart 
              className={`w-6 h-6 ${isLiked ? 'fill-green-400 text-green-400' : 'text-white'}`}
            />
            <span>{likes}</span>
          </button>
        </div>

        {/* Comment Form */}
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

        {/* Comments Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{blog.comments.length} Comments</h2>
          
          {blog.comments.map((comment) => (
            <div key={comment.id} className="bg-slate-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full overflow-hidden">
                  <img 
                    src="/api/placeholder/40/40" 
                    alt={comment.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{comment.author}</h3>
                  <p className="text-sm text-slate-400">{comment.date}</p>
                </div>
              </div>
              
              <p className="text-slate-300">{comment.content}</p>
              
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <button className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {comment.replies} Replies
                </button>
                <button className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {comment.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    // </div>
  );
};

export default SingleBlogView;