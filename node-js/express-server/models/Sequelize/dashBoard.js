var Sequelize = require('sequelize');

var attributes = {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fileName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  source: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  destination: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}

var options = {
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options