// import api from '@/api';
import { throwErrors } from '@/actions/errorActions';
import { loginRequest, loginSuccess, loginFail, loggedOut } from '@/store/auth';
import {
  setUserToLocalStorage,
  removeUserFromLocalStorage,
} from '@/utils/authUtils';

const fakeUser = {
  name: 'bentran',
  email: 'me@example.com',
  password: 'password123',
  githubProfileUrl: 'https://github.com/tranquangvu',
  token: 'secretUserAuthToken',
};

export const login = ({ email, password }) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    // Simulate login request
    await new Promise(resolve => setTimeout(resolve, 500));
    if (email === fakeUser.email && password === fakeUser.password) {
      setUserToLocalStorage(fakeUser);
      dispatch(loginSuccess({ user: fakeUser }));
    } else {
      throw new Error();
    }

    // Uncomment the code below to invoke real login request
    // const { data: user } = await api.post('/auth/login', {
    //   email, password,
    // });
    // setUserToLocalStorage(user);
    // dispatch(loginSuccess({ user }));
  } catch (error) {
    dispatch(loginFail());
    dispatch(throwErrors(['Email or password is invalid']));
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  removeUserFromLocalStorage();
  dispatch(loggedOut());
};
