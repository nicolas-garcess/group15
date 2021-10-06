const Project = require('../../models/projects.model');

const projectMutations = {
  async createProject(_, { input }) {
    const projectToCreate = new Project(input);
    return projectToCreate.save();
  },
  async updateProject(_, { idProyecto, input }) {
    return Project.findOneAndUpdate({ idProyecto }, input, { new: true });
  },
};

module.exports = projectMutations;
