import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute restricts access to routes based on login status and role.
 *
 * @param {ReactNode} children - Component to render if allowed.
 * @param {Array} allowedRoles - Optional: array of allowed roles.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Not logged in
  if (!user || !user.userid) {
    return <Navigate to="/login" replace />;
  }

  // Role is not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
