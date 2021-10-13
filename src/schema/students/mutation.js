const { GraphQLError } = require('graphql');
const Student = require('../../models/students.model');
const {
  getProjectById,
  addStudentToProject,
  disableStudentFromProject,
  findStudentInAProject,
  updateStudentStatusInAProject,
} = require('../projects/data');
const {
  getStudentByEmail, getStudentById, parseResponse, parseStudent,
} = require('./data');
const {
  schemaCreateStudent,
  schemaUpdateStudent,
  schemaUserId,
  verifyResearcher,
  verifyUser,
  hashPassword,
} = require('../../helpers');

const studentMutations = {
  async createStudent(_, { input }, { token }) {
    const { message, isDenied } = verifyResearcher(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    const { error } = schemaCreateStudent.validate(
      input,
      { abortEarly: false },
    );

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

    const project = await getProjectById(input.idProyecto);

    if (project !== null) {
      const studentByEmail = await getStudentByEmail(input.email);

      if (studentByEmail === null) {
        const studentById = await getStudentById(input.id);

        if (studentById === null) {
          addStudentToProject(input.id, input.idProyecto);

          const hashedPassword = await hashPassword(input.contrasena, 10);

          const studentToCreate = new Student({ ...input, contrasena: hashedPassword });
          const studentCreated = await studentToCreate.save();

          return studentCreated;
        }
        return new GraphQLError({
          error: `The student ID ${input.id} already exists`,
          wasSuccessful: false,
        });
      }

      return new GraphQLError({
        error: `The email ${input.email} already exists`,
        wasSuccessful: false,
      });
    }

    return new GraphQLError({
      error: `The project Id ${input.idProyecto} does not exist`,
      wasSuccessful: false,
    });
  },
  async updateStudent(_, { id, input }, { token }) {
    const { data, message, isDenied } = verifyUser(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    if (data.rol === 'student' && data.id !== id) {
      throw new GraphQLError({
        error: 'You do not have the permission',
        wasSuccessful: false,
      });
    }

    const { error } = schemaUpdateStudent.validate(
      { id, ...input },
      { abortEarly: false },
    );

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

    const studentById = await getStudentById(id);
    const projectId = typeof input.idProyecto !== 'undefined' ? input.idProyecto : studentById.idProyecto;

    const project = await getProjectById(projectId);

    let response = null;

    if (project !== null) {
      if (studentById !== null) {
        const email = typeof input.email !== 'undefined' ? input.email : studentById.email;
        const studentByEmail = await getStudentByEmail(email);

        if (id === studentByEmail?.id || studentByEmail === null) {
          if (projectId !== studentById.idProyecto) {
            response = await disableStudentFromProject(id, studentById.idProyecto);

            const studentRegisteredInAProject = await findStudentInAProject(input.idProyecto, id);
            response = studentRegisteredInAProject !== null
              ? await updateStudentStatusInAProject(input.idProyecto, id, false)
              : await addStudentToProject(id, input.idProyecto);
          }

          const updatedStudent = await Student.findOneAndUpdate({ id }, input, { new: true });

          return {
            ...parseStudent(updatedStudent), message: 'Student updated', wasSuccessful: true, ...parseResponse(response),
          };
        }

        return new GraphQLError({
          error: `The email ${input.email} already exists`,
          wasSuccessful: false,
        });
      }

      return new GraphQLError({
        error: `The student ID ${id} doest not exist`,
        wasSuccessful: false,
      });
    }

    return new GraphQLError({
      error: `The project Id ${input.idProyecto} does not exist`,
      wasSuccessful: false,
    });
  },
  async updateStudentPassword(_, { id, password }, { token }) {
    const { data, message, isDenied } = verifyUser(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    if (data.id !== id) {
      throw new GraphQLError({
        error: 'You do not have the permission',
        wasSuccessful: false,
      });
    }
    const hashedPassword = await hashPassword(password, 10);

    return Student.findOneAndUpdate({ id }, { contrasena: hashedPassword }, { new: true });
  },
  async deleteStudentById(_, { id }, { token }) {
    const { message, isDenied } = verifyResearcher(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    const { error } = schemaUserId.validate(
      { id },
      { abortEarly: false },
    );

    if (error) {
      throw new GraphQLError({
        error: `${error}`,
        wasSuccessful: false,
      });
    }

    try {
      const deletedStudent = await Student.findOneAndDelete({ id });

      if (deletedStudent !== null) {
        return {
          message: `The student ${id} was deleted`,
          wasSuccessful: true,
        };
      }
      return {
        message: `The student ${id} does not exist`,
        wasSuccessful: false,
      };
    } catch (err) {
      return {
        message: 'Something went wrong',
        wasSuccessful: false,
      };
    }
  },
};

module.exports = studentMutations;
