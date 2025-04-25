import * as dotenv from 'dotenv'; //Cargar variables de entorno desde .env
import sql from 'mssql'; // Conexión a la base de datos de Microsoft SQL Server

dotenv.config(); // Configurar variables de entorno desde .env

const config: sql.config = {
    server: process.env.DB_SERVER as string,
    port: Number(process.env.DB_PORT), // Puerto de la base de datos
    user: process.env.DB_USER,  
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true', // false según .env
        enableArithAbort: true,
        trustServerCertificate: true
    },
    connectionTimeout: 30000 // Aumentamos el tiempo de espera a 30 segundos
};

const poolPromise = new sql.ConnectionPool(config) //forma de reutilizar conexiones
    .connect() //establece la conexión a la Base de Datos solo una vez
    .then(pool => { //guarda el resultado de la conexión en pool
        console.log('Conectado a la base de datos');
        return pool;
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    });

export { sql, poolPromise };


//* Correr servidor: npx ts-node index.ts
