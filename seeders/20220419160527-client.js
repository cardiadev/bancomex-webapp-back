'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clients', [{
      name: 'Jose',
      lastName:'Pérez',
      gender:'1',
      intNumber:'234',
      extNumber:'234',
      suburb:'Loma Linda',
      zipcode:'45123',
      city:'Zapopan',
      state:'Jalisco',
      phone:'244577899',
      curp:'LDR566T4408',
      rfc:'JP06',
      ine:'jp096467t',
      email:'jose@gmail.com',
      active:'1',
      BranchId:2,
      EmployeeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Clients', null, {});

   
  }
};
