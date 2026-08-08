import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

// 1. Define the shape of your state
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: { name: string; email: string } | null;
}

// 2. Set the initial state
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
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
        user: { name: string; email: string };
        token: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    // Action: User logs out
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
