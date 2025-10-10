import { IAccount } from "./account.model";

export interface IEventAccountData {
    data: IAccount;
    isEdit: boolean;
}