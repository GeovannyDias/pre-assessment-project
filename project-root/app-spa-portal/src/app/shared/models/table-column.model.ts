export interface ITableColumn {
    key: string;
    label: string;
    width?: string; // e.g., '20%', '100px'
    visible?: boolean;
    sortable?: boolean; // Si la columna se puede ordenar
    align?: 'left' | 'center' | 'right'; // Alineación de texto
    formatFn?: (value: any, row: any) => string; // Para formateo dinámico
    type?: 'text' | 'number' | 'date' | 'actions'; // Útil para renderizado condicional
}

