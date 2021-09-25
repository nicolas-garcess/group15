/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const Student = require('../models/students.model');
const Researcher = require('../models/researchers.model');

describe('Students schema validation', () => {
  it('Should be valid if field usuario exists', (done) => {
    const student1 = new Student({
      id: 'estudiante001',
      nombre: 'Juan González',
      carrera: 'Ingeniería de Sistemas',
      celular: '3156758495',
      idProyecto: 'proyecto001',
      activo: true,
      email: 'juan.gonzalez@gmail.com',
      usuario: 'juan.gonzalez',
      contrasena: '123456789',
    });
    student1.validate((err) => {
      expect(err?.errors.usuario).to.undefined;
      done();
    });
  });
  it('Cellphone number should be invalid', (done) => {
    const student1 = new Student({
      id: 'estudiante001',
      nombre: 'Juan González',
      carrera: 'Ingeniería de Sistemas',
      celular: '31567584958998',
      idProyecto: 'proyecto001',
      activo: true,
      email: 'juan.gonzalez@gmail.com',
      usuario: 'juan.gonzalez',
      contrasena: '123456789',
    });
    student1.validate((err) => {
      expect(err.errors.celular).to.exist;
      done();
    });
  });
  it('Status field should be invalid', (done) => {
    const student1 = new Student({
      id: 'estudiante001',
      nombre: 'Juan González',
      carrera: 'Ingeniería de Sistemas',
      celular: '31567584958998',
      idProyecto: 'proyecto001',
      activo: 'gafgd',
      email: 'juan.gonzalez@gmail.com',
      usuario: 'juan.gonzalez',
      contrasena: '123456789',
    });
    student1.validate((err) => {
      expect(err.errors.activo).to.exist;
      done();
    });
  });
});

describe('Researchers schema validation', () => {
  it('Should be valid if field usuario exists', (done) => {
    const researcher = new Researcher({
      id: 'investigador001',
      nombre: 'Marcela Amariles',
      idProyecto: 'proyecto001',
      email: 'marcela.amariles@gmail.com',
      usuario: 'marcela.amariles',
      contrasena: '123456789',
      horasDedicacion: 20,
      activo: true,
    });
    researcher.validate((err) => {
      expect(err?.errors.usuario).to.undefined;
      done();
    });
  });
  it('Business hours should be invalid', (done) => {
    const researcher2 = new Researcher({
      id: 'investigador001',
      nombre: 'Marcela Amariles',
      idProyecto: 'proyecto001',
      email: 'marcela.amariles@gmail.com',
      usuario: 'marcela.amariles',
      contrasena: '123456789',
      horasDedicacion: 5,
      activo: true,
    });
    researcher2.validate((err) => {
      expect(err.errors.horasDedicacion).to.exist;
      done();
    });
  });
});
