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
const { schemaCreateStudent, schemaUpdateStudent, schemaUserId } = require('../validations');

const studentMutations = {
  async createStudent(_, { input }) {
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
          const studentToCreate = new Student(input);
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
  async updateStudent(_, { id, input }) {
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

        if (id === studentByEmail.id) {
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
  async updatePassword(_, { id, password }) {
    return Student.findOneAndUpdate({ id }, { contrasena: password }, { new: true });
  },
  async deleteStudentById(_, { id }) {
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
