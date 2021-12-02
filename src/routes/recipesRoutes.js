const express = require('express');

const recipesController = require('../controllers/recipesController');
const validateToken = require('../middlewares/token');

const router = express.Router();

router.post('/', validateToken, recipesController.createRecipe);
router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipeById);
router.put('/:id', validateToken, recipesController.updateRecipeById);

module.exports = router;
