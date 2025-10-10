import { ICustomer } from "../../features/customer/models/customer.model";

export const formatEntityFullName = (customer: ICustomer): string => {
    return `${customer?.firstName || ''} ${customer?.lastName || ''}`.trim();
};
