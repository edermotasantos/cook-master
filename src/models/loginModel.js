const connection = require('./connection');

const createLogin = async ({ email, password }) => {
  const userCollection = await connection()
    .then((db) => db.collection('users'));
    const userFound = await userCollection
    .findOne({ email, password });

  return userFound;  
};

module.exports = {
  createLogin,
};
