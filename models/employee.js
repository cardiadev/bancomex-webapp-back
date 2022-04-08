'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.BusinessUnit)
      Employee.hasMany(models.CashCutOff);
      Employee.hasMany(models.Client);
      Employee.hasMany(models.Transaction);
    }
  }
  Employee.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    code: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    role: DataTypes.ENUM({
      values: ['Cajero', 'Ejecutivo', 'Gerente']
    }),
    BusinessUnitId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};