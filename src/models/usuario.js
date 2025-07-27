const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
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
    contraseña: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    roles: {
        type: DataTypes.ENUM('admin', 'doctor'),
        allowNull: false,
        defaultValue: 'doctor'
    }
}, {
    tableName: 'usuarios',
    timestamps: false,
    underscored: false
});


Usuario.beforeCreate(async (usuario) => {
    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);
});

module.exports = Usuario;
