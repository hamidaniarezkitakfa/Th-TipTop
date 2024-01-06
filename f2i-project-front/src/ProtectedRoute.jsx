import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './services/authContex';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {

    return <Navigate to="/signup" />;
  }

  return children; // Si authentifié, affichez l'enfant (la route protégée)
};

export default ProtectedRoute;
