/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'studentSurvey',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    studentSurveysFetched(state, { payload: { records } }) {
      state.items = records;
    },
  },
});

export const { setLoading, studentSurveysFetched } = slice.actions;

export default slice.reducer;
