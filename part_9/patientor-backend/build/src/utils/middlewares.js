"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.newEntryParser = exports.newPatientParser = void 0;
const zod_1 = require("zod");
const schemas_1 = require("./schemas");
const newPatientParser = (req, _res, next) => {
    try {
        schemas_1.NewPatientSchema.parse(req.body);
        console.log(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.newPatientParser = newPatientParser;
const newEntryParser = (req, _res, next) => {
    try {
        schemas_1.BaseEntrySchema.parse(req.body);
        console.log(req.body);
        switch (req.body.type) {
            case 'HealthCheck':
                schemas_1.HealthCheckEntrySchema.parse(req.body);
                break;
            case 'Hospital':
                schemas_1.HospitalEntrySchema.parse(req.body);
                break;
            case 'OccupationalHealthcare':
                schemas_1.OccupationalHealthcareEntrySchema.parse(req.body);
                break;
            default:
                schemas_1.EntrySchema.parse(req.body);
                break;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.newEntryParser = newEntryParser;
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        const errorMessage = `${error.issues[0].path[0]}: ${error.issues[0].message}`;
        console.log('Error: ', error.issues);
        res.status(400).send(errorMessage);
    }
    else {
        console.error('Unknown error: ', error);
        next(error);
    }
};
exports.errorMiddleware = errorMiddleware;
