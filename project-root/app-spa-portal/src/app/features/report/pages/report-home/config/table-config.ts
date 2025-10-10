import { ITableColumn } from "../../../../../shared/models/table-column.model";
import { formatEntityAccountNumber, formatEntityAccountType } from "../../../../../shared/utils/format-account";
import { formatEntityFullName } from "../../../../../shared/utils/format-customer";
import { formatDateTimeUsingPipe } from "../../../../../shared/utils/format-date-time";
import { formatStatus } from "../../../../../shared/utils/format-status";
import { formatAmountForTransactionType } from "../../../../../shared/utils/format-transaction";
import { IAccount } from "../../../../account/models/account.model";
import { ICustomer } from "../../../../customer/models/customer.model";

export const TABLE_COLUMN_CONFIG: ITableColumn[] = [
    { key: 'createdAt', label: 'Fecha', visible: true, formatFn: (value: string) => formatDateTimeUsingPipe(value, 'dd/MM/yyyy') },
    { key: 'customer', label: 'Cliente', visible: true, formatFn: (value: ICustomer) => formatEntityFullName(value) },
    { key: 'account', label: 'No. Cuenta', visible: true, formatFn: (value: IAccount) => formatEntityAccountNumber(value) },
    { key: 'account', label: 'Tipo Cta.', visible: true, formatFn: (value: IAccount) => formatEntityAccountType(value) },
    { key: 'balanceBefore', label: 'Saldo Inicial', visible: true },
    { key: 'status', label: 'Estado', visible: true, formatFn: () => formatStatus(1) },
    { key: 'amount', label: 'Movimiento', visible: true, formatFn: (value: number, row: any) => formatAmountForTransactionType(value, row) },
    { key: 'balanceAfter', label: 'Saldo Disponible', visible: true }
];
