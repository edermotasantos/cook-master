const recipesService = require('../services/recipesService');

const OK = 201;

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: id } = req.user;

  const createdRecipe = await recipesService.createRecipe({ name, ingredients, preparation });
  const { _id } = createdRecipe;
 
  if (createdRecipe.err) {
    const { status, message } = createdRecipe.err;
    return res.status(status).json({ message });
  } 
  return res.status(OK).json(
    {
      recipe: 
      {
        name,
        ingredients,
        preparation,
        userId: id,
        _id
      }
    }
  );
};

module.exports = { createRecipe }; 