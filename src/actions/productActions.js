import api from '@/api';
import {
  setLoading,
  productsFetched,
} from '@/store/product';

const camelcaseKeys = require('camelcase-keys');

export const fetchProducts = ({ page }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get('/api/v1/items', { params: { page } })
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
          productsFetched({
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

export const fetchProductsBaseIds = ({ page }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get('/api/v1/items/filter_by_ids', { params: { page } })
    .then(
      ({ data: response }) => {
        const {
          result: { data: items },
        } = camelcaseKeys(response, { deep: true });

        dispatch(
          productsFetched({
            items,
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
