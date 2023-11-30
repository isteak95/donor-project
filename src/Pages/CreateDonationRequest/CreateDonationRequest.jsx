import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const CreateDonationRequest = () => {
  const { user, loading } = useContext(AuthContext);

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    blood: '',
    district: '',
    upazila: '',
    recipientname: '',
    hospital: '',
    address: '',
    donationDate: '',
    donationTime: '',
    requestMessage: '',
  });

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

            // Set the donor data in the form
            setUserForm((prevUserForm) => ({
              ...prevUserForm,
              name: donorData.name,
              email: donorData.email,
              // Set other fields accordingly
            }));
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


  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const upazilas = [
    'Dhaka City', 'Gazipur', 'Tangail', 'Narayanganj', 'Manikganj',
    'Munshiganj', 'Narsingdi', 'Kishoreganj', 'Rajbari', 'Shariatpur',
    'Faridpur', 'Gopalganj', 'Madaripur',
     
    'Chittagong City', 'Cox\'s Bazar', 'Comilla', 'Feni', 'Noakhali',
    'Lakshmipur', 'Brahmanbaria', 'Chandpur', 'Khagrachari', 'Rangamati',
    'Bandarban', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat',
    'Nilphamari','Jessore city', 'Panchagarh', 'Rangpur', 'Thakurgaon', 'Barguna'
  ];
  const districts = [
    'Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Barisal',
    'Sylhet', 'Rangpur', 'Mymensingh', 'Cox\'s Bazar', 'Jessore',
    // Add more districts as needed
  ];
  const handleCreateRequest = () => {
    const newDonationRequest = {
      name: userForm.name,
      email: userForm.email,
      recipientname: userForm.recipientname,
      blood: userForm.blood,
      district: userForm.district,
      upazila: userForm.upazila,
      hospital: userForm.hospital,
      address: userForm.address,
      donationDate: userForm.donationDate,
      donationTime: userForm.donationTime,
      requestMessage: userForm.requestMessage,
      donationStatus: 'pending',
    };
    console.log(newDonationRequest)

    axios
      .post('http://localhost:5000/donor/create-donation-request', newDonationRequest)
      .then((response) => {
        console.log('Donation request created successfully:', response.data);
        toast.success('Donation successful!');
        setUserForm({
          name: '',
          email: '',
          blood: '',
          district: '',
          upazila: '',
          recipientname: '',
          hospital: '',
          address: '',
          donationDate: '',
          donationTime: '',
          requestMessage: '',
        });
      })
      .catch((error) => {
        console.error('Error creating donation request:', error);
        // Implement error handling or notification
      });
  };

  return (
    <div className='lg:mx-40 md:mx-20 mx-10 '>
      <h2 className='text-3xl font-bold text-center my-10'>Create Donation Request</h2>
      <form>
        {/* User Information */}
        <div className="lg:flex gap-24 lg:my-20">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donor Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              value={userForm.name}
              readOnly
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Donor Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              value={userForm.email}
              readOnly
            />
          </div>
        </div>
        {/* Additional Information */}
        <div className="lg:flex gap-24 lg:my-20">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient Name</span>
            </label>
            <input
              name="recipientname"
              type="text"
              placeholder="Recipient name"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              value={userForm.recipientname}
              required
              onChange={(e) => setUserForm({ ...userForm, recipientname: e.target.value })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl">Blood Group</span>
            </label>
            <select
              name="blood"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              onChange={(e) => setUserForm({ ...userForm, blood: e.target.value })}
              value={userForm.blood}
              required
            >
              <option value="">Blood</option>
              {bloodGroups.map((bolods) => (
                <option key={bolods} value={bolods}>
                  {bolods}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location Information */}
        <div className="lg:flex gap-24 lg:my-20 ">
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

        {/* Donation Time */}
        <div className="lg:flex gap-24 lg:my-20">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donation Date</span>
            </label>
            <input
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              type="date"
              onChange={(e) => setUserForm({ ...userForm, donationDate: e.target.value })}
              value={userForm.donationDate}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donation Time</span>
            </label>
            <input
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              type="time"
              onChange={(e) => setUserForm({ ...userForm, donationTime: e.target.value })}
              value={userForm.donationTime}
              required
            />
          </div>
        </div>

        {/* Hospital Information */}
        <div className="lg:flex gap-24 lg:my-20">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hospital Name</span>
            </label>
            <input
              name="hospital"
              type="text"
              placeholder="Hospital name"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              value={userForm.hospital}
              required
              onChange={(e) => setUserForm({ ...userForm, hospital: e.target.value })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Address</span>
            </label>
            <input
              name="address"
              type="text"
              placeholder="Full address"
              className="input input-bordered lg:w-[575px] md:w-[575px]"
              value={userForm.address}
              required
              onChange={(e) => setUserForm({ ...userForm, address: e.target.value })}
            />
          </div>
        </div>

        {/* Request Message */}
        <div>
          <label className="label">
            <span className="label-text">Request Message</span>
          </label>
          <textarea
            required
            className="input input-bordered w-96 lg:w-full h-44 md:w-[575px]"
            value={userForm.requestMessage}
            onChange={(e) => setUserForm({ ...userForm, requestMessage: e.target.value })}
          />
        </div>

        {/* Create Request Button */}
        <div className="flex justify-center mt-4">
          <button className="btn btn-error" type="button" onClick={handleCreateRequest}>
            Create Request
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" />

    </div>
  );
};

export default CreateDonationRequest;
