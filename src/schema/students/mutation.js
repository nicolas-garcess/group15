const Student = require('../../models/students.model');

const studentMutations = {
  async createStudent(_, { input }) {
    const studentToCreate = new Student(input);
    return studentToCreate.save();
  },
};

module.exports = studentMutations;
