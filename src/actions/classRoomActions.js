import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import api from '@/api';
import {
  setLoading,
  classRoomDetail,
  classRoomsFetched,
} from '@/store/classRoom';
import {
  throwErrors,
  clearErrors
} from '@/actions/errorActions';
import {
  setFlashError,
  setFlashSuccess,
} from '@/actions/flashMessageActions';

export const fetchClassRooms = ({ page }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get('/api/v1/class_rooms', { params: { page } })
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
          classRoomsFetched({
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

export const getClassDetail = ({ classId }) => async (dispatch) => {
  dispatch(setLoading(true));

  return api
    .get(`/api/v1/class_rooms/${classId}`)
    .then(({ data: response }) => {
      const {
        result: { data: item },
      } = camelcaseKeys(response, { deep: true });

      dispatch(classRoomDetail({ item }));
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const createRegisterClass = ({ classRoomId, date, history }) => async (dispatch) => {
  dispatch(setLoading(true));

  const params = {
    classRoomRegistration: {
      date,
      classRoomId,
    }
  };

  return api
    .post('/api/v1/register_class', snakecaseKeys(params))
    .then(({ data: { success, message } }) => {
      if (success) {
        dispatch(clearErrors('registerClass'));
        dispatch(setFlashSuccess({ message }));
        history.go(0);
      } else {
        dispatch(setFlashError({ message }));
      }
    })
    .catch((error) => {
      dispatch(setLoading(false));
      if (error.response) {
        dispatch(throwErrors('registerClass', { 'Submitted data': ['is invalid'] }));
      }
      throw error;
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
