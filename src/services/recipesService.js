const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;

const messages = {
  400: 'Invalid entries. Try again.',
  404: 'recipe not found',
};

const validateEntry = (name, ingredients, preparation) => (name && ingredients && preparation);

const createRecipe = async ({ name, ingredients, preparation }) => {
  const existFields = validateEntry(name, ingredients, preparation);

  if (!existFields) return { err: { status: BAD_REQUEST, message: messages[BAD_REQUEST] } };

  const { id, _id } = await recipesModel.createRecipe({ name, ingredients, preparation });
  return { id, name, ingredients, preparation, _id };
};

const getAllRecipes = async () => {
  const listRecipes = await recipesModel.getAllRecipes();
  return listRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return { err: { status: NOT_FOUND, message: messages[NOT_FOUND] } };

  const RecipeByID = await recipesModel.getRecipeById(id); 
  return RecipeByID;
};

const updateRecipeById = async ({ id, name, ingredients, preparation }) => {
  const updateRecipe = await recipesModel.updateRecipeById({ id, name, ingredients, preparation });
  return updateRecipe;
};

const deleteRecipeById = async (id) => {
  const deleteRecipe = await recipesModel.deleteRecipeById(id);
  return deleteRecipe;
};

const uploadImageById = async (id, image) => {
  const updateImage = await recipesModel.uploadImageById(id, image);
  return updateImage;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  uploadImageById,
};