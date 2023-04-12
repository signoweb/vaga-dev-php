'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', { 
      codigo_pedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      valor_pedido: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      data_pedido: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      status_pedido: {
        type: Sequelize.STRING(9),
        allowNull: false,
        defaultValue: 'Aberto'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
