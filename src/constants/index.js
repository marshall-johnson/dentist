export const API_HOST = process.env.REACT_APP_API_HOST;

export const STUDENT_DEGREES = [
  {
    value: 'dds',
    label: 'DDS',
  },
  {
    value: 'dmd',
    label: 'DMD',
  },
];

export const UserAccountType = {
  STUDENT_ADMIN: 'student_admin',
  STUDENT_STAFF: 'student_staff',
  STUDENT_DOCTOR: 'student_doctor',
  ADMIN: 'admin',
  COACH: 'coach',
};

export const TYPE_ENERGY_SURVEYS = [
  {
    value: UserAccountType.STUDENT_STAFF,
    label: 'Staff',
  },
  {
    value: UserAccountType.STUDENT_DOCTOR,
    label: 'Doctor',
  },
];
