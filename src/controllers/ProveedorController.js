import db from '../database/models/index.js';

// Obtener todos los proveedores
export const obtenerProveedores = async (req, res) => {
  try {
    // Consulta
    const proveedores = await db.Proveedor.findAll({
      attributes: {
        exclude: ['fecha_registro'],
      },
    });

    // Respuesta
    res.status(200).json(proveedores);
  } catch (error) {
    console.error('Error al obtener los proveedores:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener un proveedor por ID
export const obtenerProveedor = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const proveedor = await db.Proveedor.findByPk(id);

    // Validación
    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }

    // Respuesta
    res.status(200).json(proveedor);
  } catch (error) {
    console.error('Error al obtener el proveedor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear un proveedor
export const crearProveedor = async (req, res) => {
  try {
    const { nombre, nit, direccion, telefono } = req.body;

    // Procedimiento almacenado
    const procedimiento =
      'EXEC sp_insertar_proveedor :nombre, :nit, :direccion, :telefono, :estado';

    // Crear proveedor
    await db.sequelize.query(procedimiento, {
      replacements: {
        nombre,
        nit,
        direccion,
        telefono,
        estado: 1,
      },
    });

    // Obtener el proveedor creado
    const proveedor = await db.Proveedor.findOne({
      where: { nit },
    });

    // Respuesta
    res.status(201).json(proveedor);
  } catch (error) {
    console.error('Error al crear el proveedor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar un proveedor
export const actualizarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, nit, direccion, telefono } = req.body;

    // Consulta
    const proveedor = await db.Proveedor.findByPk(id);

    // Validación
    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }

    // Actualizar
    proveedor.nombre = nombre || proveedor.nombre;
    proveedor.nit = nit || proveedor.nit;
    proveedor.direccion = direccion || proveedor.direccion;
    proveedor.telefono = telefono || proveedor.telefono;

    // Guardar cambios
    await proveedor.save();

    // Respuesta
    res.status(200).json(proveedor);
  } catch (error) {
    console.error('Error al actualizar el proveedor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar un proveedor
export const eliminarProveedor = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const proveedor = await db.Proveedor.findByPk(id);

    // Validaciones
    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }

    // Si el proveedor tiene compras
    const compras = await db.Compra.findAll({
      where: {
        proveedor_id: id,
      },
    });

    if (compras.length > 0) {
      return res.status(400).json({
        mensaje:
          'No se puede eliminar el proveedor porque tiene compras asociadas',
      });
    }

    // Eliminar
    await proveedor.destroy();

    // Respuesta
    res.status(200).json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el proveedor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Cambiar estado de un proveedor
export const cambiarEstadoProveedor = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const proveedor = await db.Proveedor.findByPk(id);

    // Validación
    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }

    // Procedimiento almacenado
    const procedimiento = 'EXEC sp_cambiar_estado_proveedor :id, :estado';

    // Cambiar estado
    await db.sequelize.query(procedimiento, {
      replacements: {
        id: proveedor.id,
        estado: req.body.estado,
      },
    });

    proveedor.estado = req.body.estado;

    // Respuesta
    res.status(200).json(proveedor);
  } catch (error) {
    console.error('Error al cambiar el estado del proveedor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
