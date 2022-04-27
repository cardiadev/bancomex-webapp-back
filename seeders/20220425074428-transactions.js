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
          EmployeeId: 1,
          CashBoxId: 1,
          AccountId: 1,
          ChargeId: 1,
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
