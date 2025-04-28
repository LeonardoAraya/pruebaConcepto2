import { Request, Response } from 'express';
import { sql, poolPromise } from '../db/db';

export async function insertarMovimiento(req: Request, res: Response) {
    const { idEmpleado, idTipoMovimiento, monto, fecha, username } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('inIdEmpleado', sql.Int, idEmpleado)
            .input('inNombreEmpleado', sql.VarChar(64), '') 
            .input('inIdTipoMovimiento', sql.Int, idTipoMovimiento)
            .input('inMonto', sql.Decimal(24,4), monto)
            .input('inUsername', sql.VarChar(64), username)
            .execute('SP_InsertarMovimientoEmpleado');

        
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

