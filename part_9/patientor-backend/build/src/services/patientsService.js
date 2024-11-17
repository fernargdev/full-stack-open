"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
// Patient
const getAllPatient = () => {
    return patients_1.default;
};
const getNoSsnPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        occupation,
        dateOfBirth,
        gender,
        entries,
    }));
};
const getPatientById = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    return patient;
};
const addPatient = (data) => {
    const newPatient = Object.assign(Object.assign({ id: (0, uuid_1.v1)() }, data), { entries: [] });
    patients_1.default.push(newPatient);
    return newPatient;
};
// Entry
const addEntry = (patient, entry) => {
    const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)() });
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getAllPatient,
    getNoSsnPatients,
    addPatient,
    getPatientById,
    addEntry,
};
