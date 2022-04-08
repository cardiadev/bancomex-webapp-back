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
      differemces: {
        type: Sequelize.DECIMAL
      },
      date: {
        type: Sequelize.DATE
      },
      CashBoxId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CashBoxes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      EmployeeId: {
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