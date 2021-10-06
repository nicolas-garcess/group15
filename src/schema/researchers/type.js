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
      id: String
      nombre: String
      idProyecto: String
      email: String
      usuario: String
      contrasena: String
      horasDedicacion: Int
      activo: Boolean
    }
`;

module.exports = researcherTypes;
