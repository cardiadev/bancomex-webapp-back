'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Credits', [{
      applicationDate: '20/04/2021',
      approvalDate:'30/04/2021',
      requestedAmount: 80000,
      approvedAmount:60000,
      status:'Aprobado',
      debTerm:2000,
      interest:0.2,
      commission:0.3,
      ClientId:3,
      EmployeeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Credits', null, {});  
  }
};
