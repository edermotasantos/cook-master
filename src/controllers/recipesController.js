const recipesService = require('../services/recipesService');

const CREATED = 201;
const OK = 200;

const createRecipe = async (req, res) => {
  const { _id: id } = req.user;
  const { name, ingredients, preparation } = req.body;

  const createdRecipe = await recipesService.createRecipe({ name, ingredients, preparation });
  const { _id } = createdRecipe;
 
  if (createdRecipe.err) {
    const { status, message } = createdRecipe.err;
    return res.status(status).json({ message });
  } 
  return res.status(CREATED).json({ recipe: { name, ingredients, preparation, userId: id, _id } });
};

const getAllRecipes = async (_req, res) => {
  const listRecipes = await recipesService.getAllRecipes();
  return res.status(OK).json(listRecipes);
};

module.exports = { createRecipe, getAllRecipes }; 