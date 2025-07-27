const express = require('express');
const cors = require('cors');
const routerUsuarios = require('./routers/routerUsuarios')
const routerPacientes = require('./routers/routerPacientes')
const routerCitas = require('./routers/routerCitas')
const routerRegistro = require('./routers/routerRegistro')

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
const port = 3000;

app.use('/api/auth', routerUsuarios)
app.use('/api/usuarios', routerUsuarios)
app.use('/api/pacientes', routerPacientes)
app.use('/api/citas', routerCitas)
app.use('/api/registros_medicos', routerRegistro)

app.listen(port, () => {
    console.log('http://localhost:3000');
});