const { crear_usuario, editar_usuario, eliminar_usuario, listar_usuarios, listar_doctores, buscar_usuario, cambiar_contraseña } = require('../services/dbServices')
const { login, logout, crearToken, crearRefreshToken, guardarRefreshToken, refreshAccessToken } = require('../services/authServices')

const inicioSesion = async (req, res) => {
    try {
        const { cedula, contraseña} = req.body

        if (!cedula || !contraseña) {
            return res.status(400).json({error: 'Todos los campos son obligatorios'})
        }

        const usuario = await login(cedula, contraseña)
        const token = crearToken(usuario.id_usuario)
        const refreshToken = crearRefreshToken(usuario.id_usuario)

        await guardarRefreshToken(usuario.id_usuario, refreshToken);

        res.json({
            jwt: token, 
            refresh: refreshToken,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                email: usuario.email,
                cedula: usuario.cedula,
                roles: usuario.roles
            }
        })

    } catch(error) {
        console.error(error)
        res.status(500).json({ message: 'Error al iniciar sesion' });
    }
}

const refrescarToken = async (req, res) => {
    try {
        const { refresh } = req.body;
        
        if (!refresh) {
            return res.status(400).json({ error: 'Refresh token requerido' });
        }

        const newToken = await refreshAccessToken(refresh);
        res.json({ jwt: newToken });

    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message || 'Token de refresco inválido' });
    }
};

const cierreSesion = async (req, res) => {
    try {
        const sesion = await logout(req.header('Authorization'))
        res.json({ message: 'Sesión cerrada exitosamente' });
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Error al cerrar sesion'})
    }
}

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await listar_usuarios()
        res.json(usuarios)
    } catch(error) {
        return res.status(500).json({error: `${error}`})
    }
}

const listarDoctores = async (req, res) => {
    try {
        console.log('Solicitando lista de doctores...');
        const doctores = await listar_doctores()
        console.log('Doctores encontrados:', doctores);
        res.json(doctores)
    } catch(error) {
        console.error('Error al listar doctores:', error);
        return res.status(500).json({error: `${error}`})
    }
}

const crearUsuario = async (req, res) => {
    try {
        const { nombres, apellidos, email, cedula, contraseña, roles } = req.body;


        if (!nombres || !apellidos || !email || !cedula || !contraseña || !roles) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const usuario = await crear_usuario(
            nombres,
            apellidos,
            email,
            cedula,
            contraseña,
            roles
        );

        return res.status(201).json({ 
            mensaje: 'Usuario creado', 
            usuario: usuario.id_usuario 
        });
    } catch (error) {

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ 
                error: 'Validación fallida',
                detalles: error.errors.map(e => e.message) 
            });
        }

        console.error(error)
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params
        const { nombres, apellidos, email, cedula, roles } = req.body;


        if (!nombres || !apellidos || !email || !cedula || !roles) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const usuario = await editar_usuario(id, req.body)
        res.status(200).json({mensaje: 'Usuario editado', usuario: usuario.id})
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Error al editar usuario'})
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await eliminar_usuario(id);

        if (!usuario) {
            res.status(404).json({error: 'El usuario no existe'})
        }

        res.status(200).json({mensaje: 'Usuario eliminado'})
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar usuario'})
    }
}

const buscarUsuario = async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await buscar_usuario(id)

        if (!usuario) {
            res.status(404).json({error: 'El usuario no existe'})
        }

        res.json(usuario)
    } catch (error) {
        res.status(500).json({error: 'Error al buscar usuario'})
    }
}


const cambiarContraseña = async (req, res) => {
    try {
        const { id } = req.params;
        const { contraseña_actual, nueva_contraseña } = req.body;

        if (!contraseña_actual || !nueva_contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }


        const usuarioActualizado = await cambiar_contraseña(
            id,
            contraseña_actual,
            nueva_contraseña
        );

        return res.status(200).json({ 
            mensaje: 'Contraseña actualizada correctamente',
            usuario: usuarioActualizado.id 
        });
    } catch (error) {
        if (error.message === 'El usuario no existe') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'La contraseña actual es incorrecta') {
            return res.status(400).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { listarUsuarios, listarDoctores, crearUsuario, cambiarContraseña, editarUsuario, eliminarUsuario, buscarUsuario, cambiarContraseña, inicioSesion, cierreSesion, refrescarToken }