"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Transactions",
      [
        {
          initialAmount: 0,
          endAmount: 5000000,
          date: new Date(),
          type: "Tipo 1",
          amount: 3215,
          employeeId: 1,
          cashBoxId: 1,
          accountId: 1,
          chargeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Transactions", null, {});
  },
};
