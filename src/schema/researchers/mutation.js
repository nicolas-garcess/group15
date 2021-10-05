const Researcher = require('../../models/researchers.model');

const researcherMutations = {
  async createResearcher(_, { input }) {
    const researcherToCreate = new Researcher(input);
    return researcherToCreate.save();
  },
  async updateResearcherById(_, { id, input }) {
    return Researcher.findOneAndUpdate({ id }, input, { new: true });
  },
  async updateResearcherPassword(_, { id, password }) {
    return Researcher.findOneAndUpdate({ id }, { contrasena: password }, { new: true });
  },
};

module.exports = researcherMutations;
