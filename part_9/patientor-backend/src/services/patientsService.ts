import patients from '../../data/patients';
import { NoSsnPatient, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getAllNoSsnPatient = (): NoSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNewPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getAllNoSsnPatient,
  addNewPatient,
};
