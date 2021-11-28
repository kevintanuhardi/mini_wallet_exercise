/* global Helpers */

const {
  walletStatusEnum,
} = require('../../helpers/enum');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'user',
  });
  User.associate = (models) => {
  };
  return User;
};
