/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'classRoomCompleted',
  initialState: {
    page: 1,
    items: [],
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    classRoomsCompletedFetched(state, { payload: { items, totalCount, page } }) {
      state.page = page;
      state.items = items;
      state.totalCount = totalCount;
    },
  },
});

export const {
  setLoading,
  classRoomsCompletedFetched,
} = slice.actions;

export default slice.reducer;
