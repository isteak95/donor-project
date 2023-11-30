import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Dashboard = () => {
  const [donorData, setDonorData] = useState({});
  const { user, loading } = useContext(AuthContext);
  useEffect(() => {
    // Example: Fetch additional data based on the user when not loading
    if (!loading && user && user.email) {
      // Perform additional logic or data fetching here
      console.log('User data:', user);
    }
  }, [user, loading]);
  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get(`http://localhost:5000/user?email=${user.email}`);
          const donorDataArray = response.data;
          console.log(response.data);
          console.log('Donor Data:', donorDataArray);
          if (donorDataArray.length > 0) {
            setDonorData(donorDataArray[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching donor data:', error);
      }
    };

    fetchDonorData();
  }, [user]);

  const isAdmin = donorData.role === 'admin';
  const isVolunteer = donorData.role === 'volunteer';
  const isDonor = !isAdmin && !isVolunteer;

    

    return (
        <div>
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content  bg-amber-300">
                    {/* Page content here */}
                    <div className=" text-center mt-6 ">
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                            Open drawer
                        </label>
                    </div>
                    <Outlet />
                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-rose-500 text-base-content ">
                        {/* Sidebar content here */}
                        {isAdmin && (
                            <>
                                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                                <li className="my-10 text-xl font-medium text-white">
                                    <NavLink to="/dashboard/profile">Profile</NavLink>
                                </li>
                                <li className="text-xl font-medium text-white">
                                    <NavLink to="/dashboard/admin">Home</NavLink>
                                </li>
                                <li className="my-5 text-xl font-medium text-white">
                                    <NavLink to="/dashboard/all-users">All Users</NavLink>
                                </li>
                                <li className="text-xl font-medium text-white">
                                    <NavLink to="/dashboard/all-blood-donation-request">All Blood Donation Request</NavLink>
                                </li>
                                <li className="my-5 text-xl font-medium text-white">
                                    <NavLink to="/dashboard/content-management">Content Management</NavLink>
                                </li>
                                <li className="my-40 text-xl font-medium text-white">
                                    <NavLink to="/"> Back Home page !</NavLink>
                                </li>
                            </>
                        )}
                        {!isAdmin && isDonor && (
                            <>
                                <h1 className="text-3xl font-bold text-white">Donor Dashboard</h1>

                                <li className="my-10 text-xl font-medium text-white">
                                    <NavLink to="/dashboard/profile">Profile</NavLink>
                                </li>
                                <li className="my- text-xl font-medium text-white">
                                    <NavLink to="/dashboard">Home</NavLink>
                                </li>
                                <li className="my-5 text-xl font-medium text-white">
                                    <NavLink to="/dashboard/my-donation-requests">My Donation Requests</NavLink>
                                </li>
                                <li className="my- text-xl font-medium text-white">
                                    <NavLink to="/dashboard/create-donation-request">Create Donation Request</NavLink>
                                </li>
                                <li className="my-40 text-xl font-medium text-white">
                                    <NavLink to="/">Back Home page !</NavLink>
                                </li>
                            </>
                        )}
                        {!isAdmin && !isDonor && isVolunteer && (
                            <>
                                <h1 className="text-3xl font-bold text-white">Volunteer Dashboard</h1>

                                <li className="my-10 text-xl font-medium text-white ">
                                    <NavLink to="/dashboard/profile">Profile</NavLink>
                                </li>
                                <li className="text-xl font-medium text-white">
                                    <NavLink to="/dashboard">Home</NavLink>
                                </li>
                                <li className="my-5 text-xl font-medium text-white">
                                    <NavLink to="/dashboard/all-blood-donation-request">All Blood Donation Request</NavLink>
                                </li>
                                <li className=" text-xl font-medium text-white">
                                    <NavLink to="/dashboard/content-management">Content Management</NavLink>
                                </li>
                                <li className="my-40 text-xl font-medium text-white">
                                    <NavLink to="/">Back Home page !</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
