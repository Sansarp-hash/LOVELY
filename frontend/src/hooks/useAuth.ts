import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIClient from './api';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await APIClient.getCurrentUser();
          setState({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          localStorage.removeItem('accessToken');
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message,
          });
        }
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await APIClient.login(email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      setState({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      navigate('/dashboard');
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.error || 'Login failed',
      }));
    }
  };

  const register = async (data: any) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await APIClient.register(data);
      localStorage.setItem('accessToken', response.data.accessToken);
      setState({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      navigate('/dashboard');
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.error || 'Registration failed',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    navigate('/login');
  };

  return {
    ...state,
    login,
    register,
    logout,
  };
};
