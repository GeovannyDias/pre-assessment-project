import { ISelectItem } from "../models/select-item.model";

export const TRANSACTION_TYPE: ISelectItem[] = [
    {
        value: 'CREDIT',
        label: 'Despósito - (Crédito)'
    },
    {
        value: 'DEBIT',
        label: 'Retiro - (Débito)'
    }
];
