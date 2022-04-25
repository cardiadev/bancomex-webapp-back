'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DenominationCashCutOffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      denomination: {
        type: Sequelize.ENUM({
          values: ['B1000', 'B500', 'B200', 'B100', 'B50','B20','M10','M5','M2','M1', 'M50C']
        })
      },
      CashCutOffId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CashCutOffs',
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
    await queryInterface.dropTable('DenominationCashCutOffs');
  }
};