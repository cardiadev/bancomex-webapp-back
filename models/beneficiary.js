'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beneficiary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Beneficiary.belongsTo(models.Account);
    }
  }
  Beneficiary.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    relation: DataTypes.STRING,
    porcentage: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    accountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Beneficiary',
  });
  return Beneficiary;
};