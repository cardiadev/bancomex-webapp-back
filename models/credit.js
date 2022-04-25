'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Credit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Credit.belongsTo(models.Client);
      Credit.belongsTo(models.Employee);
      Credit.hasMany(models.Guarantee);
    }
  }
  Credit.init({
    applicationDate: DataTypes.DATE,
    approvalDate: DataTypes.DATE,
    requestedAmount: DataTypes.DOUBLE,
    approvedAmount: DataTypes.DOUBLE,
    status: DataTypes.STRING,
    debTerm: DataTypes.INTEGER,
    interest: DataTypes.DOUBLE,
    commission: DataTypes.DOUBLE,
    ClientId: DataTypes.INTEGER,
    EmployeeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Credit',
  });
  return Credit;
};