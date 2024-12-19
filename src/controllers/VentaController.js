import db from '../database/models/index.js';

// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
  try {
    // Consulta
    const ventas = await db.Venta.findAll({
      attributes: {
        exclude: ['observaciones', 'fecha_registro'],
      },
    });

    // Traer el nombre del usuario
    for (const venta of ventas) {
      const usuario = await db.Usuario.findByPk(venta.usuario_id);
      venta.usuario_id = {
        id: usuario.id,
        nombres: usuario.nombres + ' ' + usuario.apellidos,
      };
    }

    // Respuesta
    res.status(200).json(ventas);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener una venta por ID con su detalle
export const obtenerVenta = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const venta = await db.Venta.findByPk(id);

    // Validación
    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    // Traer el nombre del usuario
    const usuario = await db.Usuario.findByPk(venta.usuario_id);
    venta.usuario_id = {
      id: usuario.id,
      nombres: usuario.nombres + ' ' + usuario.apellidos,
    };

    // Consulta al detalle de ventas
    const detalleVenta = await db.DetalleVenta.findAll({
      where: { venta_id: id },
    });

    // Traer el nombre del producto
    for (const detalle of detalleVenta) {
      const producto = await db.Producto.findByPk(detalle.producto_id);
      detalle.producto_id = {
        id: producto.id,
        nombre: producto.nombre,
      };
    }

    const ventaDetalle = {
      ...venta.toJSON(),
      detalle: detalleVenta,
    };

    // Respuesta
    res.status(200).json(ventaDetalle);
  } catch (error) {
    console.error('Error al obtener la venta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear una venta con su detalle
export const crearVenta = async (req, res) => {
  try {
    const { fecha_venta, observaciones, usuario_id, detalles } = req.body;

    console.log(fecha_venta, observaciones, usuario_id, detalles);

    // Procedimiento almacenado de venta
    const procedimientoVenta =
      'EXEC sp_insertar_venta :fecha_venta, :estado, :observaciones, :usuario_id';

    // Crear venta
    await db.sequelize.query(procedimientoVenta, {
      replacements: { fecha_venta, estado: 1, observaciones, usuario_id },
    });

    // Obtener la venta creada
    const venta = await db.Venta.findOne({
      order: [['id', 'DESC']],
    });

    // Procedimiento almacenado de detalle de venta
    const procedimientoDetalleVenta =
      'EXEC sp_insertar_detalle_venta :venta_id, :producto_id, :cantidad, :precio_unitario';

    // Crear detalle de venta
    for (const detalle of detalles) {
      await db.sequelize.query(procedimientoDetalleVenta, {
        replacements: {
          venta_id: venta.id,
          producto_id: detalle.producto_id,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
        },
      });
    }

    // Respuesta
    res
      .status(201)
      .json({ mensaje: 'Venta creada correctamente', data: venta });
  } catch (error) {
    console.error('Error al crear la venta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Cambiar estado de una venta
export const cambiarEstadoVenta = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const venta = await db.Venta.findByPk(id);

    // Validación
    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    // Procedimiento almacenado
    const procedimiento = 'EXEC sp_cambiar_estado_venta :id, :estado';

    // Cambiar estado
    await db.sequelize.query(procedimiento, {
      replacements: { id: venta.id, estado: req.body.estado },
    });

    venta.estado = req.body.estado;

    // Respuesta
    res.status(200).json(venta);
  } catch (error) {
    console.error('Error al cambiar el estado de la venta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
