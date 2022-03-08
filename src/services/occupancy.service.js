import api from '@/api';

export const postOccupancy = async (args = {}) => {
  const { id, payload } = args;
  const res = await api.post(
    `/api/v1/users/${id}/occupancy_conversions`,
    payload,
  );
  if (!res) {
    return {
      error: 'Error',
    };
  }
  return res.data;
};

export const updateOccupancy = async (args = {}) => {
  const { id, payload } = args;
  const res = await api.put(
    `/api/v1/users/${id}/occupancy_conversions`,
    payload,
  );
  if (!res) {
    return {
      error: 'Error',
    };
  }
  return res.data;
};

export const getOccupancy = async (id) => {
  const res = await api.get(`/api/v1/users/${id}/occupancy_conversions`);
  if (!res) {
    return {
      error: 'Error',
    };
  }
  return res.data.result;
};
