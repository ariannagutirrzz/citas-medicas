const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Token = sequelize.define('Token', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    tipos: {
        type: DataTypes.ENUM('access', 'refresh'),
        allowNull: false
    },
    expiracion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
    
    }, {
    tableName: 'tokens_expirados',
    timestamps: false,
    underscored: true
});

module.exports = Token;