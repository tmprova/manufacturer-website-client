import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import auth from "../firebase/firebase.init";
import useAdmin from "./useAdmin";

const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, isLoading] = useAdmin(user?.email);
  const location = useLocation();

  if (loading || isLoading) return <Loading></Loading>;

  if (!user || !admin.data.admin) {
    signOut(auth);
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default RequireAdmin;
