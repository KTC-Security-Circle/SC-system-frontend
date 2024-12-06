'use client';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

// 非同期でユーザー情報を取得
export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "users/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:7071/user/me", {
        withCredentials: true,
      });
      return response.data; 
    } catch (err) {
      console.error("Fetch user failed:", err);
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }
  }
);

// 非同期でログイン処理
export const login = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:7071/api/login/",
        { email, password },
        {
          headers: {
            withCredentials: true, 
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login response:", response.data);
      const expires = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 分
      Cookies.set('access_token', response.data.access_token, { expires, sameSite: 'Lax' });
      const user = {
        id: "temporary-id", // 必要ならバックエンドから適切に取得
        email: response.data.email, 
        role: response.data.role,
      };
      return user;
    } catch (err) {
      console.error("Login failed:", err);
      return thunkAPI.rejectWithValue("Invalid username or password");
    }
  }
);

// 非同期でログアウト処理
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "users/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post(
        "http://localhost:7071/api/logout/",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed:", err);
      return thunkAPI.rejectWithValue("Failed to logout");
    }
  }
);

// authSlice の作成
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUser の処理
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred";
      })

      // login の処理
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred";
      })

      // logout の処理
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null; 
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred";
      });
  },
});

export default authSlice.reducer;
