const assert = require('assert');
const expect = require('chai').expect;
const student = require('../models/students.model');


describe('Students schema validation', function () {
    it('Should be valid if field usuario exists', function (done) {
        const student1 = new student({
            id: 'estudiante001',
            nombre: 'Juan González',
            carrera: 'Ingeniería de Sistemas',
            celular: '3156758495',
            idProyecto: 'proyecto001',
            activo: true,
            email: 'juan.gonzalez@gmail.com',
            usuario: 'juan.gonzalez',
            contrasena: '123456789'
        });
        student1.validate(function (err) {
            expect(err?.errors.usuario).to.undefined;
            done();
        });
    });
    it('Cellphone number should be invalid', function (done) {
        const student1 = new student({
            id: 'estudiante001',
            nombre: 'Juan González',
            carrera: 'Ingeniería de Sistemas',
            celular: '31567584958998',
            idProyecto: 'proyecto001',
            activo: true,
            email: 'juan.gonzalez@gmail.com',
            usuario: 'juan.gonzalez',
            contrasena: '123456789'
        });
        student1.validate(function (err) {
            expect(err.errors.celular).to.exist;
            done();
        });
    });
    it('Status field should be invalid', function (done) {
        const student1 = new student({
            id: 'estudiante001',
            nombre: 'Juan González',
            carrera: 'Ingeniería de Sistemas',
            celular: '31567584958998',
            idProyecto: 'proyecto001',
            activo: 'gafgd',
            email: 'juan.gonzalez@gmail.com',
            usuario: 'juan.gonzalez',
            contrasena: '123456789'
        });
        student1.validate(function (err) {
            expect(err.errors.activo).to.exist;
            done();
        });
    });
});