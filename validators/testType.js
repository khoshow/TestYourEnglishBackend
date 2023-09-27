const { check } = require('express-validator');

exports.testTypeCreateValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required')
];
