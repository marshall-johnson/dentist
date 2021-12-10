import api from '@/api';
import snakecaseKeys from 'snakecase-keys';
import { throwErrors, clearErrors } from '@/actions/errorActions';
import { setFlashError, setFlashSuccess } from '@/actions/flashMessageActions';
import AppConfig from '@/constants/AppConfig';
import {
  studentsFetched,
  studentFetched,
  setLoading,
  deletedStudent,
} from '@/store/student';
import { notification } from 'antd';

export const createStudent = ({ params, history }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .post('/api/v1/students', snakecaseKeys(params))
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
        dispatch(throwErrors('userItem', { 'Submitted data': ['is invalid'] }));
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const updateStudent = (id, { params }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .put(`/api/v1/students/${id}`, snakecaseKeys(params))
    .then(({ data: { success, message } }) => {
      if (success) {
        dispatch(clearErrors('updateUserItem'));
        dispatch(setFlashSuccess({ message }));

        return true;
      }
      dispatch(setFlashError({ message }));
      return false;
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(
          throwErrors('updateUserItem', { 'Submitted data': ['is invalid'] }),
        );
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const deleteStudent = (id) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .delete(`/api/v1/students/${id}`)
    .then(({ data: { success, message } }) => {
      if (success) {
        dispatch(deletedStudent({ id }));
        dispatch(clearErrors('deleteUserItem'));
        dispatch(setFlashSuccess({ message }));
      } else {
        dispatch(setFlashError({ message }));
      }
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(
          throwErrors('deleteUserItem', {
            [`Delete student with id ${id}`]: ['is not success'],
          }),
        );
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const fetchStudent = (id) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get(`/api/v1/students/${id}`)
    .then(({ data: { record } }) => {
      dispatch(
        studentFetched({
          record,
        }),
      );
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        notification.error({
          message: error.response?.data?.message,
        });
      }
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const fetchStudents = (params = {}) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get(
      `/api/v1/students?size=${params?.size || 100}&number=${
        params?.number || 1
      }`,
    )
    .then(({ data: { records, meta } }) => {
      dispatch(
        studentsFetched({
          records,
          meta,
        }),
      );
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        notification.error({
          message: error.response?.data?.message,
        });
      }
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
