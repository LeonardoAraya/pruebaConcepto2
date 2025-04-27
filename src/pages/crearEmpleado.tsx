import { useState, useEffect } from 'react'; //importar desde React los hooks
import { useNavigate } from 'react-router-dom'; //hook que se usa para navegar entre rutas programáticamente
import { Input, Header, Footer, Button, Select } from '../components'; //import componente Input
import Swal from 'sweetalert2';

import logo from '../assets/home.png'; //import imagen del logo

interface Puesto {
    id_puesto: number;
    nombre: string;
}

export const CrearEmpleado = () => {

    const [puestos, setPuestos] = useState<Puesto[]>([]);
    const [idPuesto, setIdPuesto] = useState('');
    const [valorDocumentoIdentity, setValorDocumentoIdentity] = useState(''); //variable que almacena el valor del input
    const [nombre, setNombre] = useState(''); //variable que almacena el valor del input
    const [fechaContratacion, setFechaContratacion] = useState(''); //variable que almacena el valor del input
    const [saldoVacaciones, setSaldoVacaciones] = useState(''); //variable que almacena el valor del input
    const [activo, setActivo] = useState(''); //variable que almacena el valor del input

    const navigate = useNavigate(); //hook para navegar  entre rutas

    useEffect(() => {
        fetch('http://localhost:5000/api/empleados/puestos') //conexión a la API de empleados
            .then(res => res.json())
            .then(data => setPuestos(data))
            .catch(err => console.error('Error al cargar puestos:', err));
    }, []); //useEffect se ejecuta una vez cuando se monta la página, recoge todos los puestos

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const formatDate = (str: string) => {
            const date = new Date(str);
            return date.toISOString().split("T")[0];
        };
    
        const empleado = {
            idPuesto: parseInt(idPuesto),
            valorDocumentoIdentidad: valorDocumentoIdentity,
            nombre: nombre,
            fechaContratacion: formatDate(fechaContratacion),
            saldoVacaciones: parseFloat(saldoVacaciones),
            activo: activo,
            username: 'sistema'
        };
    
        try {
            const res = await fetch('http://localhost:5000/api/empleados', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(empleado)
            });
    
            if (!res.ok) {
                const errorResponse = await res.json(); // Lee el error desde el response JSON
                throw new Error(errorResponse.error); // Lanza el error con el mensaje del backend
            }
    
            Swal.fire({
                title: "Éxito",
                text: "Empleado insertado correctamente",
                icon: "success"
            });
            navigate('/empleados');
        } catch (error: any) {
            console.error('Error al insertar empleado:', error);
            Swal.fire({
                title: "Error",
                text: error.message, // Muestra el mensaje detallado del backend
                icon: "error"
            });
        }
    };

    return (
        <>
            <Header textRight="Prueba Concepto 2" logoSrc={logo} logoLink="/empleados" />

            <div className="container">
                <h2>Crear nuevo empleado</h2>
                <form onSubmit={handleSubmit} className="form">
                    <label>Nombre:
                        <Input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Juan Pérez"
                            isRequired = {true}
                        />
                    </label>

                    <label>Documento de Identidad:
                        <Input
                            value={valorDocumentoIdentity}
                            onChange={(e) => setValorDocumentoIdentity(e.target.value)}
                            placeholder="Ej: 123456789"
                            isRequired = {true}
                        />
                    </label>

                    <label>Fecha de Contratación:
                        <Input
                            value={fechaContratacion}
                            onChange={(e) => setFechaContratacion(e.target.value)}
                            type="date"
                            isRequired = {true}
                        />
                    </label>

                    <label>Saldo de Vacaciones:
                        <Input
                            value={saldoVacaciones}
                            onChange={(e) => setSaldoVacaciones(e.target.value)}
                            placeholder="Ej: 12.5"
                            type="number"
                            isRequired = {true}
                        />
                    </label>

                    <label>Activo:
                    <Select value={activo} onChange={(e) => setActivo(e.target.value)}
                        options={[
                            { value: 'SI', label: 'Sí' }, //Value es el valor que se guarda, label es el que se muestra
                            { value: 'NO', label: 'No' }
                        ]}
                        required
                        />
                    </label>

                    <label>Puesto:
                    <Select value={idPuesto} onChange={(e) => setIdPuesto(e.target.value)}
                        options={puestos.map(p => ({
                            value: p.id_puesto, /* Lo que se guarda es el id del puesto */
                            label: p.nombre /* El label es el nombre del puesto */
                        }))}
                        required
                        />
                    </label>

                    <Button label="Crear" className="boton-verde" parentMethod={() => { }} type="submit" />
                </form>
            </div>

            <Footer text="© 2025 Todos los derechos reservados" />
        </>
    );

}