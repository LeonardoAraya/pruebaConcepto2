import './button.css'

interface Props { //Propiedades de la función
    label: string, //tiene una etiqueta
    parentMethod: () => void //método que se ejecutará cuando se hace click en el botón, que es del padre
    className?: string; // permite estilos adicionales
    type?: "button" | "submit" | "reset";  // tipo de botón, por defecto es button
}

export const Button = ({ label, parentMethod, className = '', type = 'button' }: Props) => { //Función que es un componente, recibe las propiedades de PROBS
    return (
        <button className={`custom-button ${className}`} onClick={parentMethod} type={type} > {/* si da click, ejecuta el método parentMethod */}
            {label} {/* muestra la etiqueta */}
        </button>
    );
};