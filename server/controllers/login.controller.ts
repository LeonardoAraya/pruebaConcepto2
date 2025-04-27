import { Request, Response } from 'express'; //Importa las librerías de Express (Request: solicitud al servidor, Response: respuesta al servidor)
import { sql, poolPromise } from '../db/db'; //Importa la conexión a la base de datos de Azure

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    // Capturar la IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    console.log('IP:', ip);
    console.log('Usuario:', username);
    console.log('Contraseña:', password);

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('inUsername', sql.VarChar(64), username)
            .input('inPassword', sql.VarChar(64), password)
            .input('inIP', sql.VarChar(64), ip)
            .execute('SP_ControlLogin');


            console.log(result.returnValue);
            if (result.returnValue !== 0) { // Verificar si returnValue indica un error
                const errorResult = await pool.request()
                    .input('Codigo', sql.Int, result.returnValue)
                    .execute('SP_BuscarDescripcionError'); // Llama al SP encargado de obtener la descripción del error
    
                const errorMessage = errorResult.recordset?.[0]?.descripcion || "Error desconocido.";
    
                throw new Error(`Código de error: ${result.returnValue}. Descripción: ${errorMessage}`);
            }
    
            res.status(200).json({ mensaje: 'Empleado actualizado correctamente' });
    } catch (error: any) {
        console.error('Error al actualizar empleado:', error);
        res.status(500).json({
            mensaje: 'Error del servidor',
            error: error.message // Incluye el mensaje detallado del error
        });
    }
}