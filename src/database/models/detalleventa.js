import { Model } from 'sequelize';

// MODELO DE DETALLE DE VENTAS
export default (sequelize, DataTypes) => {
  // Definición
  class DetalleVenta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación muchos a uno con ventas
      DetalleVenta.belongsTo(models.Venta, {
        foreignKey: 'venta_id',
        as: 'venta',
      });

      // Relación muchos a uno con productos
      DetalleVenta.belongsTo(models.Producto, {
        foreignKey: 'producto_id',
        as: 'producto',
      });
    }
  }

  // Inicialización
  DetalleVenta.init(
    {
      venta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'DetalleVenta',
      tableName: 'detalle_ventas',
      timestamps: false,
    }
  );

  return DetalleVenta;
};
