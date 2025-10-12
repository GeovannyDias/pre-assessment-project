import { IAccount } from '../models/account.model';
import { mockCustomer } from '../../customer/mocks/customer.mock';

export const mockAccount: IAccount = {
    idAccount: '23c0a5b2-fd9c-4e7c-9c76-84b1440f8f3c',
    accountNumber: '1234567890',
    accountType: 'AHORRO',
    balance: 1000.00,
    status: 1,
    customerId: mockCustomer.idCustomer,
    createdAt: '2025-10-11T10:00:00Z',
    updatedAt: '2025-10-11T10:00:00Z',
    customer: mockCustomer
};

export const newAccount: IAccount = {
    idAccount: 'd3a31c9e-e5e2-4bd0-bcc1-3a2e3abbb387',
    accountNumber: '0987654321',
    accountType: 'CORRIENTE',
    balance: 500.00,
    status: 1,
    customerId: mockCustomer.idCustomer,
    createdAt: '2025-10-11T10:00:00Z',
    updatedAt: '2025-10-11T10:00:00Z'
};