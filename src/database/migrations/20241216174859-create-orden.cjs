'use strict';

/** @type {import('sequelize-cli').Migration} */

// Migración de la tabla de ordenes
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ordenes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fecha_orden: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
      },
      estado: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        defaultValue: 'P',
      },
      observaciones: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ordenes');
  },
};
