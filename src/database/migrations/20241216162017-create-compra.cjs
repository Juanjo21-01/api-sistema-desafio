'use strict';

/** @type {import('sequelize-cli').Migration} */

// Migración de la tabla de compras
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fecha_compra: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      observaciones: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      proveedor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'proveedores',
          key: 'id',
        },
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
      },
      fecha_registro: {
        type: 'DATETIME',
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('GETDATE()'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('compras');
  },
};
