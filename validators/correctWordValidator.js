const { check } = require("express-validator");

exports.correctWordValidator = [
  check("question").not().isEmpty().withMessage("Question is required"),
  check("correctOption")
    .not()
    .isEmpty()
    .withMessage("correctOption is required"),
  check("wrongOption1").not().isEmpty().withMessage("wrongOption1 is required"),
  check("wrongOption2").not().isEmpty().withMessage("wrongOption2 is required"),
  check("wrongOption3").not().isEmpty().withMessage("wrongOption3 is required"),
  check("wrongOptions").not().isEmpty().withMessage("wrongOptions is required"),
];
