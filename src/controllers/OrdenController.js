import db from '../database/models/index.js';

// Obtener todas las órdenes
export const obtenerOrdenes = async (req, res) => {
  try {
    // Consulta
    const ordenes = await db.Orden.findAll({
      attributes: {
        exclude: ['fecha_registro'],
      },
    });

    // Traer el nombre del cliente (usuario)
    for (const orden of ordenes) {
      const cliente = await db.Usuario.findByPk(orden.cliente_id);
      orden.cliente_id = {
        id: cliente.id,
        nombres: cliente.nombres + ' ' + cliente.apellidos,
      };
    }

    // Respuesta
    res.status(200).json(ordenes);
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener una orden por ID con su detalle
export const obtenerOrden = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const orden = await db.Orden.findByPk(id);

    // Validación
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }

    // Traer el nombre del cliente (usuario)
    const cliente = await db.Usuario.findByPk(orden.cliente_id);
    orden.cliente_id = {
      id: cliente.id,
      nombres: cliente.nombres + ' ' + cliente.apellidos,
    };

    // Consulta al detalle de órdenes
    const detalleOrden = await db.DetalleOrden.findAll({
      where: { orden_id: id },
    });

    // Traer el nombre del producto
    for (const detalle of detalleOrden) {
      const producto = await db.Producto.findByPk(detalle.producto_id);
      detalle.producto_id = {
        id: producto.id,
        nombre: producto.nombre,
      };
    }

    const ordenDetalle = {
      ...orden.toJSON(),
      detalle: detalleOrden,
    };

    // Respuesta
    res.status(200).json(ordenDetalle);
  } catch (error) {
    console.error('Error al obtener la orden:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear una orden con su detalle
export const crearOrden = async (req, res) => {
  try {
    const { fecha_orden, cliente_id, detalles } = req.body;

    // Procedimiento almacenado de la orden
    const procedimientoOrden =
      'EXEC sp_insertar_orden :fecha_orden, :cliente_id, :estado';

    // Crear la orden
    await db.sequelize.query(procedimientoOrden, {
      replacements: { fecha_orden, cliente_id, estado: 'P' },
    });

    // Obtener la orden creada
    const orden = await db.Orden.findOne({
      order: [['id', 'DESC']],
    });

    // Procedimiento almacenado de detalle de orden
    const procedimientoDetalleOrden =
      'EXEC sp_insertar_detalle_orden :orden_id, :producto_id, :cantidad, :precio_unitario';

    // Crear el detalle de la orden
    for (const detalle of detalles) {
      await db.sequelize.query(procedimientoDetalleOrden, {
        replacements: {
          orden_id: orden.id,
          producto_id: detalle.producto_id,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
        },
      });
    }

    // Respuesta
    res
      .status(201)
      .json({ mensaje: 'Orden creada correctamente', data: orden });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Cambiar el estado de una orden
export const cambiarEstadoOrden = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const orden = await db.Orden.findByPk(id);

    console.log('req.body.estado -->', req.body.estado);
    console.log('orden.estado -->', orden.estado);

    // Validaciones
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }

    // Validar el estado
    if (!['P', 'V', 'R'].includes(req.body.estado)) {
      return res
        .status(400)
        .json({ mensaje: 'Estado inválido, use "P", "V" o "R".' });
    }

    // Si el estado es igual al actual
    if (orden.estado === req.body.estado) {
      return res.status(400).json({ mensaje: 'Se debe cambiar el estado' });
    }

    // Si el estado es 'P' y el estado actual es 'V' o 'R'
    if (
      req.body.estado === 'P' &&
      (orden.estado === 'V' || orden.estado === 'R')
    ) {
      return res
        .status(400)
        .json({ mensaje: 'No se puede cambiar a pendiente una orden' });
    }

    // Procedimiento almacenado
    const procedimiento = 'EXEC sp_cambiar_estado_orden :id, :estado';

    // Cambiar estado
    await db.sequelize.query(procedimiento, {
      replacements: { id: orden.id, estado: req.body.estado },
    });

    orden.estado = req.body.estado;

    // Respuesta
    res.status(200).json(orden);
  } catch (error) {
    console.error('Error al cambiar el estado de la orden:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear el responsable de la orden
export const crearResponsableOrden = async (req, res) => {
  try {
    const { orden_id, encargado_id, observaciones } = req.body;

    // Consulta
    const orden = await db.Orden.findByPk(orden_id);
    const usuario = await db.Usuario.findByPk(encargado_id);

    // Validaciones
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Si la orden está pendiente
    if (orden.estado === 'P') {
      return res.status(400).json({
        mensaje: 'No se puede asignar un responsable a una orden pendiente',
      });
    }

    // Si la orden ya tiene un responsable asignado
    const responsableOrden = await db.ResponsableOrden.findByPk(orden_id);

    if (responsableOrden) {
      return res
        .status(400)
        .json({ mensaje: 'La orden ya tiene un responsable asignado' });
    }

    const procedimiento =
      'EXEC sp_insertar_responsable_orden :orden_id, :encargado_id , :observaciones';

    // Crear el responsable
    await db.sequelize.query(procedimiento, {
      replacements: { orden_id, encargado_id, observaciones },
    });

    // Obtener el responsable creado
    const encargado = await db.ResponsableOrden.findOne({
      where: { orden_id },
    });

    // Respuesta
    res.status(201).json({
      mensaje: 'Responsable de la orden asignado correctamente',
      data: encargado,
    });
  } catch (error) {
    console.error('Error al crear el responsable de la orden:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
