'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Employees', [{
      firstName: 'Juan',
      lastName:'Hernandez',
      code:'123',
      password:'1234',
      status:'Activo',
      role:'Cajero',
      BusinessUnitId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Employees', null, {});
   
  }
};
