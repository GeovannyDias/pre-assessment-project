import { IAccount } from "../../account/models/account.model"
import { ICustomer } from "../../customer/models/customer.model"

export interface ITransaction {
    idTransaction: string
    accountId: string
    type: string
    amount: number
    balanceBefore: number
    balanceAfter: number
    description: string
    createdAt: string
    account?: IAccount
}

export interface ITransactionPartial {
    idTransaction?: string
    accountId?: string
    type?: string
    amount?: number
    balanceBefore?: number
    balanceAfter?: number
    description?: string
    createdAt?: string
}

export interface ITransactionReport {
    idTransaction: string
    accountId: string
    type: string
    amount: number
    balanceBefore: number
    balanceAfter: number
    description: string
    createdAt: string
    account?: IAccount
    customer?: ICustomer
}
