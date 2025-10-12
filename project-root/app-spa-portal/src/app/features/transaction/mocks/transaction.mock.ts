import { ITransaction } from '../models/transaction.model';
import { ITransactionParams } from '../models/transaction-params.model';
import { mockAccount } from '../../account/mocks/account.mock';

export const mockTransaction: ITransaction = {
    idTransaction: 'b7cfad9e-44e6-4c24-bd8c-21d5034f4204',
    accountId: mockAccount.idAccount,
    type: 'CREDIT',
    amount: 100,
    balanceBefore: 1000.00,
    balanceAfter: 1100.00,
    description: 'Depósito de 100',
    createdAt: '2025-10-11T10:00:00Z',
    account: mockAccount
};

export const newTransaction: ITransaction = {
    idTransaction: '3d51e973-2034-4ed0-b1f7-e94db10e0ec2',
    accountId: mockAccount.idAccount,
    type: 'DEBIT',
    amount: 50.00,
    balanceBefore: 1100.00,
    balanceAfter: 1050.00,
    description: 'Retiro de 50',
    createdAt: '2025-10-11T10:30:00Z'
};

export const mockTransactionParams: ITransactionParams = {
    accountId: mockAccount.idAccount,
    startDate: '2025-10-01T00:00:00Z',
    endDate: '2025-10-31T23:59:59Z'
};