import { z } from 'zod';
import { Gender } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  occupation: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  entries: z.array(z.any()),
});
