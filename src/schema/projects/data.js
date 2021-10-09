const Project = require('../../models/projects.model');
const { getStudentById, updateStudentById } = require('../students/data');
const { getResearcherById, updateResearcherById } = require('../researchers/data');

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

const defineProjectPhase = (progress) => {
  let phase = 'Inicio';
  if (progress === 100) {
    phase = 'Terminado';
  } else if (progress > 0) {
    phase = 'Desarrollo';
  }
  return phase;
};

const calculateProjectProgress = (projectData, projectId) => {
  const specificObjectives = projectData?.objetivos?.objetivosEspecificos;
  let avance = 0;

  if (specificObjectives?.length) {
    const specificObjectivesDone = specificObjectives.filter((objective) => objective.cumplido);
    avance = Math.floor((specificObjectivesDone.length / specificObjectives.length) * 100);
  } else {
    avance = getProjectById(projectId).avance;
  }

  return {
    avance,
    fase: defineProjectPhase(avance),
  };
};

const disableStudentsOfAProject = (students, projectId) => {
  students.forEach(async (student) => {
    const studentById = await getStudentById(student.idEstudiante);

    if (studentById !== null) {
      await disableStudentFromProject(student.idEstudiante, studentById.idProyecto);
      await updateStudentById(student.idEstudiante, projectId);
    }
  });
};

const disableResearchersOfAProject = (researchers, projectId) => {
  researchers.forEach(async (researcher) => {
    const researcherById = await getResearcherById(researcher.idInvestigador);

    if (researcherById !== null) {
      await disableResearcherFromProject(researcher.idInvestigador, researcherById.idProyecto);
      await updateResearcherById(researcher.idInvestigador, projectId);
    }
  });
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
  calculateProjectProgress,
  disableStudentsOfAProject,
  disableResearchersOfAProject,
};
