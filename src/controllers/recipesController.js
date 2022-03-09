const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');

const CREATED = 201;
const OK = 200;
const NO_CONTENT = 204;


const createRecipe = async (req, res) => {
  const { _id: id } = req.user;
  const { name, ingredients, preparation } = req.body;

  const createdRecipe = await recipesService
    .createRecipe({ name, ingredients, preparation });
  const { _id } = createdRecipe;
 
  if (createdRecipe.err) {
    const { status, message } = createdRecipe.err;
    return res.status(status).json({ message });
  } 
  return res.status(CREATED)
    .json({ recipe: { name, ingredients, preparation, userId: id, _id } });
};

const getAllRecipes = async (_req, res) => {
  const listRecipes = await recipesService
    .getAllRecipes();
  return res.status(OK).json(listRecipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const RecipeByID = await recipesService
    .getRecipeById(id);
  if (RecipeByID.err) {
    const { status, message } = RecipeByID.err;
    return res.status(status).json({ message });
  }
  return res.status(OK).json(RecipeByID);
};

const updateRecipeById = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const getRecipe = await recipesModel.getRecipeById(id);
  const { _id } = getRecipe;
  await recipesService.updateRecipeById(
    { id, name, ingredients, preparation },
  );
  return res.status(OK).json(
    { _id: id, name, ingredients, preparation, userId: _id },
  );
};

const deleteRecipeById = async (req, res) => {
  const { id } = req.params;
  await recipesService.deleteRecipeById(id);
  return res.status(NO_CONTENT).json();
};

const uploadImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.file;
    const { _id, name, ingredients, preparation } = await recipesService.getRecipeById(id);
    const { _id: userId } = req.user;
    await recipesService.uploadImageById(id, `localhost:3000/${path}`);
      return res.status(OK).json(
        { _id, name, ingredients, preparation, userId, image: `localhost:3000/${path}` },
      );
  } catch (err) {
    console.log('message', err.message);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  uploadImageById,
};
