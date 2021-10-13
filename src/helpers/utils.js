const bcrypt = require('bcrypt');

const hashPassword = async (password, numberOfSalts) => {
  const salt = await bcrypt.genSalt(numberOfSalts);
  return bcrypt.hash(password, salt);
};

module.exports = {
  hashPassword,
};
