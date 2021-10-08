const Project = require('../../models/projects.model');

const projectMutations = {
  async createProject(_, { input }) {
    const projectToCreate = new Project(input);
    return projectToCreate.save();
  },
  async updateProject(_, { idProyecto, input }) {
    return Project.findOneAndUpdate({ idProyecto }, input, { new: true });
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
};

module.exports = projectMutations;
