/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'classRoom',
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
    classRoomsFetched(state, { payload: { items, totalCount, page } }) {
      state.page = page;
      state.items = items;
      state.totalCount = totalCount;
    },
    classRoomDetail(state, { payload: { item } }) {
      state.item = item;
    },
  },
});

export const {
  setLoading,
  classRoomDetail,
  classRoomsFetched,
} = slice.actions;

export default slice.reducer;
