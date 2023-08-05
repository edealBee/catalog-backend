import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isString().isLength({ min: 5 }),
];

export const postValidation = [
  body('title', 'Название поста должно быть не менее 5 символов').isLength({ min: 5 }).isString(),
  body('text', 'Содержание поста должно быть не менее 7 символов').isLength({ min: 7 }).isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  body('category', 'Введите категорию поста правильно').optional().isString(),
];
