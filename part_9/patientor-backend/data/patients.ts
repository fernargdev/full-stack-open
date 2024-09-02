import { Patient } from '../src/types';
import { NewPatientSchema } from '../src/utils';

const data = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '090786-122X',
    gender: 'male',
    occupation: 'New york city cop',
    entries: [],
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    ssn: '300179-77A',
    gender: 'male',
    occupation: 'Cop',
    entries: [],
  },
  {
    id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
    name: 'Hans Gruber',
    dateOfBirth: '1970-04-25',
    ssn: '250470-555L',
    gender: 'other',
    occupation: 'Technician',
    entries: [],
  },
  {
    id: 'd2773822-f723-11e9-8f0b-362b9e155667',
    name: 'Dana Scully',
    dateOfBirth: '1974-01-05',
    ssn: '050174-432N',
    gender: 'female',
    occupation: 'Forensic Pathologist',
    entries: [],
  },
  {
    id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-04-09',
    ssn: '090471-8890',
    gender: 'male',
    occupation: 'Digital evangelist',
    entries: [],
  },
  {
    id: 'TEST35f8-01f3-4b3a-92b2-731bbc3c15e2',
    name: 'John McClane1',
    ssn: '090786-122X',
    occupation: 'New york city cop',
    dateOfBirth: '1986-07-09',
    gender: 'male',
    entries: [
      {
        id: 'd8e235f8-01f3-4b3a-92b2-731bbc3c15e2',
        date: '2019-08-05',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description: 'Padiatria Padiatria Padiatria Padiatria',
        discharge: {
          date: '2019-08-16',
          criteria: 'Padiatria',
        },
      },
    ],
  },
  {
    id: 'TESTe46d-70b3-4d90-b090-4535c7cf8fb1',
    name: 'John McClane2',
    ssn: '090786-122X',
    occupation: 'New york city cop',
    dateOfBirth: '1986-07-09',
    gender: 'male',
    entries: [
      {
        id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description:
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      },
    ],
  },
  {
    id: 'TEST9fa6-c4b4-4fec-ac4d-df4fe1f85f62',
    name: 'John McClane3',
    ssn: '090786-122X',
    occupation: 'New york city cop',
    dateOfBirth: '1986-07-09',
    gender: 'male',
    entries: [
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-08-05',
        type: 'OccupationalHealthcare',
        specialist: 'MD House',
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description:
          'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning.',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        },
      },
    ],
  },
];

const patientEntries: Patient[] = data.map((obj) => {
  const object = NewPatientSchema.parse(obj) as Patient;
  object.id = obj.id;
  return object;
});

export default patientEntries;
