import { Router } from 'express';
import { getUsers, register, login } from './authController.js';
import { registerValidation } from '../validations/validations.js';
import checkAuth from '../checkAuth.js';
import handleValidationErrors from './../validations/handleValidationErrors.js';

const router = new Router();

router.post('/register', registerValidation, handleValidationErrors, register);

router.post('/login', registerValidation, login);

router.get('/admin/checkUsers', checkAuth, getUsers);

export default router;
