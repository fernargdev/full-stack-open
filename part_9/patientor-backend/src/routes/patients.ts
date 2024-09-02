import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { NewPatientEntry, Patient } from '../types';
import patientsService from '../services/patientsService';
import { NewPatientSchema } from '../utils';

const router = express.Router();

// middlewares
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);

    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res) => {
  res.json(patientsService.getAllNoSsnPatient());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404).json({ message: 'No found patient' });
  }
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientsService.addNewPatient(req.body);

    res.status(201).json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
