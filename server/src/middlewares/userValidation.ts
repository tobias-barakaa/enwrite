import { check, validationResult } from "express-validator";
import { RequestHandler } from "express";

const validateCreateUser: RequestHandler[] = [
  // Validation checks
  check("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
    .isAlphanumeric().withMessage("Username must be alphanumeric"),

  check("email")
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  check("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/).withMessage("Password must contain at least one letter and one number"),

  check("profile_pic")
    .optional()
    .trim()
    .isURL().withMessage("Profile picture must be a valid URL"),

  check("role_id")
    .optional()
    .isInt({ gt: 0 }).withMessage("Role ID must be a positive integer")
    .toInt(),

  // Handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.array().map(err => ({ field: err, message: err.msg })),
      });
    } else {
      next();
    }
  }
];

export default validateCreateUser;
