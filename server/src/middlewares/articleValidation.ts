import { check, ValidationChain } from "express-validator";

export const createOrderArticleValidation: ValidationChain[] = [
  check("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),

  check("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10 }).withMessage("Description must be at least 10 characters long"),

  check("keywords")
    .trim()
    .notEmpty().withMessage("Keywords are required")
    .isArray().withMessage("Keywords must be an array")
    .custom((value) => value.every((keyword: string) => typeof keyword === "string"))
    .withMessage("Each keyword must be a string"),

  check("word_count")
    .optional()
    .isString().withMessage("Word count must be a string")
    .matches(/^\d+\s*words$/).withMessage("Word count must be in the format '300 words'"),

  check("duration")
    .optional()
    .isString().withMessage("Duration must be a string")
    .matches(/^\d+\s*(day|days)$/).withMessage("Duration must be in the format '1 day' or '2 days'"),

  check("complexity")
    .optional()
    .isIn(["General", "Advanced", "Expert"]).withMessage("Complexity must be one of 'General', 'Advanced', or 'Expert'"),

  check("language")
    .optional()
    .isIn(["American English", "British English", "Canadian English", "Australian English"])
    .withMessage("Language must be one of 'American English', 'British English', 'Canadian English', or 'Australian English'"),

  check("quantity")
    .optional()
    .isInt({ gt: 0 }).withMessage("Quantity must be a positive integer")
    .toInt(),

  check("cost")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Cost must be a positive number")
    .toFloat(),
];
