import { useState } from 'react';
import { Header, Footer, Input, Button } from '../components';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


import logo from '../assets/home.png';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.error);
            }

            Swal.fire({
                title: "Éxito",
                text: "Sesión iniciada correctamente",
                icon: "success"
            });
            localStorage.setItem('usuario', username);

            navigate('/empleados');
        } catch (error: any) {
            console.error('Error al iniciar sesión:', error);
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error"
            });
        }
    }

    return (
        <>
            <Header textRight="Prueba Concepto 2" logoSrc={logo} logoLink="/login" />
            <Footer text="© 2025 Todos los derechos reservados" />
            <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <div className="login-container"> 
                    <h2>Iniciar sesión</h2>
                    <div className="input-container">
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" type="text" />
                    </div>
                    <div className="input-container">
                        <Input value={password} onChange={(e) => setPassword(e.target.value)}placeholder="Contraseña" type="password" />
                    </div>
                    <div className="boton-container">
                        <Button label="Iniciar sesión" parentMethod={() => { }} className="boton-verde" type="submit"/>
                    </div>
                </div>
            </form>
            </div>
        </>
    );
}
