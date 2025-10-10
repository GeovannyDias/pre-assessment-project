import { ITableColumn } from "../../../../../shared/models/table-column.model";
import { formatDateTimeUsingPipe } from "../../../../../shared/utils/format-date-time";

export const TABLE_COLUMN_CONFIG: ITableColumn[] = [
    { key: 'firstName', label: 'Nombre', visible: true },
    { key: 'lastName', label: 'Apellido', visible: true },
    { key: 'identification', label: 'Identificación', visible: true },
    { key: 'address', label: 'Dirección', visible: true },
    { key: 'phone', label: 'Teléfono', visible: true },
    { key: 'createdAt', label: 'Creado', visible: true, formatFn: (value: string) => formatDateTimeUsingPipe(value, 'dd/MM/yyyy') },
];

// formatFn: (value: string) => formatDateUsingPipe(value, 'dd-MM-yyyy hh:mm:ss a') // 12h con AM/PM
// formatFn: (value: string) => formatDateUsingPipe(value, 'dd-MM-yyyy HH:mm:ss') // 24h sin AM/PM
