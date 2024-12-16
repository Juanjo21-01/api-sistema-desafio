import { Model } from 'sequelize';

// MODELO DE DETALLE DE COMPRA
export default (sequelize, DataTypes) => {
  // Definición
  class DetalleCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación muchos a uno con compras
      DetalleCompra.belongsTo(models.Compra, {
        foreignKey: 'compra_id',
        as: 'compra',
      });

      // Relación muchos a uno con productos
      DetalleCompra.belongsTo(models.Producto, {
        foreignKey: 'producto_id',
        as: 'producto',
      });
    }
  }

  // Inicialización
  DetalleCompra.init(
    {
      compra_id: {
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
      modelName: 'DetalleCompra',
      tableName: 'detalle_compras',
      timestamps: false,
    }
  );

  return DetalleCompra;
};
