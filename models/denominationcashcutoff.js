'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DenominationCashCutOff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //DenominationCashCutOff.belongsTo(models.Denomination);
      DenominationCashCutOff.belongsTo(models.CashCutOff);
    }
  }
  DenominationCashCutOff.init({
    cantidad: DataTypes.INTEGER,
    denomination: DataTypes.ENUM({
      values: ['B1000', 'B500', 'B200', 'B100', 'B50','B20','M10','M5','M2','M1', 'M50C']
    }),
    CashCutOffId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'DenominationCashCutOff',
  });
  return DenominationCashCutOff;
};