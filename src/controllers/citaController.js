const { crear_cita, eliminar_cita, editar_cita, listar_citas, buscar_cita_por_doctor, buscar_cita_por_paciente } = require('../services/dbServices')

const crearCita = async (req, res) => {
    try {
        const { id_doctor, id_paciente, fecha, hora, es_activa } = req.body;
        
        console.log('Datos recibidos:', { id_doctor, id_paciente, fecha, hora, es_activa });
        
        if (!id_doctor || !id_paciente || !fecha) {
            return res.status(400).json({ error: 'id_doctor, id_paciente y fecha son obligatorios' });
        }

        const cita = await crear_cita(id_doctor, id_paciente, fecha, hora, es_activa);
        console.log('Cita creada:', cita);
        res.status(201).json({ mensaje: 'Cita creada', cita: cita.id_citas });
    } catch(error) {
        console.error('Error al crear cita:', error);
        res.status(500).json({ error: 'Error al crear cita', details: error.message });
    }
}

const eliminarCita = async (req, res) => {
    try {
        const { id_citas } = req.params;
        
        await eliminar_cita(id_citas);
        res.status(200).json({ mensaje: 'Cita eliminada', id_citas });
    } catch(error) {
        if (error.message === 'Cita no encontrada') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al eliminar cita' });
    }
}

const editarCita = async (req, res) => {
    try {
        const { id_citas } = req.params;
        const campos = req.body;

        if (!campos || Object.keys(campos).length === 0) {
            return res.status(400).json({ error: 'Debe proporcionar campos para actualizar' });
        }

        await editar_cita(id_citas, campos);
        res.status(200).json({ mensaje: 'Cita actualizada', id_citas });
    } catch(error) {
        if (error.message === 'Cita no encontrada') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al editar cita' });
    }
}

const listarCitas = async (req, res) => {
    try {
        const citas = await listar_citas();
        res.status(200).json(citas);
    } catch(error) {
        console.error(error)
        res.status(500).json({ error: 'Error al listar citas' });
    }
}

const buscarCitasPaciente = async (req, res) => {
    try {
        const { id_paciente } = req.params;
        const citas = await buscar_cita_por_paciente(id_paciente);
        if (!citas) {
            return res.status(404).json({error: 'No se encontraron citas'})
        }
        res.status(200).json(citas);
    } catch(error) {
        res.status(500).json({ error: 'Error al buscar citas del paciente' });
    }
}

const buscarCitasDoctor = async (req, res) => {
    try {
        const { id_doctor } = req.params;
        
        const citas = await buscar_cita_por_doctor(id_doctor);
        res.status(200).json(citas);
    } catch(error) {
        res.status(500).json({ error: 'Error al buscar citas del doctor' });
    }
}

module.exports = {
    crearCita,
    eliminarCita,
    editarCita,
    listarCitas,
    buscarCitasPaciente,
    buscarCitasDoctor
};