'use strict';

/** @type {import('sequelize-cli').Migration} */

// Migración de la tabla de responsable de ordenes
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('responsable_ordenes', {
      orden_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'ordenes',
          key: 'id',
        },
      },
      encargado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
      },
      observaciones: {
        type: Sequelize.STRING(200),
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
    await queryInterface.dropTable('responsable_ordenes');
  },
};
