'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Expenses', {
      expense_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      month_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Month',
          key: 'month_id'
        }
      },
      budget_criteria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Budgets',
          key: 'budget_id'
        }
      },
      spent_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Expenses');
  }
};
