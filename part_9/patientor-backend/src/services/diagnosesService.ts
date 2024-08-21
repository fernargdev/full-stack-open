import diagnoses from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getAllDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getAllDiagnoses,
};
