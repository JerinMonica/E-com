import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userid = localStorage.getItem('userid');
  return userid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
