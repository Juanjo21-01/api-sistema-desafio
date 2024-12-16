import { Model } from 'sequelize';

// MODELO DE COMPRAS
export default (sequelize, DataTypes) => {
  // Definición
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación muchos a uno con proveedores
      Compra.belongsTo(models.Proveedor, {
        foreignKey: 'proveedor_id',
        as: 'proveedor',
      });

      // Relación muchos a uno con usuarios 
      Compra.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario',
      });

      // Relación uno a muchos con detalle de compras
      Compra.hasMany(models.DetalleCompra, {
        foreignKey: 'compra_id',
        as: 'detalle_compras',
      });
    }
  }

  // Inicialización
  Compra.init(
    {
      fecha_compra: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      observaciones: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      proveedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Compra',
      tableName: 'compras',
      timestamps: false,
    }
  );

  return Compra;
};
