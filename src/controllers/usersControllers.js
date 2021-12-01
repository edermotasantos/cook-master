const usersServices = require('../services/usersServices');

const CREATED = 201;

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const create = await usersServices.createUser({ name, email, password, role });
  const { id } = create;

  if (create.err) return res.status(create.err.status).json({ message: create.err.message });

  return res.status(CREATED).json({ user: { name, email, role: 'user', _id: id } });
};

module.exports = { createUser };
