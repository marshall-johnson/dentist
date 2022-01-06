import api from '@/api';

export const getReporting = async (args = {}) => {
  const { month, year, studentId } = args;
  const res = await api.get(
    `/api/v1/users/${studentId}/reporting?year=${year}&month=${month}`,
  );
  if (!res) {
    return {
      errur: 'Error',
    };
  }
  return res.data.data;
};
