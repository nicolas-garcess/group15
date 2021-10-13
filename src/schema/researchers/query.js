const { GraphQLError } = require('graphql');
const Researcher = require('../../models/researchers.model');
const { schemaUserId } = require('../validations');
const { verifyResearcher } = require('../../helpers');

const researcherQueries = {
  async researchers(_, __, { token }) {
    const { message, isDenied } = verifyResearcher(token);

    if (isDenied) {
      throw new GraphQLError({
        error: message,
        wasSuccessful: false,
      });
    }

    return Researcher.find();
  },
  async researcher(_, { id }, { token }) {
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

    const researcher = await Researcher.findOne({ id });

    if (researcher !== null) {
      return researcher;
    }

    return new GraphQLError({
      error: `The researcher Id ${id} does not exist`,
      wasSuccessful: false,
    });
  },
};

module.exports = researcherQueries;
