'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  user: User | null; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // ログイン関数
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:7071/api/login/",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            withCredentials: true, 
            "Content-Type": "application/json",
          },
        }
      );

      const userData: User = response.data.user;
      setUser(userData);
      setError(null);
      router.push('/Chat');
    } catch (err) {
      setError('Invalid username or password');
      console.error("Login failed:", err);
    }
  };

  // ログアウト関数
  const logout = () => {
    setUser(null);
    axios.post("http://localhost:7071/api/logout/", {}, {
      withCredentials: true,
    })
    .then(() => {
      router.push('/login');
    })
    .catch((err) => {
      console.error("Logout failed:", err);
    });
  };

  const value = {
    login,
    logout,
    error,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// フックを使ってコンテキストを利用する
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
