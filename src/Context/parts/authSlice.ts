import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id:string;
  email:string;
  role:string;
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
}

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async(_,thunkAPI) => {
    try{
      const response = await axios.get("http://localhost:7071/user/me",{
        withCredentials:true,
      })
      const userData: User = response.data;
      return userData;
    }catch(err){
      return thunkAPI.rejectWithValue({error:'Failed to fetch user'})
    }
  }
)

export const login = createAsyncThunk(
  'users/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI: any) => {
  try{
      const response = await axios.post(
        "http://localhost:7071/api/login/",{
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
      return userData;
  }catch(err){
    return thunkAPI.rejectWithValue({error:'Invalid username or password'})
    }
  }
)

export const logout = createAsyncThunk(
  'users.logout',
  async(_,thunkAPI) => {
    try{
      await axios.post("http://localhost:7071/api/logout/",{},{
        withCredentials: true,
      })
    }catch(err){
      return thunkAPI.rejectWithValue({error:'Logout failed'})
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>  {
    builder
    .addCase(login.pending,(state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled,(state,action)=>{
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(login.rejected,(state,action)=> {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(logout.pending,(state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(logout.fulfilled,(state)=>{
      state.loading = false;
      state.user = null;
    })
    .addCase(logout.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(fetchUser.pending,(state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUser.fulfilled,(state,action)=>{
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(fetchUser.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })
  }
})
export default authSlice.reducer;