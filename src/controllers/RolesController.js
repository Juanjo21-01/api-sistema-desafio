import db from '../database/models/index.js';

// Obtener todos los roles
export const obtenerRoles = async (req, res) => {
  try {
    // Consulta
    const roles = await db.Role.findAll();

    // Respuesta
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener un rol por ID
export const obtenerRol = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const rol = await db.Role.findByPk(id);

    // Validación
    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    // Respuesta
    res.status(200).json(rol);
  } catch (error) {
    console.error('Error al obtener el rol:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
