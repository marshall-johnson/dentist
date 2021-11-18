import api from '@/api';
import { setLoading } from '@/store/profitPotential';
import { throwErrors, clearErrors } from '@/actions/errorActions';
import { setFlashError, setFlashSuccess } from '@/actions/flashMessageActions';

export const createProfitPotential = (formData) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .post('/api/v1/profit_potentials', formData)
    .then(({ data: { success, message } }) => {
      if (success) {
        dispatch(clearErrors('profitPotential'));
        dispatch(setFlashSuccess({ message }));
      } else {
        dispatch(setFlashError({ message }));
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
