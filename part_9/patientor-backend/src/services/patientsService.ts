import patients from '../../data/patients';

import { NoSsnPatient } from '../types';

const getAllNoSsnPatient = (): NoSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getAllNoSsnPatient,
};
