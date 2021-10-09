const Project = require('../../models/projects.model');
const { assignResearchersAndStudentsDataToProjects } = require('./data');

const projectQueries = {
  async projects() {
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
  async project(_, { idProyecto }) {
    try {
      const project = await Project.aggregate([
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

      const parsedProject = assignResearchersAndStudentsDataToProjects(project)[0];
      console.log(parsedProject);

      return {
        ...parsedProject,
        message: 'Succesful query',
        wasSuccesful: true,
      };
    } catch (err) {
      return {
        message: 'Something went wrong',
        wasSuccesful: false,
      };
    }
  },
};

module.exports = projectQueries;
