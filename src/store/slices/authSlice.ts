import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    id: string;
    email: string;
    name: string;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;