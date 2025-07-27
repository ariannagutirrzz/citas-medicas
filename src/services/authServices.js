require('dotenv').config();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const Token = require('../models/token')

const crearToken = (id) => {
    const accessToken = jwt.sign({ idusuario: id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
    console.log(id)
    return accessToken
}

const crearRefreshToken = (id) => {
    const refreshToken = jwt.sign({ idusuario: id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
    return refreshToken
}

const guardarRefreshToken = async (userId, token) => {
    await Token.create({
        token: token,
        tipos: 'refresh',
        expiracion: new Date(Date.now() + 24 * 60 * 60 * 1000),
        usuario_id: userId,
    });
};

const refreshAccessToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const tokenValido = await Token.findOne({
            where: {
                token: refreshToken.trim(),
                expiracion: { [Op.gt]: new Date() },
                usuario_id: decoded.idusuario,
            }
        });

        console.log(tokenValido)
        if (!tokenValido) throw new Error('Refresh token inválido');

        return crearToken(decoded.idusuario);
    } catch (error) {
        throw new Error('Token de refresco inválido');
    }
};

const login = async(cedula, contraseña) => {
    const usuario = await Usuario.findOne({ where: { cedula }, attributes: ['id_usuario', 'cedula', 'contraseña', 'nombres', 'email', 'roles']});
    if (!usuario) {
        throw new Error('Credenciales invalidas')
    }

    const validar = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!validar) {
        throw new Error('Credenciales invalidas')
    }

    return usuario

}

const logout = async (header) => {
    const authHeader = header
    const token = authHeader?.replace('Bearer ', '');
        
    if (!token) {
        throw new Error('Token no encontrado')
    }


    const decoded = jwt.decode(token);
        

    return await Token.create({
        token,
        tipos: 'jwt',
        expiracion: new Date(decoded.exp * 1000)
    });
}

module.exports = { login, logout, crearRefreshToken, crearToken, guardarRefreshToken, refreshAccessToken }