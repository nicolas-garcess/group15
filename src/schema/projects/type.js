const researcherTypes = `
    scalar DateTime

    type Query {
      projects: [ProjectResponse]
      project(idProyecto: String!): ProjectResponse
    }

    type Mutation {
      createProject(input: ProjectInput!): Project
      updateProject(idProyecto: String!, input: ProjectUpdate!): Project
      updateStudentStatusInAProject(idProyecto: String!, input: ProjectStudentUpdate!): Project
      updateResearcherStatusInAProject(idProyecto: String!, input: ProjectResearcherUpdate!): Project
      deleteProjectById(idProyecto: String!): Response
    }

    type Project {
      idProyecto: String
      nombre: String
      descripcion: String
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
      response: Response
    }

    type Response {
      message: String
      wasSuccessful: Boolean
    }

    type ProjectResponse {
      idProyecto: String
      nombre: String
      descripcion: String
      objetivos: Objectives
      presupuesto: Float
      fechaInicial: DateTime
      fechaFinal: DateTime
      directorProyecto: String
      estaDisponible: Boolean
      avance: Float
      fase: String
      estudiantes: [ProjectStudentResponse]
      investigadores: [ProjectResearcherResponse]
      notas: [Note]
    }

    input ProjectInput {
      idProyecto: String!
      nombre: String!
      descripcion: String!
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
      nombre: String
      descripcion: String
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
      activoEnElProyecto: Boolean
    }

    type ProjectResearcherResponse {
      idInvestigador: String
      infoInvestigador: Researcher
      activoEnElProyecto: Boolean
    }

    type ProjectResearcher {
      idInvestigador: String
      activoEnElProyecto: Boolean
    }

    type ProjectStudentResponse {
      idEstudiante: String
      infoEstudiante: Student
      activoEnElProyecto: Boolean
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
      activoEnElProyecto: Boolean
    }

    input ProjectResearcherInput {
      idInvestigador: String
      activoEnElProyecto: Boolean
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
      idEstudiante: String!
      activoEnElProyecto: Boolean!
    }

    input ProjectResearcherUpdate {
      idInvestigador: String!
      activoEnElProyecto: Boolean!
    }

    input NoteUpdate {
      idNota: String
      descripcion: String
    }
`;

module.exports = researcherTypes;
