const student = require('../../models/students.model');

const studentQueries = {
  greet(_, { name }) {
    return `Hello ${name}`;
  },
  async getStudents() {
    return student.find();
  },
  async getStudentById(_, { id }) {
    return student.findOne({ id });
  },
  async getStudentByEmail(_, { email }) {
    return student.findOne({ email });
  },
};

module.exports = studentQueries;
