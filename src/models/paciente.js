const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Paciente = sequelize.define('Paciente', {
    id_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(70),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    cedula: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    historia_medica: {
        type: DataTypes.TEXT(),
        allowNull: true
    }
}, {
    tableName: 'pacientes',
    timestamps: false,
    underscored: false
})

module.exports = Paciente