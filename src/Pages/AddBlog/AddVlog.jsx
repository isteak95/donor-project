import { useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import striptags from 'striptags';

const AddVlog = () => {
    const [blogData, setBlogData] = useState({
        title: '',
        thumbnail: '',
        content: '',
        status: 'draft',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditorChange = (value) => {
        // Use striptags to remove HTML tags and store only plain text
        const plainTextContent = striptags(value);
        setBlogData((prevData) => ({
            ...prevData,
            content: plainTextContent,
        }));
    };

    const handleThumbnailUpload = async (e) => {
        try {
            const thumbnailUrl = await uploadThumbnailToImageBB(e.target.files[0]);
            if (thumbnailUrl !== null) {
                setBlogData((prevData) => ({
                    ...prevData,
                    thumbnail: thumbnailUrl,
                }));
            }
        } catch (error) {
            console.error('Error uploading thumbnail to ImageBB:', error);
            toast.error('Error uploading thumbnail. Please try again.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    const uploadThumbnailToImageBB = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    key: '16923b179713d1bea5bc606d3c18c7d0', // Replace with your ImageBB API key
                },
            });

            if (response.data.success) {
                return response.data.data.url;
            } else {
                console.error('ImageBB upload failed:', response.data.error);
                return null;
            }
        } catch (error) {
            console.error('Error uploading thumbnail to ImageBB:', error);
            return null;
        }
    };

    const handleCreateBlog = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/blogs', blogData);

            if (response.status === 200) {
                setBlogData({
                    title: '',
                    thumbnail: '',
                    content: '',
                    status: 'draft',
                });

                toast.success('Blog created successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            } else {
                console.error('Failed to create blog:', response.status);
                toast.error('Failed to create blog. Please try again.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            toast.error('Error creating blog. Please try again.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    return (
        <div>
            <label>Title:</label>
            <input
                className='input mt-20 mb-7'
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleInputChange}
            />

            <label>Thumbnail Image:</label>
            <input
                className='input '

                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
            />

            <label className='mt-10'>Content:</label>
            <JoditEditor
                value={blogData.content}
                onChange={handleEditorChange}
            />

            <div className='flex justify-center mt-10'>
                <button className='btn btn-secondary  text-center ' onClick={handleCreateBlog}>Create Blog</button>

            </div>
            {/* Toast container to display toasts */}
            <ToastContainer />
        </div>
    );
};

export default AddVlog;
