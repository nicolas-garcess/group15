const Joi = require('joi');

// Project validations

const schemaCreateProject = Joi.object({
  idProyecto: Joi.string().min(3).max(15).required(),
  nombre: Joi.string().min(3).required(),
  descripcion: Joi.string().min(1).required(),
  objetivos: Joi.object().required(),
  presupuesto: Joi.number().required(),
  fechaInicial: Joi.date().required(),
  fechaFinal: Joi.date().required(),
  directorProyecto: Joi.string().min(3).required(),
  estaDisponible: Joi.boolean().required(),
  estudiantes: Joi.array().required(),
  investigadores: Joi.array().required(),
  notas: Joi.array().required(),
});

const schemaProjectId = Joi.object({
  idProyecto: Joi.string().min(3).max(15).required(),
});

const schemaUpdateProject = Joi.object({
  idProyecto: Joi.string().min(3).max(15).required(),
  nombre: Joi.string().min(3).required(),
  descripcion: Joi.string().min(1),
  objetivos: Joi.object(),
  presupuesto: Joi.number(),
  fechaInicial: Joi.date(),
  fechaFinal: Joi.date(),
  directorProyecto: Joi.string().min(3),
  estaDisponible: Joi.boolean(),
  notas: Joi.array(),
});

const schemaUpdateResearcherInAProject = Joi.object({
  idProyecto: Joi.string().min(3).max(15).required(),
  idInvestigador: Joi.string().min(3).max(15),
  activoEnElProyecto: Joi.boolean(),
});

const schemaUpdateStudentInAProject = Joi.object({
  idProyecto: Joi.string().min(3).max(15).required(),
  idEstudiante: Joi.string().min(3).max(15).required(),
  activoEnElProyecto: Joi.boolean().required(),
});

// Researcher validations

const schemaCreateResearcher = Joi.object({
  id: Joi.string().min(3).max(15).required(),
  nombre: Joi.string().min(3).max(40).required(),
  idProyecto: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(6).max(30).required()
    .email(),
  usuario: Joi.string().min(6).max(30).required(),
  contrasena: Joi.string().min(6).max(100).required(),
  horasDedicacion: Joi.number().min(8).max(40).required(),
  activo: Joi.boolean().required(),
});

const schemaUpdateResearcher = Joi.object({
  id: Joi.string().min(3).max(15).required(),
  nombre: Joi.string().min(3).max(40),
  idProyecto: Joi.string().min(3).max(20),
  email: Joi.string().min(6).max(30)
    .email(),
  horasDedicacion: Joi.number().min(8).max(40),
  activo: Joi.boolean(),
});

// Student validations

const schemaCreateStudent = Joi.object({
  id: Joi.string().min(3).max(15).required(),
  nombre: Joi.string().min(3).max(40).required(),
  carrera: Joi.string().min(3).max(30).required(),
  celular: Joi.string().min(10).max(10).required(),
  idProyecto: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(6).max(30).required()
    .email(),
  usuario: Joi.string().min(6).max(30).required(),
  contrasena: Joi.string().min(6).max(100).required(),
  fechaIngreso: Joi.date().required(),
  activo: Joi.boolean().required(),
});

const schemaUpdateStudent = Joi.object({
  id: Joi.string().min(3).max(15).required(),
  nombre: Joi.string().min(3).max(40),
  carrera: Joi.string().min(3).max(30),
  celular: Joi.string().min(10).max(10),
  idProyecto: Joi.string().min(3).max(20),
  email: Joi.string().min(6).max(30)
    .email(),
  fechaIngreso: Joi.date(),
  activo: Joi.boolean(),
});

const schemaUserId = Joi.object({
  id: Joi.string().min(3).max(15).required(),
});

module.exports = {
  schemaCreateProject,
  schemaProjectId,
  schemaUpdateProject,
  schemaCreateResearcher,
  schemaUpdateResearcher,
  schemaUpdateResearcherInAProject,
  schemaCreateStudent,
  schemaUpdateStudent,
  schemaUpdateStudentInAProject,
  schemaUserId,
};
