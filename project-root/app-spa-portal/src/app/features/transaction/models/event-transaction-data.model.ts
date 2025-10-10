import { ITransaction } from "./transaction.model";

export interface IEventTransactionData {
    data: ITransaction;
    isEdit: boolean;
}