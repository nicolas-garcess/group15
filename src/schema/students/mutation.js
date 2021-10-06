const Student = require('../../models/students.model');
const { addStudentToProject } = require('../projects/data');
const { getStudentByEmail, getStudentById } = require('./data');

const studentMutations = {
  async createStudent(_, { input }) {
    const studentByEmail = await getStudentByEmail(input.email);
    const studentById = await getStudentById(input.id);

    if (studentByEmail === null) {
      if (studentById === null) {
        addStudentToProject(input.id, input.idProyecto);
        const studentToCreate = new Student(input);
        const response = await studentToCreate.save();
        return { ...response, message: 'Student created', wasSuccessful: true };
      }
      return { message: 'The student ID already exists', wasSuccessful: false };
    }

    return { message: 'The student already exists', wasSuccessful: false };
  },
  async updateStudent(_, { id, input }) {
    return Student.findOneAndUpdate({ id }, input, { new: true });
  },
  async updatePassword(_, { id, password }) {
    return Student.findOneAndUpdate({ id }, { contrasena: password }, { new: true });
  },
};

module.exports = studentMutations;
