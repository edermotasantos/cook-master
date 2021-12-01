const express = require('express');

const UsersController = require('../controllers/usersControllers');

const router = express.Router();

router.post('/', UsersController.createUser);

module.exports = router;
