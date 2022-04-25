'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Employee);
      Transaction.belongsTo(models.CashBox);
      Transaction.belongsTo(models.Account);
      Transaction.belongsTo(models.Charge);
    }
  }
  Transaction.init({
    initialAmount: DataTypes.DOUBLE,
    endAmount: DataTypes.DOUBLE,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    employeeId: DataTypes.INTEGER,
    cashBoxId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    chargeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};