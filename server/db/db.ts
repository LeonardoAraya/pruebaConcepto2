import * as dotenv from 'dotenv'; //Cargar variables de entorno desde .env
import sql from 'mssql'; // Conexión a la base de datos de Microsoft SQL Server

dotenv.config(); // Configurar variables de entorno desde .env

const config: sql.config = {
    server: process.env.DB_SERVER as string,
    port: Number(process.env.DB_PORT), // Puerto de la base de datos
    user: process.env.DB_USER,          // Usuario: "leo"
    password: process.env.DB_PASSWORD,  // Contraseña: "asd"
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true', // false según .env
        enableArithAbort: true,
        trustServerCertificate: true
    },
    connectionTimeout: 30000 // Aumentamos el tiempo de espera a 30 segundos
};

export async function conectarDB() {
    try {
        await sql.connect(config);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error('Error de conexión:', error);
    }
}

export { sql };

//* Correr servidor: npx ts-node index.ts
