import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import {
  NewPatientSchema,
  BaseEntrySchema,
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  EntrySchema,
} from './schemas';

import { Entry } from '../types';

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);

    next();
  } catch (error) {
    next(error);
  }
};

export const newEntryParser = (
  req: Request<unknown, unknown, Entry>,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    BaseEntrySchema.parse(req.body);
    console.log(req.body);

    switch (req.body.type) {
      case 'HealthCheck':
        HealthCheckEntrySchema.parse(req.body);
        break;

      case 'Hospital':
        HospitalEntrySchema.parse(req.body);
        break;

      case 'OccupationalHealthcare':
        OccupationalHealthcareEntrySchema.parse(req.body);
        break;

      default:
        EntrySchema.parse(req.body);
        break;
    }

    next();
  } catch (error) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof ZodError) {
    const errorMessage: string = `${error.issues[0].path[0]}: ${error.issues[0].message}`;

    console.log('Error: ', error.issues);

    res.status(400).send(errorMessage);
  } else {
    console.error('Unknown error: ', error);

    next(error);
  }
};

export { errorMiddleware };
