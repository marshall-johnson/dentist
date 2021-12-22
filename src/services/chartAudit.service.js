import api from '@/api';

export const fetchDoctorPI = async (args = {}) => {
  const { studentId = 3 } = args;
  const res = await api.post(
    `/api/v1/patient_chart_audits?user_id=${studentId}`,
  );
  return res;
};
