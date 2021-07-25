const Sequelize = require('sequelize');
const db = require('../config/db');

const attribute = db.define('attribute', {
    // attributes
    attribute_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    attribute_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    attribute_value: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    attribute_status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '0=>Inactive, 1=>Active'
    },
}, {
    // options
    timestamps: false,
    freezeTableName: true,
});

module.exports = attribute