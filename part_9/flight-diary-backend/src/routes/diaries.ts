import express from 'express';

import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diaryService.getNonSensitiveEntries());
});

router.get('/all', (_req, res) => {
  res.json(diaryService.getEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.status(200).json(diary);
  } else {
    res.status(404).end();
  }
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diaryService.addDiary(newDiaryEntry);

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
