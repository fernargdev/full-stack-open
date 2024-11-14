"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntrySchema = exports.OccupationalHealthcareEntrySchema = exports.HospitalEntrySchema = exports.HealthCheckEntrySchema = exports.BaseEntrySchema = exports.NewPatientSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../types");
exports.NewPatientSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(3),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string().min(5).optional(),
    occupation: zod_1.z.string().min(3),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    entries: zod_1.z.array(zod_1.z.unknown()).optional(),
})
    .strict();
exports.BaseEntrySchema = zod_1.z.object({
    description: zod_1.z.string().min(2),
    date: zod_1.z.string().date(),
    specialist: zod_1.z.string().min(3),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.HealthCheckEntrySchema = exports.BaseEntrySchema.extend({
    type: zod_1.z.literal('HealthCheck'),
    healthCheckRating: zod_1.z.nativeEnum(types_1.HealthCheckRating),
}).strict();
exports.HospitalEntrySchema = exports.BaseEntrySchema.extend({
    type: zod_1.z.literal('Hospital'),
    discharge: zod_1.z.object({
        date: zod_1.z.string().date(),
        criteria: zod_1.z.string().min(3),
    }),
}).strict();
exports.OccupationalHealthcareEntrySchema = exports.BaseEntrySchema.extend({
    type: zod_1.z.literal('OccupationalHealthcare'),
    employerName: zod_1.z.string(),
    sickLeave: zod_1.z
        .object({
        startDate: zod_1.z.string().date(),
        endDate: zod_1.z.string().date(),
    })
        .optional(),
}).strict();
exports.EntrySchema = zod_1.z.union([
    exports.HealthCheckEntrySchema,
    exports.HospitalEntrySchema,
    exports.OccupationalHealthcareEntrySchema,
]);
