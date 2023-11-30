import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const MyDonationRequests = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // Default filter: all
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5); // Adjust the number of requests per page
  const { user, loading } = useContext(AuthContext);




  useEffect(() => {
    // Example: Fetch additional data based on the user when not loading
    if (!loading && user && user.email) {
      // Perform additional logic or data fetching here
      console.log('User data:', user);
    }
  }, [user, loading]);
  useEffect(() => {
    // Fetch donation requests from the backend (replace the URL with your actual endpoint)
    axios.get(`http://localhost:5000/donor/create-donation-request?email=${user.email}`)
      .then((response) => {
        setDonationRequests(response.data);
        setFilteredRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching donation requests:', error);
      });
  }, []);

  // Filter the donation requests based on the selected status
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

  return (
    <div className='lg:mx-10 overflow-x-auto'>
      <h1 className=' text-center text-3xl font-bold my-14'>My Donation Requests</h1>

      {/* Filtering options */}
      <div className='text-center lg:text-2xl font-bold my-10'>
        <label>Filter by Status </label>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Donation Requests Table */}
      <table className="table ">
        <thead>
          <tr className="bg-base-200">
            <th className='lg:text-lg text-black'>Recipient Name</th>
            <th className='lg:text-lg text-black'>Blood Group</th>
            <th className='lg:text-lg text-black'>Hospital</th>
            <th className='lg:text-lg text-black'>Donation Date</th>
            <th className='lg:text-lg text-black'>Donation Time</th>
            <th className='lg:text-lg text-black'>Recipient Location</th>
            <th className='lg:text-lg text-black'>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map(request => (
            <tr key={request._id} className="bg-base-300">
              <td>{request.recipientname}</td>
              <td>{request.blood}</td>
              <td>{request.hospital}</td>
              <td>{request.donationDate}</td>

              <td>{request.donationTime}</td>
              <td>{`${request.district}, ${request.upazila}`}</td>

              <td>{request.donationStatus}</td>
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

export default MyDonationRequests;
