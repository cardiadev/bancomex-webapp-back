'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CashCutOff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CashCutOff.belongsTo(models.CashBox);
      CashCutOff.belongsTo(models.Employee);
    }
  }
  CashCutOff.init({
    totalStart: DataTypes.DECIMAL,
    totalEnd: DataTypes.DECIMAL,
    differences: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    CashBoxId: DataTypes.INTEGER,
    EmployeeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CashCutOff',
  });
  return CashCutOff;
};