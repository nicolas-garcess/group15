const { GraphQLError } = require('graphql');
const Student = require('../../models/students.model');
const { schemaUserId, verifyResearcher, verifyUser } = require('../../helpers');

const studentQueries = {
  async students(_, __, { token }) {
    const { message, isDenied } = verifyResearcher(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    return Student.find();
  },
  async student(_, { id }, { token }) {
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

    const student = await Student.findOne({ id });

    if (student !== null) {
      return student;
    }

    return new GraphQLError({
      error: `The student Id ${id} does not exist`,
      wasSuccessful: false,
    });
  },
};

module.exports = studentQueries;
