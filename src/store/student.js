/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'student',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    studentsFetched(state, { payload: { records } }) {
      state.items = records;
    },
  },
});

export const { setLoading, studentsFetched } = slice.actions;

export default slice.reducer;
