import api from '@/api';

export const fetchChartAudit = async (args = {}) => {
  const { id } = args;
  const res = await api.get(`/api/v1/patient_chart_audits?user_id=${id}`);
  if (!res) {
    return {
      error: 'Error',
    };
  }
  return res.data.result.data;
};
export const postChartAudit = async (args = {}) => {
  const { payload } = args;
  const res = await api.post('/api/v1/patient_chart_audits', {
    patient_chart_audit: payload,
  });
  if (!res) {
    return {
      error: 'Error',
    };
  }
  return res.data;
};

export const deleteChartAudit = async (args = {}) => {
  const { id } = args;
  const res = await api.delete(`/api/v1/patient_chart_audits/${id}`);
  if (!res) {
    return {
      error: 'Error',
    };
  }
  return res.data;
};
