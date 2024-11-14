import { z } from 'zod';
import { Gender, HealthCheckRating } from '../types';

export const NewPatientSchema = z
  .object({
    name: z.string().min(3),
    dateOfBirth: z.string().date(),
    ssn: z.string().min(5).optional(),
    occupation: z.string().min(3),
    gender: z.nativeEnum(Gender),
    entries: z.array(z.unknown()).optional(),
  })
  .strict();

export const BaseEntrySchema = z.object({
  description: z.string().min(2),
  date: z.string().date(),
  specialist: z.string().min(3),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
}).strict();

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string().min(3),
  }),
}).strict();

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
}).strict();

export const EntrySchema = z.union([
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);
