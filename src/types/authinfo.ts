export interface User {
  id: string;
  name: string;
  email: string;
  roles: string; 
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginResponse {
  user: User;
  token: string;
}