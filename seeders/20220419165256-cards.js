'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Cards', [{
      cardNumber:'1678956784',
      nip:'1234',
      dateExpiration:'10/06/2025',
      state:'1',
      AccountId:1, 
     createdAt:'2022-04-19 09:49:46.019-06',
     updatedAt:'2022-04-19 09:49:46.019-06'


    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cards', null, {});

    
  }
};
