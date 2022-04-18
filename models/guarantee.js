'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guarantee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Guarantee.belongsTo(models.Credit);
      Guarantee.hasMany(models.Property);
    }
  }
  Guarantee.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    CreditId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Guarantee',
  });
  return Guarantee;
};