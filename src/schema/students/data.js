const Student = require('../../models/students.model');

const getStudentByEmail = async (email) => Student.findOne({ email });
const getStudentById = async (id) => Student.findOne({ id });
const updateStudentById = async (id, projectId) => (
  Student.findOneAndUpdate({ id }, { idProyecto: projectId }, { new: true })
);

const parseStudent = (student) => ({
  id: student.id,
  nombre: student.nombre,
  carrera: student.carrera,
  celular: student.celular,
  idProyecto: student.idProyecto,
  email: student.email,
  usuario: student.usuario,
  activo: student.activo,
});

const parseResponse = (response) => {
  if (response !== null) {
    return {
      message: response.message,
      wasSuccessful: response.wasSuccessful,
    };
  }
  return {};
};

module.exports = {
  getStudentByEmail,
  getStudentById,
  parseStudent,
  parseResponse,
  updateStudentById,
};
