import { setFlashMessage } from '@/store/flashMessage';

export const setFlashSuccess = ({ message }) => async (dispatch) => {
  dispatch(setFlashMessage({ message, type: 'success' }));
};

export const setFlashInfo = ({ message }) => async (dispatch) => {
  dispatch(setFlashMessage({ message, type: 'info' }));
};

export const setFlashWarning = ({ message }) => async (dispatch) => {
  dispatch(setFlashMessage({ message, type: 'warning' }));
};

export const setFlashError = ({ message }) => async (dispatch) => {
  dispatch(setFlashMessage({ message, type: 'error' }));
};
