import { Model } from 'sequelize';

// MODELO DE RESPONSABLE DE ORDENES
export default (sequelize, DataTypes) => {
  // Definición
  class ResponsableOrden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación uno a uno con ordenes
      ResponsableOrden.belongsTo(models.Orden, {
        foreignKey: 'orden_id',
        as: 'orden',
      });

      // Relación muchos a uno con usuarios (encargados)
      ResponsableOrden.belongsTo(models.Usuario, {
        foreignKey: 'encargado_id',
        as: 'encargado',
      });
    }
  }

  // Inicialización
  ResponsableOrden.init(
    {
      orden_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'ordenes',
          key: 'id',
        },
      },
      encargado_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      observaciones: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      fecha_registro: {
        type: 'DATETIME',
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ResponsableOrden',
      tableName: 'responsable_ordenes',
      timestamps: false,
    }
  );

  return ResponsableOrden;
};
