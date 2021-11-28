const {
  walletStatusEnum,
} = require('../../helpers/enum');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wallet', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      owner_id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      status: {
        defaultValue: walletStatusEnum.DISABLED,
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.values(walletStatusEnum),
      },
      enabled_at: {
        type: Sequelize.DATE,
      },
      balance: {
        type: Sequelize.DECIMAL(20, 2),
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('wallet');
  },
};
