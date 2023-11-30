import { useState, useEffect } from 'react';
import axios from 'axios';

const VolunteerAllBloodDonation = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // Default filter: all
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5); // Adjust the number of requests per page

  useEffect(() => {
    // Fetch all blood donation requests from the backend (replace the URL with your actual endpoint)
    axios.get('http://localhost:5000/all-blood-donation-request')
      .then((response) => {
        setDonationRequests(response.data);
        setFilteredRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching all blood donation requests:', error);
      });
  }, []);

  // Filter the blood donation requests based on the selected status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredRequests(donationRequests);
    } else {
      const filtered = donationRequests.filter(request => request.donationStatus === statusFilter);
      setFilteredRequests(filtered);
    }
  }, [statusFilter, donationRequests]);

  // Pagination logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to update the donation status
  const updateDonationStatus = (requestId, newStatus) => {
    // Perform the update API call using axios
    // You need to replace the URL and add necessary logic based on your backend
    axios.put(`http://localhost:5000/update-donation-status/${requestId}`, { newStatus })
      .then((response) => {
        // Assuming the update is successful, update the local state
        const updatedRequests = donationRequests.map(request =>
          request._id === requestId ? { ...request, donationStatus: newStatus } : request
        );
        setDonationRequests(updatedRequests);
        setFilteredRequests(updatedRequests);
      })
      .catch((error) => {
        console.error('Error updating donation status:', error);
        // Handle error
      });
  };

  return (
    <div className='lg:mx-10'>
      <h1 className='mt-5 text-center text-black text-3xl font-bold'>All Blood Donation Requests</h1>

      {/* Filtering options */}
      <div className='my-10 text-center text-black lg:text-3xl font-bold'>
        <label>Filter by Status:</label>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Donation Requests Table */}
      <table className='table'>
        <thead>
          <tr>
            <th className='lg:text-lg text-black'>Recipient Name</th>
            <th className='lg:text-lg text-black'>Blood Group</th>
            <th className='lg:text-lg text-black'>Hospital</th>
            <th className='lg:text-lg text-black'>Donation Date</th>
            <th className='lg:text-lg text-black'>Donation Time</th>
            <th className='lg:text-lg text-black'>Recipient Location</th>
            <th className='lg:text-lg text-black'>Status</th>
            <th className='lg:text-lg text-black'>Update Status</th>
          </tr>
        </thead>
        <tbody className='bg-base-300'>
          {currentRequests.map(request => (
            <tr key={request._id}>
              <td>{request.recipientname}</td>
              <td>{request.blood}</td>
              <td>{request.hospital}</td>
              <td>{request.donationDate}</td>
              <td>{request.donationTime}</td>
              <td>{`${request.district}, ${request.upazila}`}</td>
              <td>{request.donationStatus}</td>
              <td>
                {/* Button to update the donation status */}
                <button onClick={() => updateDonationStatus(request._id, 'newStatus')}>
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(filteredRequests.length / requestsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VolunteerAllBloodDonation;
