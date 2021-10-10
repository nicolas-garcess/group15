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
const { schemaCreateResearcher, schemaUpdateResearcher, schemaUserId } = require('../validations');

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
          error: `The researcher ID ${input.id} already exists`,
          wasSuccessful: false,
        });
      }

      return new GraphQLError({
        error: `The email ${input.email} already exists`,
        wasSuccessful: false,
      });
    }

    return new GraphQLError({
      error: `The project Id ${input.idProyecto} does not exist`,
      wasSuccessful: false,
    });
  },
  async updateResearcher(_, { id, input }) {
    const { error } = schemaUpdateResearcher.validate(
      { id, ...input },
      { abortEarly: false },
    );

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

    const researcherById = await getResearcherById(id);
    const projectId = typeof input.idProyecto !== 'undefined' ? input.idProyecto : researcherById.idProyecto;

    const project = await getProjectById(projectId);

    let response = null;

    if (project !== null) {
      if (researcherById !== null) {
        const email = typeof input.email !== 'undefined' ? input.email : researcherById.email;
        const researcherByEmail = await getResearcherByEmail(email);

        if (id === researcherByEmail.id) {
          if (projectId !== researcherById.idProyecto) {
            response = await disableResearcherFromProject(id, researcherById.idProyecto);

            const researcherRegisteredInAProject = await findResearcherInAProject(
              input.idProyecto,
              id,
            );
            response = researcherRegisteredInAProject !== null
              ? await updateResearcherStatusInAProject(input.idProyecto, id, false)
              : await addResearcherToProject(id, input.idProyecto);
          }

          const updatedResearcher = await Researcher.findOneAndUpdate({ id }, input, { new: true });

          return {
            ...parseResearcher(updatedResearcher), message: 'Researcher updated', wasSuccessful: true, ...parseResponse(response),
          };
        }

        return new GraphQLError({
          error: `The email ${input.email} already exists`,
          wasSuccessful: false,
        });
      }

      return new GraphQLError({
        error: `The researcher ID ${id} doest not exist`,
        wasSuccessful: false,
      });
    }

    return new GraphQLError({
      error: `The project Id ${input.idProyecto} does not exist`,
      wasSuccessful: false,
    });
  },
  async updateResearcherPassword(_, { id, password }) {
    return Researcher.findOneAndUpdate({ id }, { contrasena: password }, { new: true });
  },
  async deleteResearcherById(_, { id }) {
    const { error } = schemaUserId.validate(
      { id },
      { abortEarly: false },
    );

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

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
    } catch (err) {
      return {
        message: 'Something went wrong',
        wasSuccessful: false,
      };
    }
  },
};

module.exports = researcherMutations;
