import { Request, Response } from 'express';
import { sql, poolPromise } from '../db/db';

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;
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
            .output('outIntentosFallidos', sql.Int) // Capturamos el OUTPUT del SP
            .execute('SP_ControlLogin');

        const intentosFallidos = result.output.outIntentosFallidos; // Accedemos al output

        console.log('Intentos fallidos actuales:', intentosFallidos);

        if (result.returnValue !== 0) { // Verificar si returnValue indica un error
            const errorResult = await pool.request()
                .input('Codigo', sql.Int, result.returnValue)
                .execute('SP_BuscarDescripcionError');

            const errorMessage = errorResult.recordset?.[0]?.descripcion || "Error desconocido.";

            throw new Error(`Código de error: ${result.returnValue}. Descripción: ${errorMessage}`);
        }

        res.status(200).json({
            mensaje: 'Empleado actualizado correctamente',
            intentosFallidos: intentosFallidos // También puedes devolverlo en el JSON si quieres
        });
    } catch (error: any) {
        console.error('Error al actualizar empleado:', error);
        res.status(500).json({
            mensaje: 'Error del servidor',
            error: error.message
        });
    }
}
