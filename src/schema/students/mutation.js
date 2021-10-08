const Student = require('../../models/students.model');
const {
  addStudentToProject,
  disableStudentFromProject,
  findStudentInAProject,
  updateStudentStatusInAProject,
} = require('../projects/data');
const {
  getStudentByEmail, getStudentById, parseStudent, parseResponse,
} = require('./data');

const studentMutations = {
  async createStudent(_, { input }) {
    const studentByEmail = await getStudentByEmail(input.email);
    const studentById = await getStudentById(input.id);

    if (studentByEmail === null) {
      if (studentById === null) {
        addStudentToProject(input.id, input.idProyecto);
        const studentToCreate = new Student(input);
        const studentCreated = await studentToCreate.save();

        return { ...parseStudent(studentCreated), message: 'Student created', wasSuccessful: true };
      }
      return { message: 'The student ID already exists', wasSuccessful: false };
    }

    return { message: 'The student already exists', wasSuccessful: false };
  },
  async updateStudent(_, { id, input }) {
    const studentById = await getStudentById(id);
    let response = null;

    if (studentById !== null) {
      if (input.idProyecto && input.idProyecto !== studentById.idProyecto) {
        response = await disableStudentFromProject(id, studentById.idProyecto);

        const studentRegisteredInAProject = await findStudentInAProject(input.idProyecto, id);
        response = studentRegisteredInAProject !== null
          ? await updateStudentStatusInAProject(input.idProyecto, id, false)
          : await addStudentToProject(id, input.idProyecto);
      }

      const updatedStudent = await Student.findOneAndUpdate({ id }, input, { new: true });

      return {
        ...parseStudent(updatedStudent), message: 'Student updated', wasSuccessful: true, ...parseResponse(response),
      };
    }

    return { message: 'Student Id does not exist', wasSuccessful: false };
  },
  async updatePassword(_, { id, password }) {
    return Student.findOneAndUpdate({ id }, { contrasena: password }, { new: true });
  },
};

module.exports = studentMutations;
