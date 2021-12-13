import api from '@/api';
import { setLoading } from '@/store/profitPotential';
import { throwErrors } from '@/actions/errorActions';

export const createProfitPotential = (formData, callback) => async (
  dispatch,
) => {
  dispatch(setLoading(true));

  return api
    .post('/api/v1/profit_potentials', formData)
    .then(({ data: { success, message } }) => {
      if (success) {
        callback && callback(true, message);
      } else {
        callback && callback(false, message);
      }
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(
          throwErrors('profitPotential', { 'Submitted data': ['is invalid'] }),
        );
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
