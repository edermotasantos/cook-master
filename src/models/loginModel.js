const connection = require('./connection');

const getUserByEmailAndPassword = async ({ email, password }) => {
  const userCollection = await connection()
    .then((db) => db.collection('users'));
    const userFound = await userCollection
    .findOne({ email, password });

  return userFound;  
};

module.exports = {
  getUserByEmailAndPassword,
};
