import patients from '../../data/patients';
import {
  Patient,
  NoSsnPatient,
  EntryWithoutId,
  Entry,
  PatientFormValues,
} from '../types';
import { v1 as uuid } from 'uuid';

// Patient
const getAllPatient = (): Patient[] => {
  return patients;
};

const getNoSsnPatients = (): NoSsnPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      occupation,
      dateOfBirth,
      gender,
      entries,
    }),
  );
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (entry: PatientFormValues): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatient);

  return newPatient;
};

// Entry
const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getAllPatient,
  getNoSsnPatients,
  addPatient,
  getPatientById,
  addEntry,
};
