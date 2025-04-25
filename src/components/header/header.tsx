import './header.css';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
    textRight: string; // texto que se muestra a la derecha
    logoSrc: string; // imagen del logo
    logoLink?: string; // link para el rediccionamiento, es opcional por el ?
}

export const Header = ({ textRight, logoSrc, logoLink = '/' }: HeaderProps) => { //por defecto, el logo se redicciona a la ruta /
    const navigate = useNavigate(); //hook para navegar

    return (
        <header className="app-header">
            <div className="logo" onClick={() => navigate(logoLink)}>
                <img src={logoSrc} alt="Logo" className="logo-img" />
            </div>
            <div className="tagline">
                <Link to="/about" style={{ color: 'white', textDecoration: 'none', marginLeft: 'auto' }}>
                    {textRight}
                </Link>
            </div>
        </header>
    );
};