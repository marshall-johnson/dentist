import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'flashMessage',
  initialState: {
    message: '',
    type: '',
  },
  reducers: {
    setFlashMessage(state, { payload: { message, type } }) {
      state.message = message;
      state.type = type;
    },
  },
});

export const { setFlashMessage } = slice.actions;

export default slice.reducer;
