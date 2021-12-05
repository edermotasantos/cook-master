const express = require('express');
const multer = require('multer');
const recipesController = require('../controllers/recipesController');
const validateToken = require('../middlewares/token');

const router = express.Router();

router.post('/', validateToken, recipesController.createRecipe);
router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipeById);
router.put('/:id', validateToken, recipesController.updateRecipeById);
router.delete('/:id', validateToken, recipesController.deleteRecipeById);

const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
  
const upload = multer({ storage });

router.put('/:id/image/', validateToken, upload.single('image'), recipesController.uploadImageById);

module.exports = router;
