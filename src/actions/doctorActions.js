import api from '@/api';
import { setLoading, doctorsFetched } from '@/store/doctor';

const camelcaseKeys = require('camelcase-keys');

export const fetchDoctors =
  ({ page = undefined } = {}) =>
  async (dispatch) => {
    dispatch(setLoading(true));

    return api
      .get('/api/v1/doctors', { params: { page } })
      .then(({ data: response }) => {
        const {
          result: { data: items },
          pagy: {
            currentPage,
            totalItems,
            // totalPages,
          },
        } = camelcaseKeys(response, { deep: true });

        dispatch(
          doctorsFetched({
            items,
            page: currentPage,
            totalCount: totalItems,
          }),
        );
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
