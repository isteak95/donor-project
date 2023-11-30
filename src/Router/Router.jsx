import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/SignIn/SignIn";
import RegistrationForm from "../Pages/Registration/Registration";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Profile/Profile";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import CreateDonationRequest from "../Pages/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../Pages/MyDonationRequests/MyDonationRequests";
import AllUser from "../Pages/AllUser/AllUser";
import AllBloodDonation from "../Pages/AllBloodDonation/AllBloodDonation";
import ContentManagement from "../Pages/ContentManagement/ContentManagement";
import AddVlog from "../Pages/AddBlog/AddVlog";
import SearchDonors from "../Pages/Home/SearchDonors/SearchDonors";
import UpdateDonation from "../Pages/UpdateDonation/UpdateDonation";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import BloodDonation from "../Pages/BloodDonation/BloodDonation";
import DonatinDetials from "../Pages/DonatinDetials/DonatinDetials";
import Blog from "../Pages/Blog/Blog";
  const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
      children : [
        {
            path: "/",
            element : <Home></Home>
        },
        {
          path: "/signin",
          element: <SignIn></SignIn>,
        },
        {
            path : "/registration",
            element : <RegistrationForm></RegistrationForm>
        },
        {
          path:"/searchdonors",
          element: <SearchDonors></SearchDonors>
        },
        {
          path : "/donationrequests",
          element : <BloodDonation></BloodDonation>
        },
        {
          path : "/donationdetails",
          element : <DonatinDetials></DonatinDetials>
        },
        {
          path : "/blog",
          element : <Blog></Blog>

        }
      ]
    },
    {
        path : "/dashboard",
        element : <Dashboard></Dashboard>,
        children: [
            {
                path : "/dashboard",
                element : <DashboardHome></DashboardHome>
            },
            {
              path: "/dashboard/admin",
              element :<AdminDashboard></AdminDashboard>
            },
            {
                path : "/dashboard/profile",
                element : <Profile></Profile>
            },
            {
                path: "/dashboard/my-donation-requests",
                element : <MyDonationRequests></MyDonationRequests>
            },
            {
                path: "/dashboard/create-donation-request",
                element : <CreateDonationRequest></CreateDonationRequest>
            },
            {
              path : "/dashboard/all-users",
              element : <AllUser></AllUser>
            },
            {
              path : "/dashboard/all-blood-donation-request",
              element : <AllBloodDonation></AllBloodDonation>
            },
            {
              path : "/dashboard/content-management",
              element : <ContentManagement></ContentManagement>
            },
            {
              path : "/dashboard/content-management/add-blog",
              element : <AddVlog></AddVlog>
            },
            {
              path :"/dashboard/update-donation-request",
              element : <UpdateDonation></UpdateDonation>
            }
           
        ]

    }
  ]);

export default router;