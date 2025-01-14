const studentTypes = `
    type Query {
      students: [Student]
      student(id: String!): Student
    }

    type Mutation {
      createStudent(input: StudentInput!): Student
      updateStudent(id: String!, input: StudentUpdate!): Student
      updateStudentPassword(id: String!, password: String!): Student
      deleteStudentById(id: String!): Response
    }

    type Student {
      id: String
      nombre: String
      carrera: String
      celular: String
      idProyecto: String
      email: String
      usuario: String
      fechaIngreso: DateTime
      activo: Boolean
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
      fechaIngreso: DateTime
      activo: Boolean!
    }

    input StudentUpdate {
      nombre: String
      carrera: String
      celular: String
      idProyecto: String
      email: String
      fechaIngreso: DateTime
      activo: Boolean
    }
`;

module.exports = studentTypes;
