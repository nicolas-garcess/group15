const Researcher = require('../../models/researchers.model');

const researcherQueries = {
  async researchers() {
    return Researcher.find();
  },
  async researcher(_, { id }) {
    return Researcher.findOne({ id });
  },
};

module.exports = researcherQueries;
