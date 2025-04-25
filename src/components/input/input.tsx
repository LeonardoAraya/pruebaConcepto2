import './input.css';

interface InputProps {
    value: string; // value es el texto que se escribe en el input
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange es la funcion que se ejecuta cuando se escribe en el input, detecta el valor que se escribe
    placeholder?: string; // placeholder es el texto que se muestra en el input cuando no hay texto escrito
    type?: string; // type es el tipo de input, por defecto es text
}


export const Input = ({ value, onChange, placeholder, type = 'text' }: InputProps) => {
    return (
        <input className="input" // estilo del input
        type={type}          // usa el tipo que le pases
        value={value}             // el valor actual, viene del padre
        onChange={onChange}       // la función que avisa al padre cuando cambia
        placeholder={placeholder} // texto que se ve si está vacío
        />
    );
};