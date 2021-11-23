import api from '@/api';
import snakecaseKeys from 'snakecase-keys';
import { setLoading } from '@/store/doctor';
import { throwErrors, clearErrors } from '@/actions/errorActions';
import { setFlashError, setFlashSuccess } from '@/actions/flashMessageActions';

import AppConfig from '@/constants/AppConfig';

export const dentistrySubmitData =
  (id, { params, history }) =>
  async (dispatch) => {
    dispatch(setLoading(true));

    return api
      .post(`/api/v1/students/${id}/dentistries`, snakecaseKeys(params))
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
          dispatch(
            throwErrors('dentistrySubmitData', {
              'Submitted data': ['is invalid'],
            }),
          );
        }
        throw error;
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const updateDentistryData = (id, params) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .put(`/api/v1/students/${id}/dentistries`, snakecaseKeys(params))
    .then(({ data: { success, message } }) => {
      if (success) {
        dispatch(clearErrors('updateDentistryData'));
        dispatch(setFlashSuccess({ message }));
      } else {
        dispatch(setFlashError({ message }));
      }
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(
          throwErrors('updateDentistryData', {
            'Updatted data': ['is invalid'],
          }),
        );
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const showDentistryData = (id, params) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get(
      `/api/v1/students/${id}/dentistries?year=${params.year}&month=${params.month}`,
    )
    .then(({ data: { data } }) => {
      if (Object.keys(data).every((key) => data[key] !== null)) {
        dispatch(clearErrors('fetchDentistryData'));
        return data;
      }
      return null;
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(
          throwErrors('fetchDentistryData', {
            'Fetch data': ['not found'],
          }),
        );
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
