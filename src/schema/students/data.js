const Student = require('../../models/students.model');

const getStudentByEmail = async (email) => Student.findOne({ email });
const getStudentById = async (id) => Student.findOne({ id });

module.exports = {
  getStudentByEmail,
  getStudentById,
};
