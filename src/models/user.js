'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
const {Salt} = require('../config/serverConfig')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, { through: 'User_Roles' });
    }
  }
  user.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    userId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,100]
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  user.beforeCreate((data)=>{
    data.password = bcrypt.hashSync(data.password,Salt)
  })
  return user;
};