import { ICustomer } from '../../customer/models/customer.model';
import { IAccount } from '../../account/models/account.model';
import { ITransaction } from '../../transaction/models/transaction.model';
import { ISelectItem } from '../../../shared/models/select-item.model';

export const mockCustomer: ICustomer = {
    idCustomer: '1',
    firstName: 'John',
    lastName: 'Doe',
    identification: '1234567890',
    phone: '0912345678',
    address: 'Amazonas y Pereira',
    createdAt: '2025-10-11T10:00:00Z',
    updatedAt: '2025-10-11T10:00:00Z'
};

export const mockAccount: IAccount = {
    idAccount: '1',
    accountNumber: '1234567890',
    accountType: 'AHORRO',
    balance: 1000.00,
    status: 1,
    customerId: '1',
    createdAt: '2025-10-11T10:00:00Z',
    updatedAt: '2025-10-11T10:00:00Z'
};

export const mockTransaction: ITransaction = {
    idTransaction: '1',
    accountId: '1',
    type: 'CREDIT',
    amount: 1000,
    balanceBefore: 0,
    balanceAfter: 1000,
    description: 'Depósito de 1000',
    createdAt: '2025-10-11T10:00:00Z'
};

export const mockSelectItems: ISelectItem[] = [
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jane Smith' }
];

export const mockAccountSelectItems: ISelectItem[] = [
    { value: '1', label: '1234567890 - Ahorro' },
    { value: '2', label: '0987654321 - Corriente' }
];