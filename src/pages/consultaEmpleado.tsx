import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Footer, Header } from '../components';

import logo from '../assets/home.png';

interface Empleado {
    id_empleado: number;
    id_puesto: number;
    valor_documento_identidad: string;
    nombre: string;
    fecha_contratacion: string;
    saldo_vacaciones: number;
    activo: string;
}

export const ConsultaEmpleado = () => {
    const { id } = useParams<{ id: string }>(); //* UseParams es un hook que se utiliza para obtener parámetros dinámicos de la ruta de la URL
    const [empleado, setEmpleado] = useState<Empleado | null>(null); //UseState que maneja cambios de estado

    useEffect(() => {
        fetch(`http://localhost:5000/api/empleados/${id}`) //hacer petición a la API de empleados
            .then(res => res.json())
            .then(data => setEmpleado(data)) //almacenar en la variable empleado
            .catch(err => console.error('Error al obtener empleado:', err));
    }, [id]);

    const formatUTCDate = (dateString: string): string => { //formato correcto de la fecha en UTC
        const date = new Date(dateString);
    
        if (isNaN(date.getTime())) {
            console.error('Fecha inválida:', dateString);
            return 'Fecha inválida';
        }
    
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
    
        return `${day}/${month}/${year}`;
    };
    

    if (!empleado) return <p>Cargando...</p>;

    return (
        <>
            <Header textRight="Prueba Concepto 2" logoSrc={logo} logoLink="/empleados" />
            <Footer text="© 2025 Todos los derechos reservados" />
            <div className="container">
                <h1>Consulta de Empleado</h1>
                <div className="detalle-empleado">
                    <p><strong>Nombre:</strong> {empleado.nombre}</p>
                    <p><strong>Cédula:</strong> {empleado.valor_documento_identidad}</p>
                    <p><strong>Puesto:</strong> {empleado.id_puesto}</p>
                    <p><strong>Fecha de contratación:</strong> {formatUTCDate(empleado.fecha_contratacion)}</p>
                    <p><strong>Saldo de vacaciones:</strong> {empleado.saldo_vacaciones}</p>
                    <p><strong>Activo:</strong> {empleado.activo}</p>
                </div>
            </div>
        </>
    );
};
