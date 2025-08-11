import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const location = useLocation();

  const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const adminData = typeof window !== 'undefined' ? localStorage.getItem('admin') : null;

  if (!adminToken || !adminData) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedAdminRoute;


