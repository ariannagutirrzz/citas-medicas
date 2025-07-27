const express = require('express');
const router = express.Router();
const rolMIddleware = require('../middleware/rolesMiddleware')
const authMiddleware = require('../middleware/authMIddleware')

const {
    crearRegistro,
    eliminarRegistro,
    editarRegistro,
    listarRegistros,
    buscarRegistrosPaciente
} = require('../controllers/registroController');

router.post('/', authMiddleware, rolMIddleware(['admin', 'doctor']), crearRegistro);
router.delete('/:id_registro', authMiddleware, rolMIddleware(['admin', 'doctor']), eliminarRegistro);
router.put('/:id_registro', authMiddleware, rolMIddleware(['admin', 'doctor']), editarRegistro);
router.get('/', authMiddleware, rolMIddleware('admin'), listarRegistros);
router.get('/:id_paciente', authMiddleware, rolMIddleware(['admin', 'doctor']), buscarRegistrosPaciente);

module.exports = router;