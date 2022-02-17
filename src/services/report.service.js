import api from '@/api';

export const getReporting = async (args = {}) => {
  const { month, year, type, studentId } = args;
  const res = await api.get(
    `/api/v1/users/${studentId}/reporting?year=${year}&month=${month}&type=${type}`,
  );
  if (!res) {
    return {
      error: 'Error',
    };
  }
  return res.data.data;
};
export const getStudentAdmin = async () => {
  const res = await api.get('api/v1/student_admins');
  if (!res) {
    return {
      error: 'Error',
    };
  }
  return res.data.result.data;
};
