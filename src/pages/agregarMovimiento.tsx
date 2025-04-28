import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Header, Footer, Button, Select } from '../components';
import Swal from 'sweetalert2';

import logo from '../assets/home.png';

export const CrearMovimiento = () => {
    const { id } = useParams<{ id: string }>(); // ID del empleado
    const navigate = useNavigate();

    const [fecha, setFecha] = useState('');
    const [monto, setMonto] = useState('');
    const [idTipoMovimiento, setIdTipoMovimiento] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!idTipoMovimiento || !monto || !fecha) {
            Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
            return;
        }
    
        const username = localStorage.getItem('usuario');
    
        const movimiento = {
            idEmpleado: parseInt(id || '0'),
            idTipoMovimiento: parseInt(idTipoMovimiento),
            monto: parseFloat(monto),
            fecha: fecha,
            username: username
        };
    
        try {
            const res = await fetch('http://localhost:5000/api/movimientos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movimiento)
            });
    
            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.error);
            }
    
            await Swal.fire('Éxito', 'Movimiento registrado correctamente', 'success');
            navigate(`/empleado/listar_movimientos/${id}`);
        } catch (error: any) {
            console.error('Error al crear movimiento:', error);
            Swal.fire('Error', error.message, 'error');
        }
    };
    

    return (
        <>
            <Header textRight="Prueba Concepto 2" logoSrc={logo} logoLink="/empleados" showLogoutButton={true} />
            <div className="container">
                <h2>Crear Movimiento</h2>
                <form onSubmit={handleSubmit} className="form">
                    <label>Tipo de Movimiento:
                        <Select
                            value={idTipoMovimiento}
                            onChange={(e) => setIdTipoMovimiento(e.target.value)}
                            options={[
                                { value: 1, label: 'Cumplir mes' },
                                { value: 2, label: 'Bono Vacacional' },
                                { value: 3, label: 'Reversión débito' },
                                { value: 4, label: 'Disfrute de vacaciones' },
                                { value: 5, label: 'Venta de vacaciones' },
                                { value: 6, label: 'Reversión crédito' },
                            ]}
                            required
                        />
                    </label>

                    <label>Monto:
                        <Input
                            value={monto}
                            onChange={(e) => setMonto(e.target.value)}
                            placeholder="Ej: 10.5"
                            type="number"
                            min="0"
                            step="0.01"
                            isRequired={true}
                        />
                    </label>

                    <label>Fecha del Movimiento:
                        <Input
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            type="date"
                            isRequired={true}
                        />
                    </label>

                    <Button label="Registrar Movimiento" className="boton-verde" parentMethod={() => { }} type="submit" />
                </form>
            </div>
            <Footer text="© 2025 Todos los derechos reservados" />
        </>
    );
};
