import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other feature slices here later:
    // theme: themeReducer,
    // issues: issuesReducer,
  },
});

// Extract the exact types of your store for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
