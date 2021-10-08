const studentTypes = `
    type Query {
      students: [Student]
      student(id: String!): Student
    }

    type Mutation {
      createStudent(input: StudentInput!): Student
      updateStudent(id: String!, input: StudentUpdate!): Student
      updatePassword(id: String!, password: String!): Student
    }

    type Student {
      id: String
      nombre: String
      carrera: String
      celular: String
      idProyecto: String
      email: String
      usuario: String
      contrasena: String
      activo: String
      message: String
      wasSuccessful: Boolean
    }

    input StudentInput {
      id: String!
      nombre: String!
      carrera: String!
      celular: String!
      idProyecto: String!
      email: String!
      usuario: String!
      contrasena: String!
      activo: Boolean!
    }

    input StudentUpdate {
      nombre: String
      carrera: String
      celular: String
      idProyecto: String
      email: String
      usuario: String
      activo: Boolean
    }
`;

module.exports = studentTypes;
