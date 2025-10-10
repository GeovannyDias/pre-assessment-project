import { ICustomer } from "../../customer/models/customer.model"

export interface IAccount {
    idAccount: string
    accountNumber: string
    accountType: string
    balance: number
    status: number
    customerId: string
    createdAt: string
    updatedAt: string
    customer?: ICustomer
}

export interface IAccountPartial {
    dAccount?: string
    accountNumber?: string
    accountType?: string
    balance?: number
    status?: number
    customerId?: string
    createdAt?: string
    updatedAt?: string
    customer?: ICustomer
}
