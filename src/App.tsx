import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Empleados } from './pages/empleados';
import { ConsultaEmpleado } from './pages/consultaEmpleado';
import { CrearEmpleado } from './pages/crearEmpleado';
import { EditarEmpleado } from './pages/editarEmpleado';
import { Login } from './pages/login';
import { ListarMovimientosEmpleado } from './pages/listarMovimientosEmpleado';
import { CrearMovimiento } from './pages/agregarMovimiento';

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<h1>Inicio</h1>} />
            <Route path="/empleados" element={<Empleados/>} />
            <Route path="/empleado/consulta/:id" element={<ConsultaEmpleado/>} />
            <Route path="empleado/modificacion/:id" element={<EditarEmpleado/>} />
            <Route path="/empleado/crear_empleado" element={<CrearEmpleado/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/empleado/listar_movimientos/:id" element={<ListarMovimientosEmpleado />} />
            <Route path="/empleado/crear_movimiento/:id" element={<CrearMovimiento />} />
        </Routes>
    </BrowserRouter>
);
}

export default App
