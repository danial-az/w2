import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useProtectedRoute = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      navigate('/login');
    }
  }, [state.isAuthenticated, state.isLoading, navigate]);

  return state.isAuthenticated;
};