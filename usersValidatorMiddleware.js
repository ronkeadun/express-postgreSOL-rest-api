const { body, param, validationResult } = require('express-validator');

exports.createUserValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
];

exports.updateUserValidator = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Email must be valid'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer'),
];

exports.idValidator = [
  param('id').isInt().withMessage('ID must be an integer'),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};