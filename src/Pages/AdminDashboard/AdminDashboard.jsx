import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const AdminDashboard = () => {

    const [donorData, setDonorData] = useState([]);
    const { user, loading } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [donationRequests, setDonationRequests] = useState([]);


    useEffect(() => {
        if (!loading && user && user.email) {
            console.log('User data:', user);
        }
    }, [user, loading]);
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('http://localhost:5000/all-user');
            setUsers(response.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchUsers();
      }, []);

    useEffect(() => {
        const fetchDonorData = async () => {
            try {
                if (user && user.email) {
                    const response = await axios.get(`http://localhost:5000/user?email=${user.email}`);
                    const donorDataArray = response.data;

                    if (donorDataArray.length > 0) {
                        setDonorData(donorDataArray);
                    } else {
                        setDonorData([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching donor data:', error);
            }
        };

        fetchDonorData();
    }, [user]);


      useEffect(() => {
        // Fetch all blood donation requests from the backend (replace the URL with your actual endpoint)
        axios.get('http://localhost:5000/all-blood-donation-request')
          .then((response) => {
            setDonationRequests(response.data);
          })
          .catch((error) => {
            console.error('Error fetching all blood donation requests:', error);
          });
      }, []);
    

    const showViewAllButton = donationRequests.length > 3;

    const handleDeleteClick = (donationRequestId) => {
        // Handle delete click, show confirmation modal
        console.log('Delete clicked for donation request:', donationRequestId);
    };

    const handleViewClick = (donationRequestId) => {
        // Handle view click, redirect to donation request details page
        console.log('View clicked for donation request:', donationRequestId);
    };

    const renderActions = (request) => {
        if (request.donationStatus === 'inprogress') {
            return (
                <>

                </>
            );
        }
        return null;
    };
    return (
        <div>

            <div>
                {donorData.map((donor) => (
                    <div key={donor._id}>
                        <h2 className='text-center my-10 text-3xl font-bold'>
                            Welcome {donor.name || 'Guest'} !
                        </h2>
                        {donationRequests.length > 0 && (
                            <div className='lg:mx-10 my-10 overflow-x-auto'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className='lg:text-lg text-black'>Recipient Name</th>
                                            <th className='lg:text-lg text-black'>Recipient Location</th>
                                            <th className='lg:text-lg text-black'>Donation Date</th>
                                            <th className='lg:text-lg text-black'>Donation Time</th>
                                            <th className='lg:text-lg text-black'>Donation Status</th>
                                            <th className='lg:text-lg text-black'>Donor Information</th>
                                            <th className='lg:text-lg text-black'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-base-300 rounded-xl">
                                        {donationRequests.slice(0, 3).map((request) => (
                                            <tr key={request._id}>
                                                <td>{request.recipientname}</td>
                                                <td>{`${request.district}, ${request.upazila}`}</td>
                                                <td>{request.donationDate}</td>
                                                <td>{request.donationTime}</td>
                                                <td>{request.donationStatus}</td>
                                                <td>{request.requestMessage}</td>
                                                <td>
                                                    <div>
                                                        {renderActions(request)}
                                                        <button
                                                            className='btn btn-secondary'
                                                            onClick={() => handleViewClick(request._id)}
                                                        >
                                                            View
                                                        </button>
                                                        <Link to="/dashboard/update-donation-request"
                                                        >
                                                            <button
                                                                className='btn btn-primary'

                                                            >
                                                                Edit
                                                            </button>
                                                        </Link>
                                                        <button
                                                            className='btn mx-2 my-2 btn-error'
                                                            onClick={() => handleDeleteClick(request._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {showViewAllButton && (
                                    <Link to='/dashboard/all-blood-donation-request'>
                                        <div className='text-center'>
                                            <button className='btn btn-secondary my-10'>
                                                View  All Requests
                                            </button>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="container mx-auto my-8 p-8 bg-gray-100 rounded-lg">
                <h2 className="text-3xl font-bold mb-8">Welcome to Admin Dashboard</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Total Users */}
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            {/* Your relevant icon for total users */}
                            <span className="text-4xl mr-2">👥</span>
                            <h3 className="text-xl font-semibold">Total Users</h3>
                        </div>
                        <p className="text-2xl font-bold text-center">{users.length}</p>
                    </div>

                    {/* Card 2: Total Funding */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            {/* Your relevant icon for total funding */}
                            <span className="text-4xl mr-2">💰</span>
                            <h3 className="text-xl font-semibold">Total Funding</h3>
                        </div>
                        <p className="text-2xl font-bold text-center"> $ 1000</p>
                    </div>

                    {/* Card 3: Total Blood Donation Requests */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            {/* Your relevant icon for total blood donation requests */}
                            <span className="text-4xl mr-2">🩸</span>
                            <h3 className="text-xl font-semibold">Total Blood Requests</h3>
                        </div>
                        <p className="text-2xl font-bold text-center">{donationRequests.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
