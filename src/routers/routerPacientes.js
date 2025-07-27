const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMIddleware')
const rolMIddleware = require('../middleware/rolesMiddleware')

const {
    crearPaciente,
    eliminarPaciente,
    editarPaciente,
    listarPacientes,
    buscarPaciente
} = require('../controllers/pacienteController');

router.post('/', authMiddleware, rolMIddleware('admin'), crearPaciente);
router.delete('/:id', authMiddleware, rolMIddleware('admin'), eliminarPaciente);
router.put('/:id', authMiddleware, rolMIddleware('admin'), editarPaciente);
router.get('/', authMiddleware, rolMIddleware(['admin', 'paciente']), listarPacientes);
router.get('/:cedula', authMiddleware, rolMIddleware('admin'), buscarPaciente);

module.exports = router;