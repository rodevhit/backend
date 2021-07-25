const Sequelize = require('sequelize');
const db = require('../config/db');

const formData = db.define('form_data', {
    // form_datas
    form_data_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    form_data_value: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    // options
    timestamps: false,
    freezeTableName: true,
});

module.exports = formData