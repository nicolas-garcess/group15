const Student = require('../../models/students.model');

const studentMutations = {
  async createStudent(_, { input }) {
    const studentToCreate = new Student(input);
    return studentToCreate.save();
  },
  async updateStudentById(_, { id, input }) {
    return Student.findOneAndUpdate(id, input, { new: true });
  },
  async updatePassword(_, { id, password }) {
    return Student.findOneAndUpdate(id, { contrasena: password }, { new: true });
  },
};

module.exports = studentMutations;
