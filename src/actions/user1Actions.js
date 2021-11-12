import api from '@/api';
import snakecaseKeys from 'snakecase-keys';
import { setLoading } from '@/store/purchase';
import { throwErrors, clearErrors } from '@/actions/errorActions';
import { setFlashError, setFlashSuccess } from '@/actions/flashMessageActions';
import AppConfig from '@/constants/AppConfig';

export const createUser =
  ({ params, history }) =>
  async (dispatch) => {
    dispatch(setLoading(true));

    return api
      .post('/api/v1/user1s', snakecaseKeys(params))
      .then(({ data: { success, message } }) => {
        if (success) {
          dispatch(clearErrors('userItem'));
          dispatch(setFlashSuccess({ message }));

          history.push(AppConfig.ROUTES.REGISTRATION);
        } else {
          dispatch(setFlashError({ message }));
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          dispatch(
            throwErrors('userItem', { 'Submitted data': ['is invalid'] }),
          );
        }
        throw error;
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
