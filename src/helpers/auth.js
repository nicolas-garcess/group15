const jwt = require('jsonwebtoken');

const decodeToken = (token) => {
  const verified = jwt.verify(token, process.env.SECRET_TOKEN);

  return verified;
};

const verifyResearcher = (token) => {
  if (!token) {
    return {
      data: null,
      message: 'There is not a token',
      isDenied: true,
    };
  }

  try {
    const verified = decodeToken(token);
    const { rol } = verified;

    if (rol === 'researcher') {
      return {
        data: verified,
        message: 'Succesful token',
        isDenied: false,
      };
    }

    return {
      data: null,
      message: 'Access denied',
      isDenied: true,
    };
  } catch (err) {
    return {
      data: null,
      message: 'Invalid token',
      isDenied: true,
    };
  }
};

const verifyUser = (token) => {
  if (!token) {
    return {
      data: null,
      message: 'There is not a token',
      isDenied: true,
    };
  }

  try {
    const verified = decodeToken(token);
    const { rol } = verified;

    if (rol === 'researcher' || rol === 'student') {
      return {
        data: verified,
        message: 'Succesful token',
        isDenied: false,
      };
    }

    return {
      data: null,
      message: 'Access denied',
      isDenied: true,
    };
  } catch (err) {
    return {
      data: null,
      message: 'Invalid token',
      isDenied: true,
    };
  }
};

module.exports = {
  verifyResearcher,
  verifyUser,
};
