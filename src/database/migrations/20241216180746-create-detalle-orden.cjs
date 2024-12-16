'use strict';

/** @type {import('sequelize-cli').Migration} */

// Migración de la tabla de detalle de ordenes
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detalle_ordenes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orden_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ordenes',
          key: 'id',
        },
      },
      producto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'productos',
          key: 'id',
        },
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      precio_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('detalle_ordenes');
  },
};
