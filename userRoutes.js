const express = require('express');
const router = express.Router();
const userController = require('./userControllers');
const {
  createUserValidator,
  updateUserValidator,
  idValidator,
  validate
} = require('./usersValidatorMiddleware');

// Routes
router.get('/', userController.getAllUsers);

router.get('/:id', idValidator, validate, userController.getUserById);

router.post('/', createUserValidator, validate, userController.createUser);

router.put('/:id', idValidator, updateUserValidator, validate, userController.updateUser);

router.delete('/:id', idValidator, validate, userController.deleteUser);


module.exports = router;