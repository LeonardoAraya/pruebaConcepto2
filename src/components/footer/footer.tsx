import './footer.css';

interface FooterProps {
    text: string; //texto que se muestra en el footer
}

export const Footer = ({ text }: FooterProps) => { //función que es un componente, recibe las propiedades de PROBS
    return (
        <footer className="app-footer">
            {text}
        </footer>
    );
};