import api from '@/api';

export const getReportByUserId = async ({ id } = {}) => {
  const res = await api.get(
    `/api/v1/patient_chart_audits/report?user_id=${id}`,
  );
  if (!res) {
    return {
      error: 'Error',
    };
  }
  return res.data.result;
};
