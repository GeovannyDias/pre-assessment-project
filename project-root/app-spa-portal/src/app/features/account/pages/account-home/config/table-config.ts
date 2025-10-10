import { ITableColumn } from "../../../../../shared/models/table-column.model";
import { formatAccountType } from "../../../../../shared/utils/format-account";
import { formatDateTimeUsingPipe } from "../../../../../shared/utils/format-date-time";
import { formatEntityFullName } from "../../../../../shared/utils/format-customer";
import { formatStatus } from "../../../../../shared/utils/format-status";
import { ICustomer } from "../../../../customer/models/customer.model";

export const TABLE_COLUMN_CONFIG: ITableColumn[] = [
    { key: 'accountNumber', label: 'No. Cuenta', visible: true },
    { key: 'accountType', label: 'Tipo Cta.', visible: true, formatFn: (value: string) => formatAccountType(value) },
    { key: 'balance', label: 'Saldo', visible: true },
    { key: 'status', label: 'Estado', visible: true, formatFn: (value: number) => formatStatus(value, 'verbose') },
    { key: 'customer', label: 'Cliente', visible: true, formatFn: (value: ICustomer) => formatEntityFullName(value) },
    { key: 'createdAt', label: 'Creado', visible: true, formatFn: (value: string) => formatDateTimeUsingPipe(value, 'dd/MM/yyyy') },
];

// formatFn: (value: string) => formatDateUsingPipe(value, 'dd-MM-yyyy hh:mm:ss a') // 12h con AM/PM
// formatFn: (value: string) => formatDateUsingPipe(value, 'dd-MM-yyyy HH:mm:ss') // 24h sin AM/PM