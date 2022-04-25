"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let datos = {
      totalStart: 1000,
      totalEnd: 3000,
    }
    await queryInterface.bulkInsert(
      "CashCutOffs",
      [
        {
          totalStart: datos.totalStart,
          totalEnd: datos.totalEnd,
          differences: datos.totalEnd - datos.totalStart,
          date: new Date(),
          CashBoxId: 2,
          EmployeeId:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CashCutOffs", null, {});
  },
};
