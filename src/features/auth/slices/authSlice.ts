import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  role: {
    _id: string;
    role: string;
    roleDisplayName: string;
  };
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  userName: string;
  profileImage: string;
  status: string;
  createdAt: string;
}

// 1. Define the shape of your state
interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

// 2. Set the initial state
const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
};

// 3. Create the slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action: User logs in successfully
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    // Action: User logs out
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
