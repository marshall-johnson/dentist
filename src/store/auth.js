import { createSlice } from '@reduxjs/toolkit';
import { getUserFromLocalStorage } from '@/utils/authUtils';

const initialUser = getUserFromLocalStorage();

const slice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    currentUser: initialUser,
    error: null,
  },
  reducers: {
    loginRequest(state) {
      state.error = null;
      state.loading = true;
    },
    loginSuccess(state, { payload: { user } }) {
      state.currentUser = user;
      state.loading = false;
    },
    loginFail(state, { payload: { error } }) {
      state.error = error;
      state.currentUser = null;
      state.loading = false;
    },
    loggedOut(state) {
      state.currentUser = null;
    },
    signUpRequest(state) {
      state.error = null;
      state.loading = true;
    },
    signUpSuccess(state) {
      state.loading = false;
    },
    signUpFail(state, { payload: { error } }) {
      state.error = error;
      state.currentUser = null;
      state.loading = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  loggedOut,
  signUpRequest,
  signUpSuccess,
  signUpFail,
} = slice.actions;

export default slice.reducer;
