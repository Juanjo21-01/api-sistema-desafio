'use strict';

/** @type {import('sequelize-cli').Migration} */

// Migración de la tabla de productos
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      tipo_producto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipo_productos',
          key: 'id',
        },
      },
      marca: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      codigo: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      precio_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
      },
      foto: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      fecha_registro: {
        type: 'DATETIME',
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('GETDATE()'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('productos');
  },
};
