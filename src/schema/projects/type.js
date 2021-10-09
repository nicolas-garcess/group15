const researcherTypes = `
    scalar DateTime

    type Query {
      projects: [Project]
      project(idProyecto: String!): Project
    }

    type Mutation {
      createProject(input: ProjectInput!): Project
      updateProject(idProyecto: String!, input: ProjectUpdate!): Project
      updateStudentStatusInAProject(idProyecto: String!, input: ProjectStudentUpdate!): Project
      updateResearcherStatusInAProject(idProyecto: String!, input: ProjectResearcherUpdate!): Project
    }

    type Project {
      idProyecto: String
      objetivos: Objectives
      presupuesto: Float
      fechaInicial: DateTime
      fechaFinal: DateTime
      directorProyecto: String
      estaDisponible: Boolean
      avance: Float
      fase: String
      estudiantes: [ProjectStudent]
      investigadores: [ProjectResearcher]
      notas: [Note]
    }

    input ProjectInput {
      idProyecto: String!
      objetivos: ObjectivesInput!
      presupuesto: Float!
      fechaInicial: DateTime!
      fechaFinal: DateTime!
      directorProyecto: String!
      estaDisponible: Boolean!
      estudiantes: [ProjectStudentInput]!
      investigadores: [ProjectResearcherInput]!
      notas: [NoteInput]!
    }

    input ProjectUpdate {
      objetivos: ObjectivesUpdate
      presupuesto: Float
      fechaInicial: DateTime
      fechaFinal: DateTime
      directorProyecto: String
      estaDisponible: Boolean
      notas: [NoteUpdate]
    }

    type Objectives {
      objetivoGeneral: Objective
      objetivosEspecificos: [Objective]
    }

    type Objective {
      idObjetivo: String
      descripcion: String
      cumplido: Boolean
    }

    type ProjectStudent {
      idEstudiante: String
      activo: Boolean
    }

    type ProjectResearcher {
      idInvestigador: String
      activo: Boolean
    }

    type Note {
      idNota: String
      descripcion: String
    }

    input ObjectivesInput {
      objetivoGeneral: ObjectiveInput
      objetivosEspecificos: [ObjectiveInput]
    }

    input ObjectiveInput {
      idObjetivo: String
      descripcion: String
      cumplido: Boolean
    }

    input ProjectStudentInput {
      idEstudiante: String
      activo: Boolean
    }

    input ProjectResearcherInput {
      idInvestigador: String
      activo: Boolean
    }

    input NoteInput {
      idNota: String
      descripcion: String
    }

    input ObjectivesUpdate {
      objetivoGeneral: ObjectiveUpdate
      objetivosEspecificos: [ObjectiveUpdate]
    }

    input ObjectiveUpdate {
      idObjetivo: String
      descripcion: String
      cumplido: Boolean
    }

    input ProjectStudentUpdate {
      idEstudiante: String
      activo: Boolean
    }

    input ProjectResearcherUpdate {
      idInvestigador: String
      activo: Boolean
    }

    input NoteUpdate {
      idNota: String
      descripcion: String
    }
`;

module.exports = researcherTypes;
