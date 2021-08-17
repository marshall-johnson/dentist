import api from '@/api';
import {
  setLoading,
  hygienistsFetched,
} from '@/store/hygienist';

const camelcaseKeys = require('camelcase-keys');

export const fetchHygienists = ({ page }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get('/api/v1/hygienists', { params: { page } })
    .then(
      ({ data: response }) => {
        const {
          result: { data: items },
          pagy: {
            currentPage,
            totalItems,
            // totalPages,
          }
        } = camelcaseKeys(response, { deep: true });

        dispatch(
          hygienistsFetched({
            items,
            page: currentPage,
            totalCount: totalItems,
          }),
        );
      },
    )
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
