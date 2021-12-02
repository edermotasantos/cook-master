const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const API_SECRET = 'usersecret';

const OK = 200;

const createLogin = async (req, res) => {
  const { email, password } = req.body;

  const loginCreated = await loginService.createLogin({ email, password });

  if (loginCreated.err) {
    const { status, message } = loginCreated.err;
    return res.status(status).json({ message }); 
  }
 
  const token = jwt.sign(loginCreated, API_SECRET);  
  return res.status(OK).json({ token });
};

module.exports = { createLogin };
