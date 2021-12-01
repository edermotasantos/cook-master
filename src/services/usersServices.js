const usersModel = require('../models/usersModel');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const messages = {
  400: 'Invalid entries. Try again.',
  409: 'Email already registered',
};

const checkFields = (name, email, password) => (!name || !email || !password) ? false : true;

const emailIsValid = (email, emailRegex) => (!emailRegex.test(email)) ? false : true;

/**
 * Consultei o repositório do Robertson Maxwel para resolver essa parte.
 * Link: // https://github.com/tryber/sd-010-a-cookmaster/pull/104/files
 */

const createUser = async ({ name, email, password, role }) => {
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
  const ValidateEmail = emailIsValid(email, emailRegex);

  const ValidateFields = checkFields(name, email, password);
  const existEmail = await usersModel.getUserByEmail(email);

  if (!ValidateEmail || !ValidateFields) {
    return { err: { status: BAD_REQUEST, message: messages[BAD_REQUEST] } };
  }
  if (existEmail) return { err: { status: CONFLICT, message: messages[CONFLICT] } };

  const { id } = await usersModel.createUser({ name, email, password, role });
  return (
    { id, name, email, password, role }
  );
};

module.exports = { createUser };
