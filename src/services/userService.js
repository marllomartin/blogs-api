const { User } = require('../database/models');
const generateToken = require('../helpers/generateToken');

const login = async ({ email, password }) => {
  const verify = await User.findAll({
    where: {
      email,
      password,
    },
  });

  if (!verify || verify.length === 0) {
    throw new Error('Invalid fields');
  }

  const token = generateToken({ email });
  return { token };
};

const createUser = async (newUser) => {
  const { email } = newUser;
  const verify = await User.findAll({
    where: {
      email,
    },
  });

  if (verify.length > 0) {
    throw new Error('User already registered');
  }

  await User.create(newUser);

  const token = generateToken({ email });
  return { token };
};

module.exports = { login, createUser };