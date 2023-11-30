import  { useState } from 'react';

const SearchDonors = () => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const upazilas = [
    'Dhaka City', 'Gazipur', 'Tangail', 'Narayanganj', 'Manikganj',
    'Munshiganj', 'Narsingdi', 'Kishoreganj', 'Rajbari', 'Shariatpur',
    'Faridpur', 'Gopalganj', 'Madaripur',
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

  const [searchCriteria, setSearchCriteria] = useState({
    bloodGroup: '',
    district: '',
    upazila: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };

  const handleSearch = () => {
    // Implement the logic to fetch donor list based on search criteria
    console.log('Search Criteria:', searchCriteria);
    // Update the state or make an API call to fetch donor list
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md py-80 ">
      <h2 className="text-2xl font-bold mb-4">Search Donors</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Blood Group</label>
          <select
            name="bloodGroup"
            value={searchCriteria.bloodGroup}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">District</label>
          <select
            name="district"
            value={searchCriteria.district}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upazila</label>
          <select
            name="upazila"
            value={searchCriteria.upazila}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((upazila) => (
              <option key={upazila} value={upazila}>
                {upazila}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={searchCriteria.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>
      {/* Display donor list here based on the search */}
      {/* ... */}
    </div>
  );
};

export default SearchDonors;
