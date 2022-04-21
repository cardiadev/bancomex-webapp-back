'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Branches', [{
      initialAmount:50000,
      endAmount:40000,
      date:'10/04/2021',
      type:'Retiro',
      amount:10000,
      EmployeeId:1,
      CashBoxId:1,
      AccountId:1
      ChargeId:
      createdAt:'2022-04-19 09:49:46.019-06',
      updatedAt:'2022-04-19 09:49:46.019-06'


     }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Branches', null, {});
   
  }
};
