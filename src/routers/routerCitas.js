const express = require('express');
const router = express.Router();
const rolMIddleware = require('../middleware/rolesMiddleware')
const authMiddleware = require('../middleware/authMIddleware')

const {
    crearCita,
    eliminarCita,
    editarCita,
    listarCitas,
    buscarCitasPaciente,
    buscarCitasDoctor
} = require('../controllers/citaController');

router.post('/', authMiddleware, rolMIddleware('admin'), crearCita);
router.delete('/:id_citas', authMiddleware, rolMIddleware('admin'), eliminarCita);
router.put('/:id_citas', authMiddleware, rolMIddleware('admin'), editarCita);
router.get('/', authMiddleware, rolMIddleware(['admin', 'doctor', 'paciente']), listarCitas);
router.get('/buscar_por_paciente/:id_paciente', rolMIddleware('admin'), authMiddleware, buscarCitasPaciente);
router.get('/buscar_por_doctor/:id_doctor', authMiddleware, rolMIddleware(['admin', 'doctor']), buscarCitasDoctor);

module.exports = router;