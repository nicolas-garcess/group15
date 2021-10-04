const researcherTypes = `
    type Query {
      getProjects: [Project]
      getProjectById(idProyecto: String!): Project
    }

    type Mutation {
      createProject(input: ProjectInput!): Project
      updateProjectById(idProyecto: String!, input: ProjectUpdate!): Project
    }

    type Project {
      idProyecto: String
      objetivos: Objectives
      presupuesto: Float
      fechaInicial: Date
      fechaFinal: Date
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
      objetivos: Objectives!
      presupuesto: Float!
      fechaInicial: Date!
      fechaFinal: Date!
      directorProyecto: String!
      estaDisponible: Boolean!
      avance: Float!
      fase: String!
      estudiantes: [ProjecStudent]!
      investigadores: [ProjectResearcher]!
      notas: [Note]!
    }

    input ProjectUpdate {
      objetivos: Objectives
      presupuesto: Float
      fechaInicial: Date
      fechaFinal: Date
      directorProyecto: String
      estaDisponible: Boolean
      avance: Float
      fase: String
      estudiantes: [ProjecStudent]
      investigadores: [ProjectResearcher]
      notas: [Note]
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
`;

module.exports = researcherTypes;
