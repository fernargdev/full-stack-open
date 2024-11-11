import express, { Request, Response } from 'express';

import {
  // NewPatient,
  Patient,
  EntryWithoutId,
  NoSsnPatient,
  PatientFormValues,
  Entry,
} from '../types';
import patientsService from '../services/patientsService';
import {
  errorMiddleware,
  newEntryParser,
  newPatientParser,
} from '../utils/middlewares';

const router = express.Router();

// Patient
router.get('/', (_req, res: Response<NoSsnPatient[]>) => {
  res.json(patientsService.getNoSsnPatients());
});

router.get(
  '/:id',
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<Patient | string>,
  ) => {
    const patient = patientsService.getPatientById(req.params.id);

    if (patient) {
      res.json(patient);
    } else {
      res.sendStatus(404).send('No found patient');
    }
  },
);

router.post(
  '/',
  newPatientParser,
  (
    req: Request<unknown, unknown, PatientFormValues>,
    res: Response<Patient>,
  ) => {
    const newPatient = patientsService.addPatient(req.body);
    res.status(201).json(newPatient);
  },
);

// Entry
router.post(
  '/:id/entries',
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<Entry | string>,
  ) => {
    const patient = patientsService.getPatientById(req.params.id);

    if (patient) {
      const newEntry = patientsService.addEntry(patient, req.body);

      res.status(201).json(newEntry);
    } else {
      res.sendStatus(404).send('No found patient');
    }
  },
);

router.use(errorMiddleware);

export default router;
