const { expect } = require('chai');
const Student = require('../src/models/students.model');
const Researcher = require('../src/models/researchers.model');
const Project = require('../src/models/projects.model');

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

const project = new Project({
  idProyecto: 'proyecto001',
  objetivos: {
    objetivoGeneral: {
      idObjetivo: 'objG001',
      descripcion: 'lorem ipsum',
      cumplido: false,
    },
    objetivosEspecificos: [
      {
        idObjetivo: 'objE001',
        descripcion: 'lorem ipsum',
        cumplido: true,
      },
      {
        idObjetivo: 'objE002',
        descripcion: 'lorem ipsum',
        cumplido: false,
      },
    ],
  },
  presupuesto: 2000000000,
  fechaInicial: new Date(),
  fechaFinal: 'alguna fecha',
  directorProyecto: 'Claudia Cárdenas',
  estaDisponible: true,
  avance: 1000,
  fase: 'desarrollo',
  estudiantes: [
    {
      idEstudiante: 'estudiante001',
      activo: true,
    },
    {
      idEstudiante: 'estudiante002',
      activo: true,
    },
  ],
  investigadores: [
    {
      idInvestigador: 'investigador001',
      activo: true,
    },
  ],
  notas: [
    {
      idNota: 'nota001',
      descripcion: 'lorem ipsum',
    },
    {
      idNota: 'nota002',
      descripcion: 'lorem ipsum',
    },
    {
      idNota: 'nota003',
      descripcion: 'lorem ipsum',
    },
  ],
});

describe('Projects schema validation', () => {
  it('Should be valid if field objetivos exists', (done) => {
    project.validate((err) => {
      expect(err?.errors.objetivos).to.undefined;
      done();
    });
  });
  it('fechaFinal should be invalid because is not a date variable', (done) => {
    project.validate((err) => {
      expect(err.errors.fechaFinal).to.exist;
      done();
    });
  });
  it('avance should be invalid because is greaten than 100', (done) => {
    project.validate((err) => {
      expect(err.errors.avance).to.exist;
      done();
    });
  });
  it('fase should be valid because is a string', (done) => {
    project.validate((err) => {
      expect(err?.errors.fase).to.undefined;
      done();
    });
  });
  it('estaDisponible should be valid because is a string', (done) => {
    project.validate((err) => {
      expect(err?.errors.estaDisponible).to.undefined;
      done();
    });
  });
});
