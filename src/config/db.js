require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DBNAME,     
    process.env.DBUSER,     
    process.env.DBPASSWORD, 
    {
        host: process.env.DBHOST,
        dialect: 'mysql',
        logging: false, 
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión a BD exitosa'))
    .catch(err => console.error('Error de conexión a BD:', err));

module.exports = sequelize;