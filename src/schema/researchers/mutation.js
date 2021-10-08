const Researcher = require('../../models/researchers.model');
const {
  addResearcherToProject,
  disableResearcherFromProject,
  findResearcherInAProject,
  updateResearcherStatusInAProject,
} = require('../projects/data');
const { getResearcherByEmail, getResearcherById, parseResearcher } = require('./data');
const { parseResponse } = require('../students/data');

const researcherMutations = {
  async createResearcher(_, { input }) {
    const researcherByEmail = await getResearcherByEmail(input.email);
    const researcherById = await getResearcherById(input.id);

    if (researcherByEmail === null) {
      if (researcherById === null) {
        addResearcherToProject(input.id, input.idProyecto);
        const researcherToCreate = new Researcher(input);
        const researcherCreated = await researcherToCreate.save();

        return { ...parseResearcher(researcherCreated), message: 'Researcher created', wasSuccessful: true };
      }
      return { message: 'The researcher ID already exists', wasSuccessful: false };
    }

    return { message: 'The researcher already exists', wasSuccessful: false };
  },
  async updateResearcher(_, { id, input }) {
    const researcherById = await getResearcherById(id);
    let response = null;

    if (researcherById !== null) {
      if (input.idProyecto && input.idProyecto !== researcherById.idProyecto) {
        response = await disableResearcherFromProject(id, researcherById.idProyecto);

        const researcherRegisteredInAProject = await findResearcherInAProject(input.idProyecto, id);
        response = researcherRegisteredInAProject !== null
          ? await updateResearcherStatusInAProject(input.idProyecto, id, false)
          : await addResearcherToProject(id, input.idProyecto);
      }

      const updatedResearcher = await Researcher.findOneAndUpdate({ id }, input, { new: true });

      return {
        ...parseResearcher(updatedResearcher), message: 'Researcher updated', wasSuccessful: true, ...parseResponse(response),
      };
    }

    return { message: 'Researcher Id does not exist', wasSuccessful: false };
  },
  async updateResearcherPassword(_, { id, password }) {
    return Researcher.findOneAndUpdate({ id }, { contrasena: password }, { new: true });
  },
};

module.exports = researcherMutations;
