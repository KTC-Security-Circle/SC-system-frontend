'use client';
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import axios from 'axios';
import {  User, LoginResponse } from '@/types/authinfo';
import { setAuthToken, getAuthToken, removeAuthToken } from '@/utils/cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
  }

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    error: null,
};

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: LoginResponse } //ログイン成功時のアクション
  | { type: 'LOGIN_FAILURE'; payload: string } //ログイン失敗時のアクション
  | { type: 'LOGOUT' } //ログアウト時のアクション
  | { type: 'SET_USER'; payload: { user: User } }; //ユーザー情報をセットするアクション

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return initialState;
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
      };
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get<{ user: User; }>('#', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: 'SET_USER', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>('#', { email, password });
      setAuthToken(response.data.token);
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: response.data
      });
        router.push('/');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as Error).message });
    }
  };

  const logout = () => {
    removeAuthToken();
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth=()=> {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}