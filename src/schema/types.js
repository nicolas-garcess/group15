const { studentTypes } = require('./students');
const { researcherTypes } = require('./researchers');

const typeDefs = `
  ${studentTypes}
  ${researcherTypes}
`;

module.exports = typeDefs;
