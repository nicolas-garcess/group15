const Project = require('../../models/projects.model');

const projectQueries = {
  async getProjects() {
    return Project.find();
  },
  async getProjectById(_, { id }) {
    return Project.findOne({ id });
  },
};

module.exports = projectQueries;
