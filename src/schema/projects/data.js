const Project = require('../../models/projects.model');

const getProjectById = async (projectId) => Project.findOne({ idProyecto: projectId });

const addStudentToProject = async (studentId, projectId) => {
  const project = await getProjectById(projectId);

  if (project !== null) {
    const students = project.estudiantes;
    return Project.findOneAndUpdate(
      { idProyecto: projectId },
      {
        estudiantes: [
          ...students,
          {
            idEstudiante: studentId,
            activo: true,
          },
        ],
      },
      { new: true },
    );
  }
  return 'A project with that id does not exist';
};

module.exports = {
  addStudentToProject,
};
