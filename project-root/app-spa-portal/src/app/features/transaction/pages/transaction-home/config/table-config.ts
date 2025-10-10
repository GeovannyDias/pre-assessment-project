import { ITableColumn } from "../../../../../shared/models/table-column.model";
import { formatEntityAccountNumber, formatEntityAccountType } from "../../../../../shared/utils/format-account";
import { formatDateTimeUsingPipe } from "../../../../../shared/utils/format-date-time";
import { formatStatus } from "../../../../../shared/utils/format-status";
import { IAccount } from "../../../../account/models/account.model";

export const TABLE_COLUMN_CONFIG: ITableColumn[] = [
    { key: 'account', label: 'No. Cuenta', visible: true, formatFn: (value: IAccount) => formatEntityAccountNumber(value) },
    { key: 'account', label: 'Tipo Cta.', visible: true, formatFn: (value: IAccount) => formatEntityAccountType(value) },
    { key: 'balanceBefore', label: 'Saldo Inicial', visible: true },
    { key: 'status', label: 'Estado', visible: true, formatFn: () => formatStatus(1) },
    { key: 'description', label: 'Movimiento', visible: true },
    { key: 'createdAt', label: 'Creado', visible: true, formatFn: (value: string) => formatDateTimeUsingPipe(value) },
];

// formatFn: (value: string) => formatDateUsingPipe(value, 'dd-MM-yyyy hh:mm:ss a') // 12h con AM/PM
// formatFn: (value: string) => formatDateUsingPipe(value, 'dd-MM-yyyy HH:mm:ss') // 24h sin AM/PM