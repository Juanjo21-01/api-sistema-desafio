import { Router } from 'express';
import { login, register } from '../controllers/AuthController.js';

const router = Router();

// POST - Iniciar sesión
router.post('/login', login);

// POST - Registrar usuario
router.post('/register', register);

export default router;
