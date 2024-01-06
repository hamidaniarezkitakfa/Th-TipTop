import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './services/authContex';

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {

    return <Navigate to="/admin/login" />;
  }

  return children; // Si authentifié, affichez l'enfant (la route protégée)
};

export default ProtectedAdminRoute;
