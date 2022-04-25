"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "DenominationCashCutOffs",
      [
        {
          amount: 25,
          cashCutOffId:1,
          denominationId:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 134,
          cashCutOffId:1,
          denominationId:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 56,
          cashCutOffId:1,
          denominationId:3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DenominationCashCutOffs", null, {});
  },
};
