const {crear_paciente, eliminar_paciente, editar_paciente, listar_pacientes, buscar_paciente} = require('../services/dbServices')

const crearPaciente = async (req, res) => {
    try {
        const { nombres, apellidos, email, cedula, historia_medica} = req.body
        if (!nombres || !apellidos || !email || !cedula) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios menos historia medica' });
        }

        const paciente = await crear_paciente(nombres, apellidos, email, cedula, historia_medica)
        res.status(201).json({mensaje: 'Paciente creado', paciente: paciente.id})
    } catch(error) {
        res.status(500).json({error: 'Error al crear paciente'})
    }
}

const eliminarPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        
        const resultado = await eliminar_paciente(id);
        if (!resultado) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        
        res.status(200).json({ mensaje: 'Paciente eliminado', id: id });
    } catch(error) {
        res.status(500).json({ error: 'Error al eliminar paciente' });
    }
};

const editarPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const campos = req.body;

        if (!campos || Object.keys(campos).length === 0) {
            return res.status(400).json({ error: 'Debe proporcionar campos para actualizar' });
        }

        await editar_paciente(id, campos);
        res.status(200).json({ mensaje: 'Paciente actualizado', id: id });
    } catch(error) {
        if (error.message === 'El usuario no existe') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al editar paciente' });
    }
};

const listarPacientes = async (req, res) => {
    try {
        const pacientes = await listar_pacientes();
        res.status(200).json(pacientes);
    } catch(error) {
        res.status(500).json({ error: 'Error al listar pacientes' });
    }
};

const buscarPaciente = async (req, res) => {
    try {
        const { cedula } = req.params;

        const paciente = await buscar_paciente(cedula);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        res.status(200).json(paciente);
    } catch(error) {
        res.status(500).json({ error: 'Error al buscar paciente' });
    }
};



module.exports = { crearPaciente, eliminarPaciente, editarPaciente, listarPacientes, buscarPaciente }