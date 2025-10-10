import { ITransaction } from "../../features/transaction/models/transaction.model";
import { TRANSACTION_TYPE } from "../constants/transaction.const";

export const formatAmountForTransactionType = (value: number, row: ITransaction): string => {
    return row.type === TRANSACTION_TYPE[1].value ? `-${value}` : `${value}`;
}