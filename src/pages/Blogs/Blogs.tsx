import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaCommentDots, FaUser, FaCalendar } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { toast } from "react-toastify";
import Header from "../../components/home/Header";
import { fetchAllBlogs, Blog } from "../../redux/actions/blogsActions"; 
import { Link } from "react-router-dom";

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const fetchedBlogs = await fetchAllBlogs(selectedTag || undefined);
        const sortedBlogs = fetchedBlogs.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedTag]);

  return (
    <>
      <Header />
      <div className="p-10 bg-gray-50 dark:bg-dark-bg mt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Blogs</h2>
          {selectedTag && (
            <div className="text-primary dark:text-white font-semibold mt-2">
              Filtered by tag: <span className="underline">{selectedTag}</span>
              <button
                className="ml-4 text-red-500 underline dark:text-white"
                onClick={() => setSelectedTag(null)}
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
        {loading ? (
         <div className="flex justify-center items-center h-screen">
         <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-4 border-green-500" role="status">
           <span className="sr-only">Loading...</span>
         </div>
       </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-6 px-10">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-gray-200 dark:bg-dark-frame-bg dark:text-white text-primary shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition duration-300"
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-40 object-cover mb-4"
                />
                <div className="p-3">
                  <div className="flex justify-between text-sm text-primary dark:text-white mb-4 items-center">
                    <div className="flex items-center gap-3">
                    <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold flex flex-row gap-2 items-center">
            <FaUser size={20} className='dark:text-green' /> {blog.author.firstname}
          </span>
          <span className="ml-2 flex flex-row gap-2 items-center">
             <span className="ml-2 flex flex-row gap-2 items-center">
             <FaCalendar size={20} className="dark:text-green" />
               {blog.created_at
                ? new Date(Number(blog.created_at)).toLocaleDateString()
                 : "Unknown Date"}
              </span>
          </span>
          <span className='flex flex-row gap-1 items-center'>
            <CiHeart size={20} className='dark:text-green' /> {blog.likes || 0}
          </span>
          <span className='flex flex-row gap-1 items-center'>
            <FaCommentDots size={20} className='dark:text-green' /> {blog.comments || 0}
          </span>
        </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="mb-4 text-black-text dark:text-white overflow-hidden line-clamp-3">
                    {blog.content.substring(0, 150)}...
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded cursor-pointer hover:bg-green-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link to={`/blogs/${blog.id}`} className="text-green hover:underline">
                     Read More →
                   </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-300">
            No blogs available.
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
