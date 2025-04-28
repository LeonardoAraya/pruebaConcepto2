import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Footer, Header, Table } from '../components';
import logo from '../assets/home.png';

interface Movimiento {
    fecha: string;
    tipo_movimiento: string;
    monto: number;
    nuevo_saldo: number;
    post_by: string;
    post_in_ip: string;
    post_time: string;
}

interface Empleado {
    valor_documento_identidad: string;
    nombre: string;
    saldo_vacaciones: number;
}

export const ListarMovimientosEmpleado = () => {
    const { id } = useParams<{ id: string }>();
    const [empleado, setEmpleado] = useState<Empleado | null>(null);
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

    const formatUTCDate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Fecha inválida';
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    const formatUTCDateTime = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Fecha inválida';
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };
    
    useEffect(() => {
        // Obtener datos del empleado
        fetch(`http://localhost:5000/api/empleados/${id}`)
            .then(res => res.json())
            .then(data => setEmpleado({
                valor_documento_identidad: data.valor_documento_identidad,
                nombre: data.nombre,
                saldo_vacaciones: data.saldo_vacaciones,
            }))
            .catch(err => console.error('Error al obtener empleado:', err));

        // Obtener movimientos
        fetch(`http://localhost:5000/api/empleados/movimientos/${id}`)
            .then(res => res.json())
            .then(data => setMovimientos(data))
            .catch(err => console.error('Error al obtener movimientos:', err));
    }, [id]);

    const headers = ['Fecha', 'Tipo Movimiento', 'Monto', 'Nuevo Saldo', 'Usuario', 'IP', 'Estampa de Tiempo'];

    const rows = movimientos.map(m => [
        formatUTCDate(m.fecha),
        m.tipo_movimiento,
        m.monto.toString(),
        m.nuevo_saldo.toString(),
        m.post_by,
        m.post_in_ip,
        formatUTCDateTime(m.post_time)
    ]);
    
    

    if (!empleado) return <p>Cargando...</p>;

    return (
        <>
            <Header textRight="Prueba Concepto 2" logoSrc={logo} logoLink="/empleados" showLogoutButton={true} />
            <Footer text="© 2025 Todos los derechos reservados" />
            <div className="container">
                <h1>Movimientos del Empleado</h1>
                <div className="detalle-empleado">
                    <p><strong>Nombre:</strong> {empleado.nombre}</p>
                    <p><strong>Documento de Identidad:</strong> {empleado.valor_documento_identidad}</p>
                    <p><strong>Saldo Actual de Vacaciones:</strong> {empleado.saldo_vacaciones}</p>
                </div>
                <div className="table-container">
                    <Table headers={headers} rows={rows} />
                </div>
            </div>
        </>
    );
};
