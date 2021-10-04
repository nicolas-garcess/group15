const Project = require('../../models/projects.model');

const projectMutations = {
  async createProject(_, { input }) {
    const projectToCreate = new Project(input);
    return projectToCreate.save();
  },
  async updateProjectById(_, { id, input }) {
    return Project.findOneAndUpdate(id, input, { new: true });
  },
};

module.exports = projectMutations;
