import api from '@/api';
import snakecaseKeys from 'snakecase-keys';
import {
  setLoading,
} from '@/store/doctor';
import {
  throwErrors,
  clearErrors
} from '@/actions/errorActions';
import {
  setFlashError,
  setFlashSuccess,
} from '@/actions/flashMessageActions';

import AppConfig from '@/constants/AppConfig';

export const dentistrySubmitData = ({ params, history }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .post('/api/v1/dentistries', snakecaseKeys(params))
    .then(({ data: { success, message } }) => {
      if (success) {
        dispatch(clearErrors('dentistrySubmitData'));
        dispatch(setFlashSuccess({ message }));

        history.push(AppConfig.ROUTES.STUDENTS_SUBMIT_DATA);
      } else {
        dispatch(setFlashError({ message }));
      }
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(throwErrors('dentistrySubmitData', { 'Submitted data': ['is invalid'] }));
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
