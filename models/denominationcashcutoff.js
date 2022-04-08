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
      DenominationCashCutOff.belongsTo(models.Denomination);
      DenominationCashCutOff.belongsTo(models.CashCutOff);
    }
  }
  DenominationCashCutOff.init({
    cantidad: DataTypes.INTEGER,
    CashCutOffId: DataTypes.INTEGER,
    DenominationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DenominationCashCutOff',
  });
  return DenominationCashCutOff;
};