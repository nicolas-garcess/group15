const studentTypes = `
    type Query {
      greet(name: String!): String
      getStudents: [Student]
      getStudentById(id: String!): Student
      getStudentByEmail(email: String!): Student
    }

    type Mutation {
      createStudent(input: StudentInput!): Student
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
`;

module.exports = studentTypes;
