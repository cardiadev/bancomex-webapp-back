'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Beneficiaries', [{
      relation:'Hermano',
      porcentage:'100%',
      birthDate:'11/09/1998',
      phone:'33257890',
      email:'alguien@gmail.com',
      AccountId:4,
      createdAt:'2022-04-19 09:49:46.019-06',
      updatedAt:'2022-04-19 09:49:46.019-06'
     }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Beneficiaries', null, {});
  
  }
};
