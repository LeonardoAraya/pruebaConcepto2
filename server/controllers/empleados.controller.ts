import { Request, Response } from 'express'; //Importa las librerías de Express (Request: solicitud al servidor, Response: respuesta al servidor)
import { sql, poolPromise } from '../db/db'; //Importa la conexión a la base de datos de Azure

export async function getEmpleados(req: Request, res: Response) {
    try {
        const pool = await poolPromise; // Obtener la conexión a la base de datos
        const result = await pool.request().execute('SP_ObtenerEmpleadoPorNombre'); //Ejecuta la consulta SQL (Stored Procedure)
        res.json(result.recordset); // Devuelve la respuesta
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
}

export async function getEmpleadoPorId(req: Request, res: Response) {
    const { id } = req.params; //obtener el id del empleado
    try {
        const pool = await poolPromise; // Obtener la conexión a la base de datos
        const result = await pool.request()
        .input('inIdEmpleado', sql.Int, id)
        .input('inUsername', sql.VarChar(64), 'sistema')
        .execute('SP_FiltrarEmpleadoPorId'); //Ejecuta la consulta SQL (Stored Procedure)

        console.log(result.recordset);

        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener empleado por ID:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
}

export async function getPuestos(req: Request, res: Response) {
    try {
        const pool = await poolPromise; // Obtener la conexión a la base de datos
        const result = await pool.request().execute('SP_ObtenerPuestos'); //Ejecuta la consulta SQL (Stored Procedure)
        res.json(result.recordset); // Devuelve la respuesta
    } catch (error) {
        console.error('Error al obtener puestos:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
}

export async function crearEmpleado(req: Request, res: Response) {
    try {
        const { //variables que se van a insertar
            idPuesto,
            valorDocumentoIdentidad,
            nombre,
            fechaContratacion,
            saldoVacaciones,
            activo,
            username
        } = req.body;

        const pool = await poolPromise; // Obtener conexión a la base de datos
        const result = await pool.request()
            .input('inIdPuesto', sql.Int, idPuesto)
            .input('inValorDocumentoIdentidad', sql.VarChar(64), valorDocumentoIdentidad)
            .input('inNombre', sql.VarChar(64), nombre)
            .input('inFechaContratacion', sql.Date, fechaContratacion)
            .input('inSaldoVacaciones', sql.Decimal(12, 2), saldoVacaciones)
            .input('inActivo', sql.VarChar(4), activo)
            .input('inUsername', sql.VarChar(64), username) // Usuario del sistema
            .execute('SP_InsertarEmpleado'); // Ejecuta el procedimiento almacenado

        console.log('Resultado de la inserción:', result);

        if (result.returnValue !== 0) { // Verificar si returnValue indica error
            
            const errorResult = await pool.request()
                .input('Codigo', sql.Int, result.returnValue)
                .execute('SP_BuscarDescripcionError'); // Llama al SP encargado de mostrar la descripción del error

            const errorMessage = errorResult.recordset?.[0]?.descripcion || "Error desconocido.";


            throw new Error(`Código de error: ${result.returnValue}. Descripción: ${errorMessage}`);
        }

        res.status(201).json({ mensaje: 'Empleado creado correctamente', resultado: result.recordset }); //si todo salió bien, devuelve el resultado
    } catch (error: any) {
        console.error('Error al insertar empleado:', error);
        res.status(500).json({
            mensaje: 'Error del servidor',
            error: error.message // Envía el mensaje de error a la capa de presentación
        });
    }
}

export async function actualizarEmpleado(req: Request, res: Response) {
    const { id } = req.params; // Obtener el id del empleado
    const {
        idPuesto,
        valorDocumentoIdentidad,
        nombre,
        fechaContratacion,
        saldoVacaciones,
        activo,
        username
    } = req.body;

    try {
        const pool = await poolPromise; // Obtener conexión a la base de datos
        const result = await pool.request()
            .input('inIdEmpleado', sql.Int, parseInt(id))
            .input('inIdPuesto', sql.Int, idPuesto)
            .input('inValorDocumentoIdentidad', sql.VarChar(64), valorDocumentoIdentidad)
            .input('inNombre', sql.VarChar(64), nombre)
            .input('inFechaContratacion', sql.Date, fechaContratacion)
            .input('inSaldoVacaciones', sql.Decimal(12, 2), saldoVacaciones)
            .input('inActivo', sql.VarChar(4), activo)
            .input('inUsername', sql.VarChar(64), username)
            .execute('SP_ActualizarEmpleadoPorID'); // Ejecuta el procedimiento almacenado

        console.log('Resultado de la actualización:', result);

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

export async function eliminarEmpleado(req: Request, res: Response) {
    const { id } = req.params; // Obtener el id del empleado
    const { nombre } = req.query;
    const { username } = req.body; // Obtener el username del body

    try {

        const pool = await poolPromise; // Obtener la conexión a la base de datos
        await pool.request()
            .input('inIdEmpleado', sql.Int, id)
            .input('inNombre', sql.VarChar(64), nombre)
            .input('inUsername', sql.VarChar(64), username)
            .execute('SP_BorrarEmpleado');

        res.status(200).json({ mensaje: 'Empleado eliminado' });
    } catch (error) {
        console.error('Error al eliminar empleado:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
}

export async function filtrarEmpleadoPorNombre(req: Request, res: Response) {
    const { nombre } = req.params;
    const { username } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('inNombre', sql.VarChar(64), nombre)
            .input('inUsername', sql.VarChar(64), username)
            .execute('SP_FiltrarEmpleadoPorNombre');

        res.json(result.recordset);
    } catch (error) {
        console.error('Error al filtrar empleado por nombre:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
}

export async function filtrarEmpleadoPorCedula(req: Request, res: Response) {
    const { cedula } = req.params;
    const { username } = req.body; // Obtener el username del body

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('inCedulaEmpleado', sql.VarChar(64), cedula)
            .input('inUsername', sql.VarChar(64), username)
            .execute('SP_FiltrarEmpleadoPorDocumento_Identidad');

        res.json(result.recordset);
    } catch (error) {
        console.error('Error al filtrar empleado por ID:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
}

export async function listarMovimientosEmpleado(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('inIdEmpleado', sql.Int, id)
            .execute('SP_ObtenerMovimientosPorEmpleado');

        res.json(result.recordset);
    } catch (error) {
        console.error('Error al listar movimientos:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
}







