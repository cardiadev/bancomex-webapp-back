'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Client);
      Account.hasMany(models.Beneficiary);
      Account.hasMany(models.Card);
      Account.hasMany(models.Transaction);
    }
  }
  Account.init({
    type: DataTypes.STRING,
    dateCreate: DataTypes.DATE,
    amount: DataTypes.DOUBLE,
    state: DataTypes.BOOLEAN,
    clientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};