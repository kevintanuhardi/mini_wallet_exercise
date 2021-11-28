/* global Helpers */

const {
  walletStatusEnum,
} = require('../../helpers/enum');

module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    ownerId: {
      field: 'owner_id',
      allowNull: false,
      type: DataTypes.UUID,
    },
    status: {
      allowNull: false,
      defaultValue: walletStatusEnum.DISABLED,
      type: DataTypes.ENUM,
      values: Object.values(walletStatusEnum),
    },
    enabledAt: {
      field: 'enabled_at',
      type: DataTypes.DATE,
    },
    balance: {
      type: DataTypes.DECIMAL(20, 2),
      defaultValue: 0,
    },
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'wallet',
  });
  Wallet.associate = (models) => {
  };
  return Wallet;
};
