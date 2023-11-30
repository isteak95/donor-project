import { useContext } from 'react';
import  { useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useEffect } from 'react';
import axios from 'axios';

const DonationDetails = () => {
  // State to manage the modal
  const [isModalOpen, setModalOpen] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [uses, setuses] = useState();



  // Sample data, replace it with actual data from the donation request
  useEffect(() => {
    // Example: Fetch additional data based on the user when not loading
    if (!loading && user && user.email) {
      // Perform additional logic or data fetching here
      console.log('User data:', user);
    }
  }, [user, loading]);

  useEffect(() => {
    // Fetch donor data based on email and name
    const fetchDonorData = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(`http://localhost:5000/user?email=${user.email}`);
          const donorDataArray = response.data;
          console.log(response.data);
          console.log('Donor Data:', donorDataArray);
          if (donorDataArray.length > 0) {
            // Take the first donor from the array (assuming there is only one matching donor)
            const donorData = donorDataArray[0];
            setuses(donorData)

      
          }
        }

      } catch (error) {
        console.error('Error fetching donor data:', error);
        // Handle error
      }
    };

    // Call the fetchDonorData function
    fetchDonorData();
  }, [user]);


  // Function to handle donation confirmation
  const handleConfirmDonation = () => {
    // Perform actions to update donation status (e.g., make an API call)
    // Close the modal after confirmation
    setModalOpen(false);
  };

  return (
    <div className="lg:mx-40 md:mx-20 mx-10 ">
      <h2 className="text-3xl font-bold text-center my-10">Donation Details</h2>

      {/* Display donation information */}
      <div className="bg-white p-6 rounded-lg shadow-md border-4 mt-10">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-2">🩸</span>
          <h3 className="text-2xl font-semibold">Donation Request Information</h3>
        </div>
        <p className='text-xl'>Donor Name: {uses?.name}</p>
        <p className='text-xl'>Donor Email: {uses?.email}</p>
        {/* Add other fields from the donation request */}
      </div>

      {/* Donate Button */}
      <div className="flex justify-center mt-4">
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Donate
        </button>
      </div>

      {/* Donation Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            {/* Donation Form */}
            <form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donor Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={uses.name}
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donor Email</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={uses.email}
                  readOnly
                />
              </div>

              {/* Add other input fields as needed */}
            </form>

            {/* Confirm Button */}
            <div className="flex justify-center mt-4">
              <button className="btn btn-primary" onClick={handleConfirmDonation}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;

