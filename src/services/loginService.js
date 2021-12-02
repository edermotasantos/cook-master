const loginModel = require('../models/loginModel');

const UNAUTHORIZED = 401;

const messages = {
  401: { 
    emptyField: 'All fields must be filled',
    incorrect: 'Incorrect username or password',
   },
};

const statusAndMessages = {
  emptyField: { err: { status: UNAUTHORIZED, message: messages[UNAUTHORIZED].emptyField } },
  incorrect: { err: { status: UNAUTHORIZED, message: messages[UNAUTHORIZED].incorrect } },
};

const validatePasswordAndEmail = (email, password) => (email && password);

const validateEmail = (email, regexEmail) => regexEmail.test(email);

const existPassword = (loginUser, passUser) => {
  if (!loginUser) return false;

  const { password } = loginUser;

  if (password !== passUser) return false;

  return true;
};

const createLogin = async ({ email, password }) => {
    const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    const validateFields = validatePasswordAndEmail(email, password);
    const validEmail = validateEmail(email, regexEmail);

    if (!validateFields) return statusAndMessages.emptyField; 

    const userLogin = await loginModel.createLogin({ email, password });

    const existPasswords = existPassword(userLogin, password);

    if (!existPasswords || !validEmail) return statusAndMessages.incorrect;
    
    return userLogin;
};

module.exports = { createLogin };
