import api from '@/api';
import { throwErrors } from '@/actions/errorActions';
import { studentSurveysFetched, setLoading } from '@/store/studentSurvey';

export const submitStudentSurvey = (id, results) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .post(`/api/v1/users/${id}/surveys`, { data: { results } })
    .then(({ data: { success } }) => {
      if (success) return true;
      return false;
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(throwErrors(error.response));
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const fetchStudentSurveys =
  (id, { questionType, userType } = {}) =>
  async (dispatch) => {
    dispatch(setLoading(true));

    return api
      .get(
        questionType
          ? `/api/v1/users/${id}/surveys?question_type=${questionType}&userType=${userType}`
          : `/api/v1/users/${id}/surveys`,
      )
      .then(({ data: { records } }) => {
        dispatch(
          studentSurveysFetched({
            records,
          }),
        );
      })
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.response) {
          dispatch(throwErrors(error.response));
        }
        throw error;
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
