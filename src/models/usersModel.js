const connection = require('./connection');

const createUser = async ({ name, email, password, role }) => {
  const userCollection = await connection()
    .then((db) => db.collection('users'));
  const create = await userCollection.insertOne({
      name,
      email,
      password,
      role,
    });
  return {
    name,
    email,
    password,
    role,
    id_: create.insertedId,
  };
};

const getUserByEmail = async (email) => {
  const userCollection = await connection()
    .then((db) => db.collection('users'));
  const getEmail = await userCollection
  .findOne({ email });

  return getEmail;  
};

module.exports = {
  createUser,
  getUserByEmail,
};
