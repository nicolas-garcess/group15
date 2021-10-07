const Project = require('../../models/projects.model');

const getProjectById = async (projectId) => Project.findOne({ idProyecto: projectId });

const updateStudentStatusInAProject = async (projectId, studentId, status) => {
  await Project.findOneAndUpdate(
    {
      $and: [
        { idProyecto: projectId },
        { 'estudiantes.idEstudiante': studentId },
      ],
    },
    { $set: { 'estudiantes.$.activo': !status } },
    { new: true },
  );

  return {
    message: 'Succesfull process',
    wasSuccessfull: true,
  };
};

const findStudentInAProject = async (projectId, studentId) => {
  const response = await Project.findOne(
    {
      $and: [
        { idProyecto: projectId },
        { 'estudiantes.idEstudiante': studentId },
      ],
    },
  );

  return response;
};

const disableStudentFromProject = async (studentId, projectId) => {
  const project = await getProjectById(projectId);

  if (project !== null) {
    await updateStudentStatusInAProject(projectId, studentId, true);
    return {
      message: 'Successful process',
      wasSuccessfull: true,
    };
  }
  return {
    message: 'A project with that id does not exist',
    wasSuccessfull: false,
  };
};

const addStudentToProject = async (studentId, projectId) => {
  const project = await getProjectById(projectId);

  if (project !== null) {
    const students = project.estudiantes;
    await Project.findOneAndUpdate(
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
    return {
      message: 'Successful process',
      wasSuccessfull: true,
    };
  }

  return {
    message: 'A project with that id does not exist',
    wasSuccessfull: false,
  };
};

module.exports = {
  addStudentToProject,
  disableStudentFromProject,
  findStudentInAProject,
  updateStudentStatusInAProject,
};
