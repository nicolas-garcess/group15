const Student = require('../../models/students.model');

const studentQueries = {
  async students() {
    return Student.find();
  },
  async student(_, { id }) {
    return Student.findOne({ id });
  },
};

module.exports = studentQueries;
