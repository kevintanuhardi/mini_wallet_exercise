/* global Helpers */

const {
  mutationTypeEnum,
} = require('../../helpers/enum');

module.exports = (sequelize, DataTypes) => {
  const Mutation = sequelize.define('Mutation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    walletId: {
      field: 'wallet_id',
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    referenceId: {
      field: 'reference_id',
      allowNull: false,
      type: DataTypes.UUID,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 2),
      defaultValue: 0,
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: Object.values(mutationTypeEnum),
    },
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'mutation',
    updatedAt: false,
  });
  Mutation.associate = (models) => {
  };
  return Mutation;
};
