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

const updateRecipeById = async ({ id, name, ingredients, preparation }) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));
  const updateRecipe = await recipesCollection
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    );
  return updateRecipe;
};

const deleteRecipeById = async (id) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));
  const deleteRecipe = await recipesCollection
    .deleteOne({ _id: ObjectId(id) });
  return deleteRecipe;
};

const uploadImageById = async (id, image) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));
  const updateImage = await recipesCollection
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { image } },
    );
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
