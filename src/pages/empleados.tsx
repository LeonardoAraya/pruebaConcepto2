import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Footer, Header } from '../components';
import Swal from 'sweetalert2';


import logo from '../assets/home.png';

interface Empleado { //definir la interfaz de Empleado, los mismos que se obtienen de la base de datos
    id_empleado: number;
    id_puesto: number;
    valor_documento_identidad: string;
    nombre: string;
    fecha_contratacion: string;
    saldo_vacaciones: number;
    activo: string;
}

export const Empleados = () => {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/empleados') //llamar a la API de empleados
            .then(response => response.json()) //convertir a JSON
            .then(data => setEmpleados(data)) //almacenar en la variable empleados
            .catch(error => console.error('Error al obtener empleados:', error));
    }, []); //el arreglo de dependencias vacío indica que el componente se ejecutará una vez cuando se monte el componente

    const headers = ['Nombre', 'Consulta', 'Borrado', 'Modificación', 'Listar movimientos']; //encabezados de la tabla

    //contenido de las filas
    const rows = empleados.map(e => [
        e.nombre,
        <Button label="Consulta" parentMethod={() => navigate(`/empleado/consulta/${e.id_empleado}`)} className="boton-verde" />,
        <Button label="Borrar" parentMethod={() => handleEliminar(e)} className="boton-rojo" />,
        <Button label="Modificación" parentMethod={() => navigate(`/empleado/modificacion/${e.id_empleado}`)} className="boton-verde" />,
        <Button label="Listar movimientos" parentMethod={() => navigate(`/empleado/listar_movimientos/${e.id_empleado}`)} className="boton-verde" />,
    ]);

    const handleEliminar = async (empleado: Empleado) => {
        const result = await Swal.fire({
            title: '¿Está seguro?',
            html: `
            <p><strong>Cédula:</strong> ${empleado.valor_documento_identidad}</p>
            <p><strong>Nombre:</strong> ${empleado.nombre}</p>
            <p>¿Está seguro de eliminar este empleado?</p>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
    
        if (result.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:5000/api/empleados/${empleado.id_empleado}?nombre=${encodeURIComponent(empleado.nombre)}`, {
                    method: 'DELETE'
                });
    
                if (!res.ok) throw new Error(await res.text());
    
                await Swal.fire('Eliminado', 'El empleado fue eliminado correctamente.', 'success');
                setEmpleados(prev => prev.filter(e => e.id_empleado !== empleado.id_empleado));
            } catch (error) {
                console.error('Error al eliminar empleado:', error);
                Swal.fire('Error', 'Ocurrió un error al eliminar el empleado.', 'error');
            }
        }
    };


    return (
        <>
            <Header textRight="Prueba Concepto 2" logoSrc={logo} logoLink="/empleados" />
            <Footer text="© 2025 Todos los derechos reservados" />
            <div className='abajo-header'>
                <h2>Empleados</h2>
            </div>
            <div className="container">
                <div className="table-container">
                    <Table headers={headers} rows={rows} />
                </div>
                <div className="boton-crear">
                    <Button label="Crear empleado" parentMethod={() => navigate(`/empleado/crear_empleado`)} className="boton-verde" />
                </div>
            </div>
        </>
    );
}
