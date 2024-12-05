import React, { useEffect, useState } from 'react';
import { FaRegThumbsUp, FaCommentDots, FaUser, FaCalendar } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { fetchAllBlogs } from '../../redux/actions/blogsActions';
import { toast } from 'react-toastify';



 interface Author {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}
 interface Blog {
  reactions: { id: string }[]; 
  comments: { id: string }[]; 
  likes: { id: string }[];  
  id: string;
  title: string;
  content: string;
  coverImage: string;
  images?: string[];
  isHidden?: boolean;
  author : Author;
  tags: string[];
  created_at: string;
  updated_at: string;
}



const BlogCard = ({ blog }: { blog: Blog }) => (
  <div key={blog.id} className="bg-gray-200 dark:bg-dark-frame-bg dark:text-white text-primary shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition duration-300" >
    <Link to={`/blogs/${blog.id}`}>
    <img src={blog.coverImage} alt={blog.title} className="w-full h-40 object-cover mb-4" loading="lazy"/>
    </Link>
    <div className="p-3">
    <Link to={`/blogs/${blog.id}`}>
      <div className="flex justify-between text-sm mb-4 items-center">
        <div className="flex flex-wrap items-center gap-3">
        <span className="font-semibold flex flex-row gap-2 items-center">
            <FaUser size={20} className='dark:text-green' /> {blog.author.firstname}
          </span>
          <span className="ml-2 flex flex-row gap-2 items-center">
            <FaCalendar size={20} className="dark:text-green" />
            {blog.created_at
              ? new Date(Number(blog.created_at)).toLocaleDateString()
              : "Unknown Date"}
          </span>
          <span className="flex flex-row gap-1 items-center">
            <CiHeart size={20} className="dark:text-green" /> {blog.reactions.length || 0}
          </span>
          <span className="flex flex-row gap-1 items-center">
            <FaCommentDots size={20} className="dark:text-green" /> {blog.comments.length || 0}
          </span>
        </div>
      </div>
      </Link>
      <Link to={`/blogs/${blog.id}`}>
      <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
      <p className="mb-4 text-black-text dark:text-white overflow-hidden line-clamp-3">
        {blog.content}
      </p>
      </Link> 
    </div>
  </div>
);

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const fetchedBlogs = await fetchAllBlogs();
        if (isMounted) {
          const sortedBlogs = fetchedBlogs.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setBlogs(sortedBlogs.slice(0, 3));
          setLoading(false);
        }
      } catch (error) {
        toast.error("Error fetching blogs");
        setLoading(false);
      }
    };

    fetchBlog();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center dark:bg-dark-bg bg-white px-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-16 h-16 text-gray-500 mb-4"
        >
          <path d="M12 2a10 10 0 11-10 10A10 10 0 0112 2zm5 11H7a1 1 0 000 2h10a1 1 0 000-2zm-1-4a1 1 0 01-1 1H9a1 1 0 010-2h6a1 1 0 011 1z" />
        </svg>
        <p className="text-lg text-gray-500 dark:text-gray-300">No blogs available at the moment. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="p-10 dark:bg-dark-bg bg-white">
      <div className="flex justify-between items-center mb-6 px-6">
        <h1 className="text-xl sm:text-4xl md:text-xl font-bold mb-4 leading-tight dark:text-white">
          Discover Insights from <br /> the <span className="text-primary dark:text-green">DevPulse</span> Community
        </h1>
        <button className="px-6 py-2 dark:bg-green text-white font-semibold rounded-lg hover:bg-green-600 bg-primary">
          <Link to="/blogs">View All</Link>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-6 px-10">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
