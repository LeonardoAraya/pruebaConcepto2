import { Request, Response } from 'express'; //Importa las librerías de Express (Request: solicitud al servidor, Response: respuesta al servidor)
import { sql } from '../db/db'; //Importa la conexión a la base de datos

export async function getProyectos(req: Request, res: Response) { //función asíncrona que recibe la petición y devuelve la respuesta
    try {
        const result = await sql.query`SELECT * FROM Proyecto`; //Ejecuta la consulta SQL
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
}

export async function crearProyecto(req: Request, res: Response) { //función asíncrona que recibe la petición y devuelve la respuesta
    try {
        const { //variables de entrada, igual a las variables de la consulta SQL
            nombre,
            descripcion,
            presupuesto,
            tipo_proyecto,
            fecha_inicio,
            fecha_fin
        } = req.body;

        await sql.query` //Ejecuta la consulta SQL, inserta los datos en la base de datos
        INSERT INTO Proyecto (
            nombre,
            descripcion,
            presupuesto,
            tipo_proyecto,
            fecha_inicio,
            fecha_fin
            )
        VALUES (
            ${nombre},
            ${descripcion},
            ${presupuesto},
            ${tipo_proyecto},
            ${fecha_inicio},
            ${fecha_fin}
            )
        `;

        res.status(201).json({ mensaje: 'Proyecto creado exitosamente' }); //mensaje de respuesta si se crea el proyecto
    } catch (error) { //mensaje de posible error
        console.error('Error al crear proyecto:', error);
        res.status(500).json({ mensaje: 'Error del servidor al crear proyecto' });
    }
}

