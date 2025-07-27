const express = require('express')
const { listarUsuarios, listarDoctores, crearUsuario, editarUsuario, eliminarUsuario, buscarUsuario, cambiarContraseña, inicioSesion, cierreSesion, refrescarToken } = require('../controllers/usuarioController')
const authMiddleware = require('../middleware/authMIddleware')
const rolMIddleware = require('../middleware/rolesMiddleware')

const router = express.Router();

router.post('/inicio_sesion', inicioSesion)
router.post('/refresh', refrescarToken)
router.post('/cierre_sesion', authMiddleware, cierreSesion)
router.get('/', authMiddleware, rolMIddleware('admin'), listarUsuarios)
router.get('/doctores', authMiddleware, rolMIddleware(['admin', 'doctor', 'paciente']), listarDoctores)
router.post('/', crearUsuario)
router.put('/:id', authMiddleware, rolMIddleware(['admin', 'doctor']), editarUsuario)
router.patch('/:id', authMiddleware, rolMIddleware(['admin', 'doctor']), cambiarContraseña)
router.delete('/:id', authMiddleware, rolMIddleware('admin'), eliminarUsuario)
router.get('/:id', authMiddleware, rolMIddleware('admin'), buscarUsuario)

module.exports = router
