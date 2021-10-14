import api from '@/api';
import snakecaseKeys from 'snakecase-keys';
import {
  setLoading,
  questionsFetched,
} from '@/store/questionsSurvey';

const camelcaseKeys = require('camelcase-keys');

export const fetchQuestions = ({ questionType }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get('/api/v1/questions_surveys', snakecaseKeys({ params: { questionType } }))
    .then(
      ({ data: response }) => {
        const {
          result,
          success,
          message,
        } = camelcaseKeys(response, { deep: true });

        if (success) {
          const { data: items } = result;

          dispatch(
            questionsFetched({
              items,
            }),
          );
        } else {
          throw message;
        }
      },
    )
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
