import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../index'; // 👈 importar el Button

interface HeaderProps {
    textRight: string; // Texto a la derecha
    logoSrc: string;   // Imagen del logo
    logoLink?: string; // Link al hacer click en logo (opcional)
    showLogoutButton?: boolean; // Por defecto false, si es true muestra el boton de logout
}

export const Header = ({ textRight, logoSrc, logoLink = '/', showLogoutButton = false }: HeaderProps) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('usuario'); // Borrar usuario
        navigate('/login'); // Redirigir al login
    };

    return (
        <header className="app-header">
            <div className="logo" onClick={() => navigate(logoLink)}>
                <img src={logoSrc} alt="Logo" className="logo-img" />
            </div>
            <div className="tagline">
                <Link to="/about" style={{ color: 'white', textDecoration: 'none', marginLeft: 'auto', marginRight: '10px' }}>
                    {textRight}
                </Link>
                {showLogoutButton && ( // Solo si showLogoutButton es true
                    <Button
                        label="Cerrar sesión"
                        parentMethod={handleLogout}
                        className="boton-rojo"
                    />
                )}
            </div>
        </header>
    );
};
