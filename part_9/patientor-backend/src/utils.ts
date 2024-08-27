import { NewPatientEntry, Gender, Entry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error('Incorrect or missing string: ' + str);
  }

  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const isEntries = (param: unknown): param is Entry[] => {
  return Array.isArray(param);
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries) || !isEntries(entries)) {
    throw new Error('Incorrect or missing entries: ' + entries);
  }

  return entries;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'ssn' in object &&
    'occupation' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      ssn: parseString(object.ssn),
      occupation: parseString(object.occupation),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
