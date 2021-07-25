const sequelize = require('sequelize');
module.exports = new sequelize('backend_cc', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    operatorAliases: false,
    dialectOptions: {
        timezone: process.env.DB_TIMEZONE,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 20000
    },
    // logging: process.env.SEQUELIZE_QRY_LOG
});