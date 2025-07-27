const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Registro = sequelize.define('Regsitro', {
    id_registro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
    diagnosis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tratamiento: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'registro_medico',
    timestamps: false,
    underscored: false
})

module.exports = Registro