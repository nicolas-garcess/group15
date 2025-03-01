const { GraphQLError } = require('graphql');
const Project = require('../../models/projects.model');
const { getProjectById, assignResearchersAndStudentsDataToProjects } = require('./data');
const { schemaProjectId, verifyResearcher, verifyUser } = require('../../helpers');

const projectQueries = {
  async projects(_, __, { token }) {
    const { message, isDenied } = verifyResearcher(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    try {
      const projects = await Project.aggregate([{
        $lookup: {
          from: 'estudiantes', localField: 'estudiantes.idEstudiante', foreignField: 'id', as: 'studentsResponse',
        },
      }, {
        $lookup: {
          from: 'investigadores', localField: 'investigadores.idInvestigador', foreignField: 'id', as: 'researchersResponse',
        },
      }]);

      return assignResearchersAndStudentsDataToProjects(projects);
    } catch (err) {
      return {
        message: 'Something went wrong',
        wasSuccesful: false,
      };
    }
  },
  async project(_, { idProyecto }, { token }) {
    const { message, isDenied } = verifyUser(token);

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
      const project = await getProjectById(idProyecto);

      if (project !== null) {
        const response = await Project.aggregate([
          { $match: { idProyecto } },
          {
            $lookup: {
              from: 'estudiantes', localField: 'estudiantes.idEstudiante', foreignField: 'id', as: 'studentsResponse',
            },
          },
          {
            $lookup: {
              from: 'investigadores', localField: 'investigadores.idInvestigador', foreignField: 'id', as: 'researchersResponse',
            },
          },
        ]);

        const parsedProject = assignResearchersAndStudentsDataToProjects(response)[0];

        return parsedProject;
      }

      return new GraphQLError({
        error: `The project Id ${idProyecto} does not exist`,
        wasSuccessful: false,
      });
    } catch (err) {
      return new GraphQLError({
        error: 'Something went wrong',
        wasSuccessful: false,
      });
    }
  },
};

module.exports = projectQueries;
