const Researcher = require('../../models/researchers.model');

const getResearcherByEmail = async (email) => Researcher.findOne({ email });
const getResearcherById = async (id) => Researcher.findOne({ id });

module.exports = {
  getResearcherByEmail,
  getResearcherById,
};
