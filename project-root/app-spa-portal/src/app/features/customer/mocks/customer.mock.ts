import { ICustomer } from '../models/customer.model';

export const mockCustomer: ICustomer = {
    idCustomer: '5ac1409d-88d7-4d6d-8a2d-4219c1dc5b6a',
    firstName: 'John',
    lastName: 'Doe',
    identification: '1234567890',
    address: 'Amazonas y Pereira',
    phone: '0912345678',
    createdAt: '2025-10-11T10:00:00Z',
    updatedAt: '2025-10-11T10:00:00Z'
};

export const newCustomer: ICustomer = {
    idCustomer: 'c219dab9-8f88-41a7-93a2-7e4f6c3d7180',
    firstName: 'Jane',
    lastName: 'Smith',
    identification: '0987654321',
    address: 'Amazonas y Pereira',
    phone: '0912345678',
    createdAt: '2025-10-11T10:00:00Z',
    updatedAt: '2025-10-11T10:00:00Z'
};