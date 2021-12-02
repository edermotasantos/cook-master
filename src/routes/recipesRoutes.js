const express = require('express');

const recipesController = require('../controllers/recipesController');
const validateToken = require('../middlewares/token');

const router = express.Router();

router.post('/', validateToken, recipesController.createRecipe);

module.exports = router;
