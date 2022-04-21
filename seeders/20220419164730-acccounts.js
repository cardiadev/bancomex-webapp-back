'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Accounts', [{
      type:'Credito',
      dateCreate:'24/03/2021',
      amount:100000,
      state:'1',
      ClientId:4,
      createdAt:'2022-04-19 09:49:46.019-06',
      updatedAt:'2022-04-19 09:49:46.019-06'
  
  
      }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Accounts', null, {});

   
  }
};
