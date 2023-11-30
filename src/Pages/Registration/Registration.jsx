import { useContext, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import axios from 'axios';

const Registration = () => {
  const { createUser } = useContext(AuthContext);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avater: '',
    blood: '',
    district: '',
    upazila: '',
    status: 'active',
  });

  const [signUpError, setSignUpError] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setSignUpError('');
    setPasswordValidationError('');

    try {
      // Validate password
      if (password.length < 6) {
        setPasswordValidationError('Password should be at least 6 characters long.');
        return;
      } else if (!/[A-Z]/.test(password)) {
        setPasswordValidationError('Password should contain at least one capital letter.');
        return;
      } else if (!/[!@#$%^&*]/.test(password)) {
        setPasswordValidationError('Password should contain at least one special character (!@#$%^&*).');
        return;
      }

      // Create user using Firebase authentication
      const result = await createUser(email, password);
      const uid = result.user.uid;

      // Prepare user data to be sent to MongoDB
      const userData = {
        uid,
        name: userForm.name,
        email: userForm.email,
        avater: userForm.avater,
        blood: userForm.blood,
        district: userForm.district,
        upazila: userForm.upazila,
        status: userForm.status,
      };

      // Send user data to MongoDB server using Axios
      const res = await axios.post('http://localhost:5000/user', userData);
      console.log(res.data);
      toast.success('Registration successful!');

      // Clear input fields
      setUserForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        avater: '',
        blood: '',
        district: '',
        upazila: '',
        status: 'active',
      });
    } catch (error) {
      console.error(error);
      setSignUpError(error.message);
      toast.error('Registration failed');
    }
  };

  const handleBloodGroup = (event) => {
    setUserForm({ ...userForm, blood: event.target.value });
  };

  const handleThumbnailUpload = async (e) => {
    try {
      const thumbnailUrl = await uploadThumbnailToImageBB(e.target.files[0]);
      if (thumbnailUrl !== null) {
        setUserForm((prevUserForm) => ({
          ...prevUserForm,
          avater: thumbnailUrl,
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

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const upazilas = [
    'Dhaka City', 'Gazipur', 'Tangail', 'Narayanganj', 'Manikganj',
    'Munshiganj', 'Narsingdi', 'Kishoreganj', 'Rajbari', 'Shariatpur',
    'Faridpur', 'Gopalganj', 'Madaripur',
    'Khulna', 'Rajshahi', 'Barisal', 'Jessore',
    'Sylhet', 'Rangpur', 'Mymensingh',
    'Chittagong City', 'Cox\'s Bazar', 'Comilla', 'Feni', 'Noakhali',
    'Lakshmipur', 'Brahmanbaria', 'Chandpur', 'Khagrachari', 'Rangamati',
    'Bandarban', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat',
    'Nilphamari', 'Panchagarh', 'Thakurgaon', 'Barguna'
  ];
  const districts = [
    'Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Barisal',
    'Sylhet', 'Rangpur', 'Mymensingh', 'Cox\'s Bazar', 'Jessore',
    // Add more districts as needed
  ];

  return (
    <div className='lg:mx-[285px] md:mx-16 bg-slate-200 my-24 py-5'>
      <form onSubmit={handleSignUp} className="card-body">
        <div className="lg:flex gap-24 lg:my-20">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              required
              ref={emailRef}
            />
          </div>
        </div>
        <div className="lg:flex gap-24 lg:my-20">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              value={userForm.password}
              onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
              required
              ref={passwordRef}
            />

            {passwordValidationError && (
              <div className="text-red-500 mt-2 ">{passwordValidationError}</div>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              value={userForm.confirmPassword}
              onChange={(e) => setUserForm({ ...userForm, confirmPassword: e.target.value })}
              required
            />

            {passwordValidationError && (
              <div className="text-red-500 mt-2">{passwordValidationError}</div>
            )}
          </div>
        </div>
        <div className="lg:flex gap-24 lg:my-20">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl">Avatar</span>
            </label>
            <input
              name="avatar"
              className="input input-bordered md:w-[575px]"
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              placeholder="Enter the Image"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl">Blood Group</span>
            </label>
            <select
              name="blood"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              onChange={handleBloodGroup}
              value={userForm.blood}
              required
            >
              <option value="">Blood</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="lg:flex gap-24 lg:my-20">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl">District</span>
            </label>
            <select
              name="district"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              onChange={(e) => setUserForm({ ...userForm, district: e.target.value })}
              value={userForm.district}
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl">Upazila</span>
            </label>
            <select
              name="upazila"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              onChange={(e) => setUserForm({ ...userForm, upazila: e.target.value })}
              value={userForm.upazila}
              required
            >
              <option value="">Select Upazila</option>
              {upazilas.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Register Now
          </button>
        </div>
        {signUpError && <div className="text-red-500 mt-4">{signUpError}</div>}
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Registration;
