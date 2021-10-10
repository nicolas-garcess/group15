const { GraphQLError } = require('graphql');
const Project = require('../../models/projects.model');
const {
  getProjectById, calculateProjectProgress, disableStudentsOfAProject, disableResearchersOfAProject,
} = require('./data');
const { schemaCreateProject } = require('../validations');

const projectMutations = {
  async createProject(_, { input }) {
    const { error } = schemaCreateProject.validate(input, { abortEarly: false });

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

    if (getProjectById(input.idProyecto) === null) {
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
  async updateProject(_, { idProyecto, input }) {
    const projectProgress = calculateProjectProgress(input, idProyecto);
    const queryData = { ...input, ...projectProgress };

    return Project.findOneAndUpdate({ idProyecto }, queryData, { new: true });
  },
  async updateStudentStatusInAProject(_, { idProyecto, input }) {
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
  },
  async updateResearcherStatusInAProject(_, { idProyecto, input }) {
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
  },
  async deleteProjectById(_, { idProyecto }) {
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
    } catch (error) {
      return {
        message: 'Something went wrong',
        wasSuccessful: false,
      };
    }
  },
};

module.exports = projectMutations;
