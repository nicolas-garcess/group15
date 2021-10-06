const { studentTypes } = require('./students');
const { researcherTypes } = require('./researchers');
const { projectTypes } = require('./projects');

const typeDefs = `
  ${studentTypes}
  ${researcherTypes}
  ${projectTypes}
`;

module.exports = typeDefs;
