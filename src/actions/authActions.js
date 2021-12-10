// import api from '@/api';
import api from '@/api';
import {
  loggedOutFail,
  loggedOutRequest,
  loggedOutSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  signUpFail,
  signUpRequest,
  signUpSuccess,
} from '@/store/auth';
import {
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from '@/utils/authUtils';
import snakecaseKeys from 'snakecase-keys';

export const login = ({ email, password }) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await api.post('/users/sign_in', {
      user: {
        email,
        password,
      },
    });
    const user = response?.data?.user;
    user.token = response.headers.authorization.replace('Bearer ', '');

    setUserToLocalStorage(user);
    dispatch(loginSuccess({ user: response.data?.user }));
  } catch (error) {
    dispatch(loginFail({ error: error.response?.data?.error }));
    console.error(error);
  }
};

export const signUp = (data) => async (dispatch) => {
  dispatch(signUpRequest());

  try {
    const response = await api.post('/users', {
      user: snakecaseKeys(data, { keepCase: true }),
    });

    dispatch(signUpSuccess());

    if (response?.data?.user) {
      return true;
    }
    return false;
  } catch (error) {
    dispatch(signUpFail({ error: error?.response?.data?.error }));
    console.error(error);
    return false;
  }
};

export const logout = () => async (dispatch) => {
  dispatch(loggedOutRequest());

  try {
    await api.delete('/users/sign_out');
    removeUserFromLocalStorage();
    dispatch(loggedOutSuccess());
    return true;
  } catch (error) {
    dispatch(loggedOutFail({ error: error.response.data.error }));
    console.error(error);
    return false;
  }
};
