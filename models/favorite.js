'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  favorite.init({
    userId: DataTypes.INTEGER,
    articletId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    byline: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'favorite',
  });
  return favorite;
};