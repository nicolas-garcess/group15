const { studentQueries, studentMutations } = require('./students');
const { researcherQueries, researcherMutations } = require('./researchers');

const resolvers = {
  Query: {
    ...studentQueries,
    ...researcherQueries,
  },
  Mutation: {
    ...studentMutations,
    ...researcherMutations,
  },
};

module.exports = resolvers;
