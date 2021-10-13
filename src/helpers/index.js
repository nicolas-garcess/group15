const auth = require('./auth');
const validations = require('./validations');

module.exports = {
  ...auth,
  ...validations,
};
