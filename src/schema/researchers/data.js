const Researcher = require('../../models/researchers.model');

const getResearcherByEmail = async (email) => Researcher.findOne({ email });
const getResearcherById = async (id) => Researcher.findOne({ id });

const parseResearcher = (researcher) => ({
  id: researcher.id,
  nombre: researcher.nombre,
  idProyecto: researcher.idProyecto,
  email: researcher.email,
  usuario: researcher.usuario,
  horasDedicacion: researcher.horasDedicacion,
  activo: researcher.activo,
});

module.exports = {
  getResearcherByEmail,
  getResearcherById,
  parseResearcher,
};
