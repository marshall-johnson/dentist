import api from '@/api';
import { throwErrors } from '@/actions/errorActions';
import { studentSurveysFetched, setLoading } from '@/store/studentSurvey';

export const submitStudentSurvey = (id, results) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .post(`/api/v1/students/${id}/surveys`, { data: { results } })
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

export const fetchStudentSurveys = (id, questionType) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get(`/api/v1/students/${id}/surveys?question_type=${questionType}`)
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
