require('dotenv').config();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const Token = require('../models/token')

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token requerido' });
    }

    try {
        const expiracion = await Token.findOne({ where: { token }, expiracion: { [Op.gt]: new Date() }  });
        if (expiracion) {
        return res.status(401).json({ error: 'Token inválido' });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.idusuario = decoded.idusuario;
        next();
    } catch (err) {
        console.error(err)
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = authMiddleware;