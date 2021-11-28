/* global Helpers */

const {
  exampleEnum,
} = require('../../helpers/enum');

module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define('Example', {
    enum: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: exampleEnum,
      validate: {
        isIn: {
          args: [exampleEnum],
          msg: `Urgency must be betweeen ${exampleEnum.join(
            ', ',
          )}`,
        },
      },
    },
    string: {
      type: DataTypes.STRING,
    },
    int: {
      type: DataTypes.INTEGER,
      field: 'price',
    },
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'example',
  });
  Example.associate = (models) => {
    // Example.hasOne(models.Example2, { sourceKey: 'id', foreignKey: 'ex2Id', as: 'example2' });
  };
  return Example;
};
