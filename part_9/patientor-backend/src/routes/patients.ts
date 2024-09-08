import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { NewPatientEntry, Patient, EntryWithoutId } from '../types';
import patientsService from '../services/patientsService';
import { NewPatientSchema, EntrySchema } from '../utils';

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

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    EntrySchema.parse(req.body);
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

router.post(
  '/:id/entries',
  newEntryParser,
  (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response) => {
    const { id } = req.params;
    const newEntry = req.body;

    const addedEntry = patientsService.addEntryToPatient(id, newEntry);

    if (addedEntry) {
      res.status(201).json(addedEntry);
    } else {
      res.sendStatus(404).json({ message: 'Patient not found' });
    }
  },
);

router.use(errorMiddleware);

export default router;
