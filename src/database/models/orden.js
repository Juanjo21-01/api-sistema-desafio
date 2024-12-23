import { Model } from 'sequelize';

// MODELO DE ORDENES
export default (sequelize, DataTypes) => {
  // Definición
  class Orden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación muchos a uno con usuarios (clientes)
      Orden.belongsTo(models.Usuario, {
        foreignKey: 'cliente_id',
        as: 'cliente',
      });

      // Relación uno a muchos con detalle de ordenes
      Orden.hasMany(models.DetalleOrden, {
        foreignKey: 'orden_id',
        as: 'detalle_ordenes',
      });

      // Relación uno a uno con responsable de ordenes
      Orden.hasOne(models.ResponsableOrden, {
        foreignKey: 'orden_id',
        as: 'responsable_ordenes',
      });
    }
  }

  // Inicialización
  Orden.init(
    {
      fecha_orden: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      estado: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: 'P',
        validate: {
          isIn: [['P', 'R', 'V']],
        },
      },
      fecha_registro: {
        type: 'DATETIME',
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Orden',
      tableName: 'ordenes',
      timestamps: false,
    }
  );

  return Orden;
};
