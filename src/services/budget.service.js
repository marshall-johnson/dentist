import api from '@/api';

export const postBudget = async (args = {}) => {
  const { id, payload } = args;
  const res = await api.post(`/api/v1/users/${id}/budgets`, {
    data: payload,
  });
  if (!res) {
    return {
      errur: 'Error',
    };
  }
  return res.data;
};
