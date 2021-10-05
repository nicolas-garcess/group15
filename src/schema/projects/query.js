const Project = require('../../models/projects.model');

const projectQueries = {
  async getProjects() {
    return Project.find();
  },
  async getProjectById(_, { idProyecto }) {
    return Project.findOne({ idProyecto });
  },
};

module.exports = projectQueries;
