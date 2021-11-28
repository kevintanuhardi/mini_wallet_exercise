const {
  mutationTypeEnum,
} = require('../../helpers/enum');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mutation', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      wallet_id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      reference_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      amount: {
        type: Sequelize.DECIMAL(20, 2),
        defaultValue: 0,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.values(mutationTypeEnum),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('mutation');
  },
};
