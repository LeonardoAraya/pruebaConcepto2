import { Router } from 'express';
import { insertarMovimiento } from '../controllers/movimientos.controller';

const router = Router();

router.post('/', insertarMovimiento); // Crear movimiento

module.exports = router;
