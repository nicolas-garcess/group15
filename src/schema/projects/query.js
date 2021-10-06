const Project = require('../../models/projects.model');

const projectQueries = {
  async projects() {
    return Project.find();
  },
  async project(_, { idProyecto }) {
    return Project.findOne({ idProyecto });
  },
};

module.exports = projectQueries;
