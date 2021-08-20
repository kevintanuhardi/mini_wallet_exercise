const {
  exampleEnum,
} = require('../../helpers/enum');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('example', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      enum: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: exampleEnum,
      },
      string: {
        type: Sequelize.STRING,
      },
      intExample: {
        type: Sequelize.INTEGER,
        field: 'int_example',
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('example');
  },
};
