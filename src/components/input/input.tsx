import './input.css';

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    isRequired?: boolean;
    min?: string;
    step?: string;
}

export const Input = ({ value, onChange, placeholder, type = 'text', isRequired = false, min, step }: InputProps) => {
    return (
    <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={isRequired}
        min={min}
        step={step}
        className="input"
    />
    );
};
