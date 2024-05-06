'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the data to be inserted
    const monthsData = [
      { month: 'January', createdAt: new Date(), updatedAt: new Date() },
      { month: 'February', createdAt: new Date(), updatedAt: new Date() },
      { month: 'March', createdAt: new Date(), updatedAt: new Date() },
      { month: 'April', createdAt: new Date(), updatedAt: new Date() },
      { month: 'May', createdAt: new Date(), updatedAt: new Date() },
      { month: 'June', createdAt: new Date(), updatedAt: new Date() },
      { month: 'July', createdAt: new Date(), updatedAt: new Date() },
      { month: 'August', createdAt: new Date(), updatedAt: new Date() },
      { month: 'September', createdAt: new Date(), updatedAt: new Date() },
      { month: 'October', createdAt: new Date(), updatedAt: new Date() },
      { month: 'November', createdAt: new Date(), updatedAt: new Date() },
      { month: 'December', createdAt: new Date(), updatedAt: new Date() }
    ];

    // Insert the data into the Month table
    await queryInterface.bulkInsert('Month', monthsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data if migration is rolled back
    await queryInterface.bulkDelete('Month', null, {});
  }
};
