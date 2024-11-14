"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const middlewares_1 = require("../utils/middlewares");
const router = express_1.default.Router();
// Patient
router.get('/', (_req, res) => {
    res.json(patientsService_1.default.getAllPatient());
});
router.get('/no-ssn', (_req, res) => {
    res.json(patientsService_1.default.getNoSsnPatients());
});
router.get('/:id', (req, res) => {
    const patient = patientsService_1.default.getPatientById(req.params.id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.sendStatus(404).send('No found patient');
    }
});
router.post('/', middlewares_1.newPatientParser, (req, res) => {
    const newPatient = patientsService_1.default.addPatient(req.body);
    res.status(201).json(newPatient);
});
router.post('/:id/entries', middlewares_1.newEntryParser, (req, res) => {
    const patient = patientsService_1.default.getPatientById(req.params.id);
    if (patient) {
        const newEntry = patientsService_1.default.addEntry(patient, req.body);
        res.status(201).json(newEntry);
    }
    else {
        res.sendStatus(404).send('No found patient');
    }
});
router.use(middlewares_1.errorMiddleware);
exports.default = router;
