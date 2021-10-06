const { studentQueries, studentMutations } = require('./students');
const { researcherQueries, researcherMutations } = require('./researchers');
const { projectQueries, projectMutations } = require('./projects');

const resolvers = {
  Query: {
    ...studentQueries,
    ...researcherQueries,
    ...projectQueries,
  },
  Mutation: {
    ...studentMutations,
    ...researcherMutations,
    ...projectMutations,
  },
};

module.exports = resolvers;
