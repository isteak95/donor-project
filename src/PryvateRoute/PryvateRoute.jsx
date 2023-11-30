// PrivateRoute.js
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Wait for the user and loading state to be initialized
    if (!loading) {
      setInitialized(true);
    }
  }, [loading]);

  // If the user is loading or the route is not yet initialized, display a loading message
  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (user) {
    // User is authenticated, allow access to the protected route
    return children;
  } else {
    // User is not authenticated, redirect to the login page
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
