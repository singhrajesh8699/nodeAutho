var Sequelize = require('sequelize');

var attributes = {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  salt: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  roles:{
    type: Sequelize.ENUM,
    values: ['admin', 'client'],
    defaultValue:'client'
  },
  db_name:{
    type: Sequelize.UUID,
    allowNull: false
  },
  description:{
      type: Sequelize.TEXT,
      allowNull: true
  },
}


var options = {
  freezeTableName: true
}

module.exports.attributes = attributes;
module.exports.options = options;

