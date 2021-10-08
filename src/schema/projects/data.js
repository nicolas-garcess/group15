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

const updateResearcherStatusInAProject = async (projectId, researcherId, status) => {
  await Project.findOneAndUpdate(
    {
      $and: [
        { idProyecto: projectId },
        { 'investigadores.idInvestigador': researcherId },
      ],
    },
    { $set: { 'investigadores.$.activo': !status } },
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

const findResearcherInAProject = async (projectId, researcherId) => {
  const response = await Project.findOne(
    {
      $and: [
        { idProyecto: projectId },
        { 'investigadores.idInvestigador': researcherId },
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

const disableResearcherFromProject = async (researcherId, projectId) => {
  const project = await getProjectById(projectId);

  if (project !== null) {
    await updateResearcherStatusInAProject(projectId, researcherId, true);
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

const addResearcherToProject = async (researcherId, projectId) => {
  const project = await getProjectById(projectId);

  if (project !== null) {
    const researchers = project.investigadores;
    await Project.findOneAndUpdate(
      { idProyecto: projectId },
      {
        investigadores: [
          ...researchers,
          {
            idInvestigador: researcherId,
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
  addResearcherToProject,
  disableStudentFromProject,
  disableResearcherFromProject,
  findStudentInAProject,
  findResearcherInAProject,
  updateStudentStatusInAProject,
  updateResearcherStatusInAProject,
};
