const jwt = require('jsonwebtoken');

const loginModel = require('../models/loginModel');

const API_SECRET = 'usersecret';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return res.status(401).json({ message: 'missing auth token' }); }

  try {
    const decrypt = jwt.verify(token, API_SECRET);
    console.log(decrypt);

    const user = await loginModel.createLogin({ email: decrypt.email, password: decrypt.password });
    if (!user) {
      return res.status(401).json({ message: 'Not Authorized' }); 
    }
    req.user = user;
    console.log(req.user);

    next();
  } catch (_err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateToken;
