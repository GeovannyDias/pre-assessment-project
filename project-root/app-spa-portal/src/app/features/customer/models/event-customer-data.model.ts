import { ICustomer } from "./customer.model";

export interface IEventCustomerData {
    data: ICustomer;
    isEdit: boolean;
}