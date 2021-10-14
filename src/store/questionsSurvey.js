/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'questionsSurvey',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    questionsFetched(state, { payload: { items} }) {
      state.items = items;
    }
  },
});

export const {
  setLoading,
  questionsFetched,
} = slice.actions;

export default slice.reducer;
