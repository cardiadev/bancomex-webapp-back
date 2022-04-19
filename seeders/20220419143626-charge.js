'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Charges', [{
     name: 'Tarjeta',
     amount: 1000,
     createdAt: "2022-04-19 09:49:46.019-06",
     updatedAt: "2022-04-19 09:49:46.019-06"
     }], {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Charges', null, {});
    
  }
};
