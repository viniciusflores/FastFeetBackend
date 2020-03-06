module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable(
          'recipients',
          {
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
            },
            name: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
            },
            adress: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            number: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            complement: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            district: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            city: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            zip_code: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            created_at: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            updated_at: {
              type: Sequelize.DATE,
              allowNull: false,
            },
          },
          { transaction: t }
        ),

        queryInterface.createTable(
          'users',
          {
            id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
            },
            name: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
            },
            email: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
            },
            password_hash: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            created_at: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            updated_at: {
              type: Sequelize.DATE,
              allowNull: false,
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: async queryInterface => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('recipient', { transaction: t }),
        queryInterface.dropTable('users', { transaction: t }),
      ]);
    });
  },
};
