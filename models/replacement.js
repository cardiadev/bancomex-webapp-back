'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Replacement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Replacement.belongsTo(models.Card);
    }
  }
  Replacement.init({
    date: DataTypes.DATE,
    newCardNumber: DataTypes.BIGINT,
    reason: DataTypes.STRING,
    CardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Replacement',
  });
  return Replacement;
};