import express, { Request, Response } from 'express'; //crear app Express (framework para crear servidores y APIs)
const cors = require('cors'); //permite la comunicación entre puertos
const path = require('path');  //construir rutas de archivos
const { conectarDB } = require('./db/db'); //conectar a la base de datos
const proyectoRoutes = require('./routes/proyectos.routes'); //rutas de la API de proyectos



const app = express(); //crear app Express (framework para crear servidores y APIs)

// Middlewares
app.use(express.json()); //Middleware para que express entienda JSON
app.use(cors()); //Middleware para permitir la comunicación entre puertos

// Conexión DB
conectarDB(); //método que está en db/db.ts

// Archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'src', 'assets'))); //ruta de los archivos estáticos

// Rutas de API
app.use('/api/proyectos', proyectoRoutes);//ruta de la API de proyectos

// Rutas HTML
app.get('/', (req: Request, res: Response) => {
    void req; // para que no marque advertencia, aunque no se use
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});



module.exports = app;

