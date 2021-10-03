const { studentQueries } = require('./students');

const resolvers = {
  Query: {
    ...studentQueries,
  },
};

module.exports = resolvers;
