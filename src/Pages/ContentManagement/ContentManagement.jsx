import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ContentManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        // Fetch blog data from MongoDB or your API
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/blogs'); // Replace with your API endpoint
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handlePublishBlog = async (blogId) => {
        try {
            // Implement logic to publish the blog with the given ID
            await axios.put(`/api/blogs/${blogId}/publish`); // Replace with your API endpoint
            fetchBlogs(); // Refresh the blog list after publishing
        } catch (error) {
            console.error('Error publishing blog:', error);
        }
    };

    const handleUnpublishBlog = async (blogId) => {
        try {
            // Implement logic to unpublish the blog with the given ID
            await axios.put(`/api/blogs/${blogId}/unpublish`); // Replace with your API endpoint
            fetchBlogs(); // Refresh the blog list after unpublishing
        } catch (error) {
            console.error('Error unpublishing blog:', error);
        }
    };

    const handleDeleteBlog = async (blogId) => {
        try {
            // Implement logic to delete the blog with the given ID
            await axios.delete(`/api/blogs/${blogId}`); // Replace with your API endpoint
            fetchBlogs(); // Refresh the blog list after deleting
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className="relative h-full">
            {/* Add Blog Button (Positioned to Top Right) */}
            <NavLink to='/dashboard/content-management/add-blog'>
                <button className='btn btn-outline absolute lg:top-10 md:top-10  lg:right-20 md:right-20'>
                    Add Blog
                </button>
            </NavLink>

            {/* Blog List */}
            <div className='p-10'>
                {/* Filtering Options */}
                <label className='text-2xl font-bold mx-5'>Filter by Status</label>
                <select
                    className='border-red-400 border-2 py-2 px-5'
                    value={filterStatus}
                    onChange={handleFilterChange}
                >
                    <option value="all">All</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>

                {/* Blog List */}
                {blogs
                    .filter(blog => filterStatus === 'all' || blog.status === filterStatus)
                    .map(blog => (
                        <div key={blog.id} className='border p-5 my-20 table'>
                            <h3 className='text-xl'>{blog.title}</h3>
                            <p className='text-lg mt-5'>{blog.content}</p>

                            {/* Additional blog details and controls */}
                            {blog.status === 'draft' && (
                                <button className='btn btn-accent mx-10 mt-5' onClick={() => handlePublishBlog(blog.id)}>
                                    Publish
                                </button>
                            )}

                            {blog.status === 'published' && (
                                <button className='btn  btn-secondary mr-6' onClick={() => handleUnpublishBlog(blog.id)}>
                                    Unpublish
                                </button>
                            )}

                            <button className='btn btn-error' onClick={() => handleDeleteBlog(blog.id)}>
                                Delete
                            </button>

                            {/* Add edit functionality if needed */}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ContentManagement;
