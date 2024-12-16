import { Model } from 'sequelize';

// MODELO DE DETALLE DE ORDENES
export default (sequelize, DataTypes) => {
  // Definición
  class DetalleOrden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación muchos a uno con ordenes
      DetalleOrden.belongsTo(models.Orden, {
        foreignKey: 'orden_id',
        as: 'orden',
      });

      // Relación muchos a uno con productos
      DetalleOrden.belongsTo(models.Producto, {
        foreignKey: 'producto_id',
        as: 'producto',
      });
    }
  }

  // Inicialización
  DetalleOrden.init(
    {
      orden_id: {
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
        validate: {
          min: 1,
        },
      },
      precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
    },
    {
      sequelize,
      modelName: 'DetalleOrden',
      tableName: 'detalle_ordenes',
      timestamps: false,
    }
  );

  return DetalleOrden;
};
