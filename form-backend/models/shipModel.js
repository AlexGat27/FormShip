const {Sequelize} = require('sequelize');
const sequelize = require('./db');

const ShipModel = sequelize.define('ship', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    validate: {
      min: 1 // Минимальное значение id
    }
  },
  shipSystem: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(500),
    allowNull: false,
  }
});

sequelize.sync()
  .then(() => {
    console.log('Модель синхронизирована с базой данных');
  });

module.exports = ShipModel;