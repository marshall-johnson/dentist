/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'student',
  initialState: {
    items: [],
    item: {},
    meta: {},
    loading: false,
  },
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    studentsFetched(state, { payload: { records, meta } }) {
      state.items = records;
      state.meta = meta;
    },

    studentFetched(state, { payload: { record } }) {
      state.item = record;
    },

    deletedStudent(state, { payload: { id } }) {
      state.items = state.items.filter((data) => data.id !== id);
    },
  },
});

export const { setLoading, studentsFetched, studentFetched, deletedStudent } =
  slice.actions;

export default slice.reducer;
