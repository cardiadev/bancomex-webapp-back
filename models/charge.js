'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Charge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Charge.hasMany(models.Transaction);
    }
  }
  Charge.init({
    name: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    active: DataTypes.BOOLEAN,
    type: DataTypes.ENUM({
      values: ['amount', 'percentage']
    }),
  }, {
    sequelize,
    modelName: 'Charge',
  });
  return Charge;
};