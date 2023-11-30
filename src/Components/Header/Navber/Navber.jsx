import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const Navber = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [showDashboard, setShowDashboard] = useState(false);
  const [donorData, setDonorData] = useState();
  console.log(donorData);

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
          console.log(response.data);
          console.log('Donor Data:', donorDataArray);
          if (donorDataArray.length > 0) {
            const donorData = donorDataArray[0];
            setDonorData(donorData);
            console.log(donorData);
          }
        }
      } catch (error) {
        console.error('Error fetching donor data:', error);
      }
    };

    fetchDonorData();
  }, [user]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, log out',
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        setShowDashboard(false);

        Swal.fire('Logged out', 'You have been successfully logged out.', 'success');
      }
    });
  };

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <div className="py-7 shadow-md bg-red-500">
      <div className={`navbar bg-base-300 `}>
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[9] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'bg-rose-500' : '')}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/donationrequests"
                  className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? ' bg-rose-500' : '')}
                >
                  Donation Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? ' bg-rose-500' : '')}
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/donationdetails"
                  className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? ' bg-rose-500' : '')}
                >
                  Blood Donation Details
                </NavLink>
              </li>
              
            </ul>
          </div>
          <img
            className="lg:h-16 lg:w-32 mx-2 md:h-14 h-8"
            src="https://i.ibb.co/LZys9cQ/vecteezy-hand-holding-a-drop-of-blood-world-blood-donor-day-blood-19152949.png"
            alt="pngwing-com-3"
            border="0"
          />
          <h1 className="lg:text-4xl lg:font-semibold md:text-2xl font-medium lg:mb-2  text-red-500">BLOOD HOUSE</h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? ' bg-rose-500' : '')}
              >
                Home
              </NavLink>
            </li>
            <li className="mx-3">
              <NavLink
                to="/donationrequests"
                className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? ' bg-rose-500' : '')}
              >
                Donation Requests
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? ' bg-rose-500' : '')}
              >
                Blog
              </NavLink>
            </li>
            <li>
                <NavLink
                  to="/donationdetails"
                  className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? ' bg-rose-500' : '')}
                >
                  Donation Details
                </NavLink>
              </li>
          </ul>
        </div>
        <div className="navbar-end md:navbar-end lg:gap-8 md:gap-2  md:mr-3">
          {user ? (
            <React.Fragment>
              <div className="flex items-stretch  ">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className=" ">
                    <div className="lg:text-bold lg:text-xl mx-1 md:mx-auto lg:mx-auto lg:ml-5">
                      {donorData && donorData.avater ? (
                        <img
                          src={donorData.avater}
                          className="h-10 w-10 rounded-full lg:mr-auto md:mr-auto mr-2"
                          onClick={toggleDashboard}
                          style={{ cursor: 'pointer' }}
                        />
                      ) : (
                        <div
                          className="h-10 w-10 rounded-full bg-gray-300 lg:mr-auto md:mr-auto mr-2"
                          onClick={toggleDashboard}
                          style={{ cursor: 'pointer' }}
                        ></div>
                      )}
                    </div>
                  </div>
                  <ul className="menu dropdown-content z-[9] p-2 shadow  bg-red-500 rounded-box w-64 mt-4 text-center">
                    <li className="py-2 bg-white btn my-5">
                      <h2 className=" text-lg font-bold "> {donorData && donorData.name}</h2>
                    </li>
                    <li className="py-2 bg-white font-bold text-base rounded-md md:text-lg md:font-bold lg:text-bold lg:text-xl">
                      <NavLink
                        to="/dashboard"
                        className={({ isActive, isPending }) =>
                          isPending ? 'pending' : isActive ? ' bg-rose-500' : ''
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="bg-white my-5  rounded-md">
                      <button
                        className=" btn rounded-md font-bold text-base lg:text-bold lg:text-xl md:text-lg cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavLink to="/registration">
                <a className="btn lg:text-bold lg:text-xl lg:px-8 bg-teal-600">Registration</a>
              </NavLink>
              <NavLink to="/signin">
                <a className="btn lg:text-bold lg:text-xl lg:px-8 bg-teal-600">Sign In</a>
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
