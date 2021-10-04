const Student = require('../../models/students.model');

const studentQueries = {
  greet(_, { name }) {
    return `Hello ${name}`;
  },
  async getStudents() {
    return Student.find();
  },
  async getStudentById(_, { id }) {
    return Student.findOne({ id });
  },
  async getStudentByEmail(_, { email }) {
    return Student.findOne({ email });
  },
};

module.exports = studentQueries;
