import patients from '../../data/patients';
import { Patient, NoSsnPatient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getAllNoSsnPatient = (): NoSsnPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      name,
      occupation,
      dateOfBirth,
      gender,
      entries,
      id,
    }),
  );
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
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
  getPatientById,
};
