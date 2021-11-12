// import api from '@/api';
import api from '@/api';
import {
  loggedOut,
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

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await api.post('/users/sign_in', {
        user: {
          email,
          password,
        },
      });
      setUserToLocalStorage(response.data?.user);
      dispatch(loginSuccess({ user: response.data?.user }));
    } catch (error) {
      dispatch(loginFail({ error: error.response?.data?.error }));
      console.error(error);
    }
  };

export const signUp = (data) => async (dispatch) => {
  dispatch(signUpRequest());

  try {
    await api.post('/users', {
      user: snakecaseKeys(data, { keepCase: true }),
    });

    dispatch(signUpSuccess());
    return true;
  } catch (error) {
    dispatch(signUpFail({ error: error.response.data.error }));
    console.error(error);
    return false;
  }
};

export const logout = () => async (dispatch) => {
  removeUserFromLocalStorage();
  dispatch(loggedOut());
};
