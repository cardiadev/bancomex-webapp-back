'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Charges', [{
      name: 'Reposicion de tarjeta',
      amount:120,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Charges', null, {});

   
  }
};
