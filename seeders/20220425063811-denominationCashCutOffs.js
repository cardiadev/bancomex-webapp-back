"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "DenominationCashCutOffs",
      [
        {
          amount: 25,
          denomination:"B500",
          cashCutOffId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 134,
          denomination:"B200",
          cashCutOffId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 56,
          denomination:"B100",
          cashCutOffId: 1,
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
