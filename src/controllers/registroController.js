const { crear_registro, eliminar_registro, editar_registro, listar_registros, buscar_registros_por_paciente } = require('../services/dbServices')

const crearRegistro = async (req, res) => {
    try {
        const { id_paciente, fecha, diagnosis, tratamiento } = req.body;
        
        if (!id_paciente || !diagnosis || !tratamiento) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const registro = await crear_registro(id_paciente, fecha, diagnosis, tratamiento);
        res.status(201).json({ 
            mensaje: 'Registro médico creado', 
            id_registro: registro.id_registro 
        });
    } catch(error) {
        console.error(error)
        res.status(500).json({ error: 'Error al crear registro médico' });
    }
}

const eliminarRegistro = async (req, res) => {
    try {
        const { id_registro } = req.params;
        
        await eliminar_registro(id_registro);
        res.status(200).json({ 
            mensaje: 'Registro médico eliminado', 
            id_registro 
        });
    } catch(error) {
        if (error.message === 'Registro no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al eliminar registro médico' });
    }
}

const editarRegistro = async (req, res) => {
    try {
        const { id_registro } = req.params;
        const campos = req.body;

        if (!campos || Object.keys(campos).length === 0) {
            return res.status(400).json({ error: 'Debe proporcionar campos para actualizar' });
        }

        await editar_registro(id_registro, campos);
        res.status(200).json({ 
            mensaje: 'Registro médico actualizado', 
            id_registro 
        });
    } catch(error) {
        if (error.message === 'Registro no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al editar registro médico' });
    }
}

const listarRegistros = async (req, res) => {
    try {
        const registros = await listar_registros();
        res.status(200).json(registros);
    } catch(error) {
        res.status(500).json({ error: 'Error al listar registros médicos' });
    }
}

const buscarRegistrosPaciente = async (req, res) => {
    try {
        const { id_paciente } = req.params;
        
        const registros = await buscar_registros_por_paciente(id_paciente);
        res.status(200).json(registros);
    } catch(error) {
        res.status(500).json({ error: 'Error al buscar registros del paciente' });
    }
}

module.exports = {
    crearRegistro,
    eliminarRegistro,
    editarRegistro,
    listarRegistros,
    buscarRegistrosPaciente
};