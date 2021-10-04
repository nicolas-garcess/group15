const { studentQueries, studentMutations } = require('./students');

const resolvers = {
  Query: {
    ...studentQueries,
  },
  Mutation: {
    ...studentMutations,
  },
};

module.exports = resolvers;
