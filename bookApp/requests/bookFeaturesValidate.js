const { body, param } = require('express-validator');

exports.fields = [
    body('bookYear')
        .notEmpty().withMessage('Le champ "year" est requis')
        .isLength({ min: 1, max: 4 }).withMessage('Le champ "year" doit avoir une longueur de 4 caractères')
        .isNumeric().withMessage('Le champ "year" doit être composé uniquement de chiffres'),
    body('bookKind')
        .notEmpty().withMessage('Le champ title est requis.')
        .isLength({ min: 1 }).withMessage('Le champ title doit contenir au moins un caractère.'),
    body('bookAuthor')
        .notEmpty().withMessage('Le champ title est requis.')
        .isLength({ min: 1 }).withMessage('Le champ title doit contenir au moins un caractère.'),
    body('bookTitle')
        .notEmpty().withMessage('Le champ title est requis.')
        .isLength({ min: 1 }).withMessage('Le champ title doit contenir au moins un caractère.')
]

