import  { useState, useEffect } from 'react';
import axios from 'axios';

const BloodDonation = () => {
  const [user, setUser] = useState(null);
  const [donationRequests, setDonationRequests] = useState([]);

  useEffect(() => {
    // Fetch user data or check if the user is logged in
    // Set the user state accordingly
    // Example: Fetch user data from your authentication system
    // const user = fetchUserData();
    // setUser(user);

    // For demonstration purposes, I'm assuming a logged-in user
    setUser({ isLoggedIn: true });

    // Fetch pending donation requests
    const fetchDonationRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/all-blood-donation-request');
        setDonationRequests(response.data);
      } catch (error) {
        console.error('Error fetching donation requests:', error);
        // Handle error
      }
    };

    fetchDonationRequests();
  }, []);

  // If the user is not logged in, do not render the component
  if (!user || !user.isLoggedIn) {
    return null;
  }

  return (
    <div className='my-40 mx-10'>
      <h2 className="text-3xl font-bold text-center my-10">Pending Donation Requests</h2>
      {/* Display donation requests in card or tabular view */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {donationRequests.map((request) => (
          <div key={request.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-2 ">🩸</span>
              <h3 className="text-xl font-semibold">Requester: {request.recipientname}</h3>
            </div>
            <p className='my-2'>Location: {request.address}</p>
            <p >Date: {request.donationDate}</p>
            <p className='my-2'>Time: {request.donationTime}</p>
            <button className="btn btn-primary">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodDonation;
