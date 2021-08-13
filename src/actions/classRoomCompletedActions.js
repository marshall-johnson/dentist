import api from '@/api';
import {
  setLoading,
  classRoomsCompletedFetched,
} from '@/store/classRoomCompleted';

const camelcaseKeys = require('camelcase-keys');

export const fetchClassRoomsCompleted = ({ page }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get('/api/v1/classes/completed', { params: { page } })
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
          classRoomsCompletedFetched({
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
