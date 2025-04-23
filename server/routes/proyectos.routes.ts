import { Router } from 'express'; // Importo el módulo de Express//direccion del controlador
import { getProyectos, crearProyecto } from '../controllers/proyectos.controller';

const router = Router(); //crear el router

router.get('/', getProyectos); //crear ruta GET, / representa el inicio, en este caso /api/proyectos
router.post('/', crearProyecto); //crear ruta POST, / representa el inicio, en este caso /api/proyectos

module.exports = router;

