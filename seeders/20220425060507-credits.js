"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Credits",
      [
        {
          applicationDate: new Date(),
          approvalDate: new Date(),
          requestedAmount: 500000,
          approvedAmount: 356000,
          status: "Aprobado",
          debTerm: 1,
          interest: 5.6,
          commission: 1.4,
          clientId: 1,
          employeeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          applicationDate: new Date(),
          approvalDate: new Date(),
          requestedAmount: 245000,
          approvedAmount: 310500,
          status: "Rechazado",
          debTerm: 1,
          interest: 10.9,
          commission: 5.2,
          clientId: 2,
          employeeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          applicationDate: new Date(),
          approvalDate: new Date(),
          requestedAmount: 1200000,
          approvedAmount: 980000,
          status: "Aprobado",
          debTerm: 1,
          interest: 10,
          commission: 2.5,
          clientId: 3,
          employeeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Credits", null, {});
  },
};
