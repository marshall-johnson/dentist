import api from '@/api';

export const postOccupancy = async (args = {}) => {
  const { id, payload } = args;
  const res = await api.post(`/api/v1/users/${id}/occupancy_conversion`, {
    data: payload,
  });
  if (!res) {
    return {
      error: 'Error',
    };
  }
  return res.data;
};
