// components/Select.tsx
import React from 'react';
import './Select.css';

interface Option {
    value: string | number; //es el valor "interno" de la opción
    label: string; //es el texto "externo", lo que el usuario ve en la lista desplegable.
}

interface SelectProps {
    label?: string; //texto que se muestra arriba del select
    value: string | number; //Es el valor actualmente seleccionado
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // onChange es la funcion que se ejecuta cuando se escribe en el input, detecta el valor que se escribe
    options: Option[]; //array de opciones disponibles
    placeholder?: string; // placeholder es el texto que se muestra en el input cuando no hay texto escrito
    name?: string;
    id?: string;
    className?: string;
    required?: boolean; // true si el campo es obligatorio
}

export const Select: React.FC<SelectProps> = ({label, value, onChange, options, placeholder = 'Seleccione una opción', name, id, className, required = false,
}) => {
    return (
        <div className={`custom-select ${className || ''}`}>
            {label && <label htmlFor={id || name}>{label}</label>}
            <select
                value={value}
                onChange={onChange}
                name={name}
                id={id}
                required={required}
            >
                <option value="">{placeholder}</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

