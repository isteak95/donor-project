import  { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    avater: '',
    district: '',
    upazila: '',
    blood: '',
  });
  useEffect(() => {
    // Example: Fetch additional data based on the user when not loading
    if (!loading && user && user.email) {
      // Perform additional logic or data fetching here
      console.log('User data:', user);
    }
  }, [user, loading]);

  useEffect(() => {
    // Fetch user data based on email
    const fetchUserData = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(`http://localhost:5000/user?email=${user.email}`);
          const userDataArray = response.data;
          console.log(response.data);
          console.log('User Data:', userDataArray);
          if (userDataArray.length > 0) {
            // Take the first user from the array (assuming there is only one matching user)
            const userData = userDataArray[0];

            // Set the user data in the form
            setUserForm((prevUserForm) => ({
              ...prevUserForm,
              name: userData.name,
              email: userData.email,
              avater: userData.avater,
              district: userData.district,
              upazila: userData.upazila,
              blood: userData.blood,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, [user]);

  // Handle form submission (update profile)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      // Perform the update profile logic
      const updatedUserData = {
        name: userForm.name,
        avater: userForm.avater,
        district: userForm.district,
        upazila: userForm.upazila,
        blood: userForm.blood,
        // Add other fields if needed
      };

      // Send a request to update the user's profile
      const response = await axios.put(`http://localhost:5000/user/update?email=${user.email}`, updatedUserData);

      console.log('Profile updated successfully:', response.data);

      // You may want to update the user data in the context or trigger a re-fetch

    } catch (error) {
      console.error('Error updating user profile:', error);
      // Handle error
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const upazilas = [
    'Dhaka City', 'Gazipur', 'Tangail', 'Narayanganj', 'Manikganj',
    'Munshiganj', 'Narsingdi', 'Kishoreganj', 'Rajbari', 'Shariatpur',
    'Faridpur', 'Gopalganj', 'Madaripur',
    'Sylhet',
    'Chittagong City', 'Cox\'s Bazar', 'Comilla', 'Feni', 'Noakhali',
    'Lakshmipur', 'Brahmanbaria', 'Chandpur', 'Khagrachari', 'Rangamati',
    'Bandarban', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat',
    'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon', 'Barguna'
  ];
  const districts = [
    'Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Barisal',
    'Sylhet', 'Rangpur', 'Mymensingh', 'Cox\'s Bazar', 'Jessore',
    // Add more districts as needed
  ];

  return (
    <div className="container  mt-8 lg:ml-2  md:mx-32 mx-16">
      <h1 className="text-3xl font-bold mb-6 lg:ml-60 ml-24 md:ml-48">Profile</h1>
      <div className="lg:flex">
        <div className="w-[230px] mr-16 md:ml-44 lg:ml-auto ml-16 mb-9">
          <img src={userForm.avater} alt="Avatar" className="rounded-full w-32 h-32 object-cover" />
          <p className="mt-4 text-2xl font-bold">{userForm.name}</p>
          <p className="mt-4 text-xl  font-bold">{userForm.email}</p>
          <p className="mt-4 text-xl  font-bold">{userForm.district} , {userForm.upazila}</p>
          <p className="mt-4 text-xl  font-bold">Blood Group: {userForm.blood}</p>
        </div>
        <div className="w-2/3">
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-10">
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter your name"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
              />
            </div>
            <div className="mb-10">
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter your email"
                value={userForm.email}
                readOnly
              />
            </div>
            <div className="mb-10">
              <label className="block text-sm font-medium text-gray-600">Avatar URL</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter avatar URL"
                value={userForm.avater}
                onChange={(e) => setUserForm({ ...userForm, avater: e.target.value })}
              />
            </div>
            <div className="mb-10">
              <label className="block text-sm font-medium text-gray-600">District</label>
              <select
                name="district"
                className="mt-1 p-2 border rounded w-full"
                value={userForm.district}
                onChange={(e) => setUserForm({ ...userForm, district: e.target.value })}
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-10">
              <label className="block text-sm font-medium text-gray-600">Upazila</label>
              <select
                name="upazila"
                className="mt-1 p-2 border rounded w-full"
                value={userForm.upazila}
                onChange={(e) => setUserForm({ ...userForm, upazila: e.target.value })}
              >
                <option value="">Select Upazila</option>
                {upazilas.map((upazila) => (
                  <option key={upazila} value={upazila}>
                    {upazila}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-10">
              <label className="block text-sm font-medium text-gray-600">Blood Group</label>
              <select
                name="bloodGroup"
                className="mt-1 p-2 border rounded w-full"
                value={userForm.blood}
                onChange={(e) => setUserForm({ ...userForm, blood: e.target.value })}
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
