const { GraphQLError } = require('graphql');
const Researcher = require('../../models/researchers.model');
const {
  getProjectById,
  addResearcherToProject,
  disableResearcherFromProject,
  findResearcherInAProject,
  updateResearcherStatusInAProject,
} = require('../projects/data');
const { getResearcherByEmail, getResearcherById, parseResearcher } = require('./data');
const { parseResponse } = require('../students/data');
const { schemaCreateResearcher } = require('../validations');

const researcherMutations = {
  async createResearcher(_, { input }) {
    const { error } = schemaCreateResearcher.validate(
      input,
      { abortEarly: false },
    );

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

    const project = await getProjectById(input.idProyecto);

    if (project !== null) {
      const researcherByEmail = await getResearcherByEmail(input.email);

      if (researcherByEmail === null) {
        const researcherById = await getResearcherById(input.id);

        if (researcherById === null) {
          addResearcherToProject(input.id, input.idProyecto);
          const researcherToCreate = new Researcher(input);
          const researcherCreated = await researcherToCreate.save();

          return parseResearcher(researcherCreated);
        }

        return new GraphQLError({
          error: 'The researcher ID already exists',
          wasSuccessful: false,
        });
      }

      return new GraphQLError({
        error: 'The researcher already exists',
        wasSuccessful: false,
      });
    }

    return new GraphQLError({
      error: `The project Id ${input.idProyecto} does not exist`,
      wasSuccessful: false,
    });
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
  async deleteResearcherById(_, { id }) {
    try {
      const deletedResearcher = await Researcher.findOneAndDelete({ id });

      if (deletedResearcher !== null) {
        return {
          message: `The researcher ${id} was deleted`,
          wasSuccessful: true,
        };
      }
      return {
        message: `The researcher ${id} does not exist`,
        wasSuccessful: false,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        wasSuccessful: false,
      };
    }
  },
};

module.exports = researcherMutations;
