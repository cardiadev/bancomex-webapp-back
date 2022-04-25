'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CashCutOffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalStart: {
        type: Sequelize.DECIMAL
      },
      totalEnd: {
        type: Sequelize.DECIMAL
      },
      differences: {
        type: Sequelize.DECIMAL
      },
      date: {
        type: Sequelize.DATE
      },
      cashBoxId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CashBoxes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CashCutOffs');
  }
};