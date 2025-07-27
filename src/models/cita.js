const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cita = sequelize.define('Cita', {
    id_citas: {
        type: DataTypes.INTEGER,
        field: 'id_citas',
        primaryKey: true,
        autoIncrement: true
    },
    id_doctor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME
    },
    es_activa: {
        type: DataTypes.ENUM('activa', 'terminada')
    }
}, {
    tableName: 'citas',
    timestamps: false,
    underscored: false
})

module.exports = Cita