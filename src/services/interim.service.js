import api from '@/api';

export const postInterimBudget = async (args = {}) => {
  const { id, payload } = args;
  console.log(args);
  const res = await api.post(`/api/v1/users/${id}/interim_budgets`, {
    data: payload,
  });
  if (!res) {
    return {
      errur: 'Error',
    };
  }
  return res.data;
};
