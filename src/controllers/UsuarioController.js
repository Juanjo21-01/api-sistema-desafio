import db from '../database/models/index.js';
import bcrypt from 'bcryptjs';

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    // Consulta
    const usuarios = await db.Usuario.findAll({
      attributes: {
        exclude: ['password', 'fecha_nacimiento', 'fecha_registro'],
      },
    });

    // Respuesta
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener un usuario por ID
export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const usuario = await db.Usuario.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    // Validación
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Respuesta
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombres,
      apellidos,
      email,
      password,
      direccion,
      telefono,
      fecha_nacimiento,
      rol_id,
    } = req.body;

    // Consulta
    const usuario = await db.Usuario.findByPk(id);

    // Validación
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualizar
    usuario.nombres = nombres || usuario.nombres;
    usuario.apellidos = apellidos || usuario.apellidos;
    usuario.email = email || usuario.email;
    if (password) {
      usuario.password = bcrypt.hashSync(password, 10);
    }
    usuario.direccion = direccion || usuario.direccion;
    usuario.telefono = telefono || usuario.telefono;
    usuario.fecha_nacimiento = fecha_nacimiento || usuario.fecha_nacimiento;
    usuario.rol_id = rol_id || usuario.rol_id;

    await usuario.save();

    // Respuesta
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const usuario = await db.Usuario.findByPk(id);

    // Validaciones
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (usuario.id === 1) {
      return res
        .status(400)
        .json({ mensaje: 'No se puede eliminar el usuario administrador' });
    }

    // Eliminar
    await usuario.destroy();

    // Respuesta
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Cambiar estado de un usuario
export const cambiarEstadoUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const usuario = await db.Usuario.findByPk(id);

    // Validaciones
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (usuario.id === 1) {
      return res.status(400).json({
        mensaje: 'No se puede cambiar el estado del usuario administrador',
      });
    }

    // Cambiar estado
    usuario.estado = req.body.estado;
    await usuario.save();

    // Respuesta
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al cambiar el estado del usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
