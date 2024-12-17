import { Router } from 'express';
import {
  actualizarUsuario,
  cambiarEstadoUsuario,
  eliminarUsuario,
  obtenerUsuario,
  obtenerUsuarios,
} from '../controllers/UsuarioController.js';

const router = Router();

// GET - Obtener todos los usuarios
router.get('/usuarios', obtenerUsuarios);

// GET - Obtener un usuario por ID
router.get('/usuarios/:id', obtenerUsuario);

// PUT - Actualizar un usuario
router.put('/usuarios/:id', actualizarUsuario);

// PATCH - Actualizar estado de un usuario
router.patch('/usuarios/cambiarEstado/:id', cambiarEstadoUsuario);

// DELETE - Eliminar un usuario
router.delete('/usuarios/:id', eliminarUsuario);

export default router;
