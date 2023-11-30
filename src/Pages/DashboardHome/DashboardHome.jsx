import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const DashboardHome = () => {
  const [donorData, setDonorData] = useState([]);
  const [recentDonationRequests, setRecentDonationRequests] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && user && user.email) {
      console.log('User data:', user);
    }
  }, [user, loading]);

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
    axios.get('http://localhost:5000/donor/create-donation-request')
      .then((response) => {
        setRecentDonationRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recent donation requests:', error);
      });
  }, []);

  const showViewAllButton = recentDonationRequests.length > 3;



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
        </>
      );
    }
    return null;
  };

  return (
    <div>
      {donorData.map((donor) => (
        <div key={donor._id}>
          <h2 className='text-center my-10 text-3xl font-bold'>
            Welcome {donor.name || 'Guest'} !
          </h2>
          {recentDonationRequests.length > 0 && (
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
                  {recentDonationRequests.slice(0, 3).map((request) => (
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showViewAllButton && (
                <Link to='/dashboard/my-donation-requests/'>
                  <div className='text-center'>
                    <button className='btn btn-secondary my-10'>
                      View My All Requests
                    </button>
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardHome;
