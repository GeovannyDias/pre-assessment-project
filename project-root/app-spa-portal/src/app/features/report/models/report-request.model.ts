export interface IReportRequest {
    customerName: string
    accountNumber: string
    accountType: string
    accountStatus: string
    transactions: ITransactionReport[]
}

export interface ITransactionReport {
    date: string
    balanceBefore: string
    accountStatus: string
    amount: string
    balanceAfter: string
}