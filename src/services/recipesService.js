const recipesModel = require('../models/recipesModel');

const BAD_REQUEST = 400;

const message = 'Invalid entries. Try again.';

const validateEntry = (name, ingredients, preparation) => (name && ingredients && preparation);

const createRecipe = async ({ name, ingredients, preparation }) => {
  const existFields = validateEntry(name, ingredients, preparation);

  if (!existFields) return { err: { status: BAD_REQUEST, message } };

  const { id, _id } = await recipesModel.createRecipe({ name, ingredients, preparation });
  return { id, name, ingredients, preparation, _id };
};

const getAllRecipes = async () => {
  const listRecipes = await recipesModel.getAllRecipes();
  return listRecipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};