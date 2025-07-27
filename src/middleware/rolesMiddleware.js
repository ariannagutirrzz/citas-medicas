const Usuario = require('../models/usuario');

const rolMIddleware = (requiredRoles) => {
    return async (req, res, next) => {
        try {
            const usuario = await Usuario.findByPk(req.idusuario);
            
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const allowedRoles = Array.isArray(requiredRoles) 
                ? requiredRoles 
                : [requiredRoles];

            if (!allowedRoles.includes(usuario.roles)) {
                return res.status(403).json({ 
                    error: `Acceso no autorizado. Rol requerido: ${allowedRoles.join(' o ')}`,
                    yourRole: usuario.roles
                });
            }

            req.userData = {
                id: usuario.id_usuario,
                role: usuario.roles,
                email: usuario.email
            };

            next();
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error al verificar rol' });
        }
    };
};

module.exports = rolMIddleware;