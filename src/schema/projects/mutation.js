const Project = require('../../models/projects.model');
const { calculateProjectProgress, disableStudentsOfAProject, disableResearchersOfAProject } = require('./data');

const projectMutations = {
  async createProject(_, { input }) {
    await disableStudentsOfAProject(input.estudiantes, input.idProyecto);
    await disableResearchersOfAProject(input.investigadores, input.idProyecto);

    const projectProgress = calculateProjectProgress(input, input.idProyecto);
    const queryData = { ...input, ...projectProgress };

    const projectToCreate = new Project(queryData);
    return projectToCreate.save();
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
      { $set: { 'estudiantes.$.activo': input.activo } },
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
      { $set: { 'investigadores.$.activo': input.activo } },
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
