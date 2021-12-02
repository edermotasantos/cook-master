const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation }) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));
  const recipecreated = await recipesCollection
    .insertOne({
      name,
      ingredients,
      preparation,
    });
  return {
    name,
    ingredients,
    preparation,
    _id: recipecreated.insertedId,
  };
};

const getAllRecipes = async () => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));
  const listRecipes = await recipesCollection
    .find().toArray();
  return listRecipes;
};

const getRecipeById = async (id) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));
  const RecipeByID = await recipesCollection
    .findOne({ _id: ObjectId(id) });
  return RecipeByID;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
