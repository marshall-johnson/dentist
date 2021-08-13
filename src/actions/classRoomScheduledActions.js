import api from '@/api';
import {
  setLoading,
  classRoomsScheduledFetched,
} from '@/store/classRoomScheduled';

const camelcaseKeys = require('camelcase-keys');

export const fetchClassRoomsScheduled = ({ page }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get('/api/v1/classes/scheduled', { params: { page } })
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
          classRoomsScheduledFetched({
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
