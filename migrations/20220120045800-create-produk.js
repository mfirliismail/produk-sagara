'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'Users'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      name: {
        type: Sequelize.STRING
      },
      imageProduk: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produks');
  }
};