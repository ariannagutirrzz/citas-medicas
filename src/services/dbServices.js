const bcrypt = require('bcryptjs')
const Paciente = require('../models/paciente')
const Cita = require('../models/cita')
const Registro = require('../models/registroMedico')
const Usuario = require('../models/usuario')

const crear_usuario = async (nombres, apellidos, email, cedula, contraseña, roles) => {
        return await Usuario.create({ // Pasa un objeto con las propiedades
            nombres,
            apellidos,
            email,
            cedula,
            contraseña,
            roles
        });
}

const editar_usuario = async (id, campos)  => {
        const usuario = await Usuario.findByPk(id)

        if (!usuario) {
            throw new Error('El usuario no existe');
        }

        return await usuario.update(campos);
}

const eliminar_usuario = async (id) => {
        const usuario = await Usuario.findByPk(id)

        if (!usuario) {
            throw new Error('El usuario no existe');
        }

        return await usuario.destroy();
}

const listar_usuarios = async ()  => {
    return await Usuario.findAll()
}

const listar_doctores = async () => {
    return await Usuario.findAll({
        where: {
            roles: 'doctor'
        },
        attributes: ['id_usuario', 'nombres', 'apellidos', 'email', 'cedula']
    });
}

const buscar_usuario = async (id) => {
        return await Usuario.findByPk(id);
}

const cambiar_contraseña = async (id, contraseña_actual, nueva_contraseña) => {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            throw new Error('El usuario no existe');
        }

        const esValida = await bcrypt.compare(contraseña_actual, usuario.contraseña);

        if (!esValida) {
            throw new Error('La contraseña actual es incorrecta');
        }

        const salt = await bcrypt.genSalt(10);
        const hashNuevaContraseña = await bcrypt.hash(nueva_contraseña, salt);

        return await usuario.update({ contraseña: hashNuevaContraseña });
    }

const crear_paciente = async (nombres, apellidos, email, cedula, historia_medica) => {
        return await Paciente.create({
            nombres,
            apellidos,
            email,
            cedula,
            historia_medica
        });
}

const eliminar_paciente = async (id) => {
    const paciente = await Paciente.findByPk(id)
    return  await paciente.destroy(id)
}

const editar_paciente = async (id, campos) => {
    const paciente = await Paciente.findByPk(id)
    await paciente.update(campos)
}

const listar_pacientes = async () => {
    return await Paciente.findAll()
}

const buscar_paciente = async (cedula) => {
    return await Paciente.findOne({
        where: {
            cedula: cedula
        }
    });
}


const crear_cita = async (id_doctor, id_paciente, fecha, hora, es_activa) => {
    return await Cita.create({
        id_doctor,
        id_paciente,
        fecha,
        hora,
        es_activa: es_activa || 'activa'
    });
}

const eliminar_cita = async (id_citas) => {
    const cita = await Cita.findByPk(id_citas);
    if (!cita) {
        throw new Error('Cita no encontrada');
    }
    return await cita.destroy();
}

const editar_cita = async (id_cita, campos) => {
    const cita = await Cita.findByPk(id_cita);
    if (!cita) {
        throw new Error('Cita no encontrada');
    }
    return await cita.update(campos);
}

const listar_citas = async () => {
    return await Cita.findAll();
}

const buscar_cita_por_paciente = async (id_paciente) => {
    return await Cita.findAll({
        where: {
            id_paciente: id_paciente
        }
    });
}

const buscar_cita_por_doctor = async (id_doctor) => {
    return await Cita.findAll({
        where: {
            id_doctor: id_doctor
        }
    });
}

const crear_registro = async (id_paciente, fecha, diagnosis, tratamiento) => {
    return await Registro.create({
        id_paciente,
        fecha,
        diagnosis,
        tratamiento
    });
}

const eliminar_registro = async (id_registro) => {
    const registro = await Registro.findByPk(id_registro);
    if (!registro) {
        throw new Error('Registro no encontrado');
    }
    return await registro.destroy();
}

const editar_registro = async (id_registro, campos) => {
    const registro = await Registro.findByPk(id_registro);
    if (!registro) {
        throw new Error('Registro no encontrado');
    }
    return await registro.update(campos);
}

const listar_registros = async () => {
    return await Registro.findAll();
}

const buscar_registros_por_paciente = async (id_paciente) => {
    return await Registro.findAll({
        where: {
            id_paciente: id_paciente
        },
        order: [['fecha', 'DESC']]
    });
}

module.exports = {crear_paciente, eliminar_paciente, editar_paciente, listar_pacientes, buscar_paciente, crear_cita, eliminar_cita, editar_cita, listar_citas, buscar_cita_por_doctor, buscar_cita_por_paciente, crear_registro, eliminar_registro, editar_registro, listar_registros, buscar_registros_por_paciente, crear_usuario, editar_usuario, eliminar_usuario, listar_usuarios, listar_doctores, buscar_usuario, cambiar_contraseña}