import  { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch published blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs'); // Replace with your API endpoint
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Handle error
      }
    };

    fetchBlogs();
  }, []);


  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center mt-8">Published Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-center my-64">No published blogs available.</p>
      ) : (
        <div className='mx-10'>
          {blogs.map((blog) => (
            <div key={blog.id} className="border text-white    bg-slate-700 p-10 my-20  table">
              <h3 className="text-3xl font-bold text-center">{blog.title}</h3>
              <p className="text-lg mt-5">{blog.content}</p>

              {/* Additional blog details and controls */}

              {/* Add edit functionality if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
