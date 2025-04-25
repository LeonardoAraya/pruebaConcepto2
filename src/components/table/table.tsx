import './table.css'
import { JSX } from 'react';

interface TableProps {
    headers: string[]; //encabezados de la tabla
    rows: (string | JSX.Element)[][];
    onRowClick?: (index: number) => void; //manejador de click en fila
}


export const Table = ({ headers, rows, onRowClick }: TableProps) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {headers.map((header, i) => (
                        <th key={i}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => (
                    <tr key={i} onClick={() => onRowClick?.(i)} style={{ cursor: 'pointer' }}>
                        {row.map((cell, j) => (
                            <td key={j}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};