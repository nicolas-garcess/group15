const researcherTypes = `
    type Query {
      researchers: [Researcher]
      researcher(id: String!): Researcher
    }

    type Mutation {
      createResearcher(input: ResearcherInput!): Researcher
      updateResearcher(id: String!, input: ResearcherUpdate!): Researcher
      updateResearcherPassword(id: String!, password: String!): Researcher
    }

    type Researcher {
      id: String
      nombre: String
      idProyecto: String
      email: String
      usuario: String
      contrasena: String
      horasDedicacion: Int
      activo: Boolean
      message: String
      wasSuccessful: Boolean
    }

    input ResearcherInput {
      id: String!
      nombre: String!
      idProyecto: String!
      email: String!
      usuario: String!
      contrasena: String!
      horasDedicacion: Int!
      activo: Boolean!
    }

    input ResearcherUpdate {
      nombre: String
      idProyecto: String
      email: String
      usuario: String
      horasDedicacion: Int
      activo: Boolean
    }
`;

module.exports = researcherTypes;
