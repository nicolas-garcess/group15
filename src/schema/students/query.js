const { GraphQLError } = require('graphql');
const Student = require('../../models/students.model');
const { schemaUserId } = require('../validations');

const studentQueries = {
  async students() {
    return Student.find();
  },
  async student(_, { id }) {
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
