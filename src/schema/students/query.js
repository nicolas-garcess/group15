const studentQueries = {
  greet(_, { name }) {
    return `Hello ${name}`;
  },
};

module.exports = studentQueries;
