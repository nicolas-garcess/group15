const researcherTypes = `
    type Query {
      getResearchers: [Researcher]
      getResearcherById(id: String!): Researcher
      getResearcherByEmail(email: String!): Researcher
    }

    type Mutation {
      createResearcher(input: ResearcherInput!): Researcher
      updateResearcherById(id: String!, input: ResearcherUpdate!): Researcher
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
