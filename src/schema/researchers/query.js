const { GraphQLError } = require('graphql');
const Researcher = require('../../models/researchers.model');
const { schemaUserId } = require('../validations');

const researcherQueries = {
  async researchers() {
    return Researcher.find();
  },
  async researcher(_, { id }) {
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
