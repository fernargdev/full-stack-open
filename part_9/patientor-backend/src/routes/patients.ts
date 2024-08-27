import express from 'express';

import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

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

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addNewPatient(newPatientEntry);

    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';

    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }

    res.status(400).json(errorMessage);
  }
});

export default router;
