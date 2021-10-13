const { GraphQLError } = require('graphql');
const Project = require('../../models/projects.model');
const {
  getProjectById, calculateProjectProgress, disableStudentsOfAProject, disableResearchersOfAProject,
} = require('./data');
const {
  schemaCreateProject,
  schemaProjectId,
  schemaUpdateProject,
  schemaUpdateResearcherInAProject,
  schemaUpdateStudentInAProject,
} = require('../validations');
const { verifyResearcher } = require('../../helpers');

const projectMutations = {
  async createProject(_, { input }, { token }) {
    const { message, isDenied } = verifyResearcher(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    const { error } = schemaCreateProject.validate(input, { abortEarly: false });

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

    const project = await getProjectById(input.idProyecto);

    if (project === null) {
      await disableStudentsOfAProject(input.estudiantes, input.idProyecto);
      await disableResearchersOfAProject(input.investigadores, input.idProyecto);

      const projectProgress = calculateProjectProgress(input, input.idProyecto);
      const queryData = { ...input, ...projectProgress };

      const projectToCreate = new Project(queryData);
      return projectToCreate.save();
    }

    return new GraphQLError({
      error: `The project Id ${input.idProyecto} already exists`,
      wasSuccessful: false,
    });
  },
  async updateProject(_, { idProyecto, input }, { token }) {
    const { message, isDenied } = verifyResearcher(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    const { error } = schemaUpdateProject.validate({ idProyecto, ...input }, { abortEarly: false });

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

    const project = await getProjectById(idProyecto);

    if (project !== null) {
      const projectProgress = calculateProjectProgress(input, idProyecto);
      const queryData = { ...input, ...projectProgress };

      return Project.findOneAndUpdate({ idProyecto }, queryData, { new: true });
    }

    return new GraphQLError({
      error: `The project Id ${idProyecto} does not exist`,
      wasSuccessful: false,
    });
  },
  // TODO verify if necessary get the project before the update
  async updateStudentStatusInAProject(_, { idProyecto, input }, { token }) {
    const { message, isDenied } = verifyResearcher(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    const { error } = schemaUpdateStudentInAProject.validate(
      { idProyecto, ...input },
      { abortEarly: false },
    );

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

    const project = await getProjectById(idProyecto);

    if (project !== null) {
      return Project.findOneAndUpdate(
        {
          $and: [
            { idProyecto },
            { 'estudiantes.idEstudiante': input.idEstudiante },
          ],
        },
        { $set: { 'estudiantes.$.activoEnElProyecto': input.activoEnElProyecto } },
        { new: true },
      );
    }

    return new GraphQLError({
      error: `The project Id ${idProyecto} does not exist`,
      wasSuccessful: false,
    });
  },
  async updateResearcherStatusInAProject(_, { idProyecto, input }, { token }) {
    const { message, isDenied } = verifyResearcher(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    const { error } = schemaUpdateResearcherInAProject.validate(
      { idProyecto, ...input },
      { abortEarly: false },
    );

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

    const project = await getProjectById(idProyecto);

    if (project !== null) {
      return Project.findOneAndUpdate(
        {
          $and: [
            { idProyecto },
            { 'investigadores.idInvestigador': input.idInvestigador },
          ],
        },
        { $set: { 'investigadores.$.activoEnElProyecto': input.activoEnElProyecto } },
        { new: true },
      );
    }

    return new GraphQLError({
      error: `The project Id ${idProyecto} does not exist`,
      wasSuccessful: false,
    });
  },
  async deleteProjectById(_, { idProyecto }, { token }) {
    const { message, isDenied } = verifyResearcher(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    const { error } = schemaProjectId.validate(
      { idProyecto },
      { abortEarly: false },
    );

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

    try {
      const deletedProject = await Project.findOneAndDelete({ idProyecto });

      if (deletedProject !== null) {
        return {
          message: `The project ${idProyecto} was deleted`,
          wasSuccessful: true,
        };
      }
      return {
        message: `The project ${idProyecto} does not exist`,
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

module.exports = projectMutations;
