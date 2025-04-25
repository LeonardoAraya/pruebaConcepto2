import express, { Request, Response } from 'express'; //crear app Express (framework para crear servidores y APIs)
const cors = require('cors'); //permite la comunicación entre puertos
const path = require('path');  //construir rutas de archivos
const empleadosRoutes = require('./routes/empleados.routes'); //rutas de la API de proyectos



const app = express(); //crear app Express (framework para crear servidores y APIs)

// Middlewares
app.use(express.json()); //Middleware para que express entienda JSON
app.use(cors()); //Middleware para permitir la comunicación entre puertos

// Archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'src', 'assets'))); //ruta de los archivos estáticos

// Rutas de API
app.use('/api/empleados', empleadosRoutes); //ruta de la API de empleados

// Rutas HTML
app.get('/', (req: Request, res: Response) => {
    void req; // para que no marque advertencia, aunque no se use
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});



module.exports = app;

