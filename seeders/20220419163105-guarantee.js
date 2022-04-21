'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Guarantees', [{
      name:'Maria',
      lastName:'Ochoa',
      address:'Valle Real 345',
      phone:'3356897',
      CreditId:4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Guarantees', null, {});  
  }
};
