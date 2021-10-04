const Researcher = require('../../models/researchers.model');

const researcherQueries = {
  async getResearchers() {
    return Researcher.find();
  },
  async getResearcherById(_, { id }) {
    return Researcher.findOne({ id });
  },
  async getResearcherByEmail(_, { email }) {
    return Researcher.findOne({ email });
  },
};

module.exports = researcherQueries;
