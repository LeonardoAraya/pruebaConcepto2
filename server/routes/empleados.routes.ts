import { Router } from 'express'; // Importo el módulo de Express
import { getEmpleados, getEmpleadoPorId, getPuestos, crearEmpleado, actualizarEmpleado, eliminarEmpleado, filtrarEmpleadoPorCedula, filtrarEmpleadoPorNombre, listarMovimientosEmpleado} from '../controllers/empleados.controller';

const router = Router(); //crear el router

router.get('/', getEmpleados); //crear ruta GET, / representa el inicio, en este caso /api/empleados
router.get('/puestos', getPuestos); //crear ruta GET, / representa el inicio, en este caso /api/empleados
router.get('/:id', getEmpleadoPorId); //crear ruta GET, / representa el inicio, en este caso /api/empleados
router.get('/movimientos/:id', listarMovimientosEmpleado);




router.post('/filtrarPorNombre/:nombre', filtrarEmpleadoPorNombre);
router.post('/filtrarPorId/:cedula', filtrarEmpleadoPorCedula);
router.post('/', crearEmpleado); //crear ruta POST, / representa el inicio, en este caso /api/empleados

router.put('/:id', actualizarEmpleado);

router.delete('/:id', eliminarEmpleado);



module.exports = router;

