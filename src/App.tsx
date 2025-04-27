import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Empleados } from './pages/empleados';
import { ConsultaEmpleado } from './pages/consultaEmpleado';
import { CrearEmpleado } from './pages/crearEmpleado';
import { EditarEmpleado } from './pages/editarEmpleado';
import { Login } from './pages/login';

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
        </Routes>
    </BrowserRouter>
);
}

export default App
