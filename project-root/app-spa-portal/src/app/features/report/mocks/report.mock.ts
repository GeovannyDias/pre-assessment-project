import { IReportRequest, ITransactionReport } from '../models/report-request.model';
import { IReportResponse } from '../models/report-response.model';
import { mockAccount } from '../../account/mocks/account.mock';
import { mockCustomer } from '../../customer/mocks/customer.mock';

export const mockTransactionReport: ITransactionReport = {
    date: '11/10/2025',
    balanceBefore: '1000.00',
    accountStatus: 'Activo',
    amount: '100.00',
    balanceAfter: '1100.00'
};

export const mockReportRequest: IReportRequest = {
    customerName: `${mockCustomer.firstName} ${mockCustomer.lastName}`,
    accountNumber: mockAccount.accountNumber,
    accountType: 'AHORRO',
    accountStatus: 'Activo',
    transactions: [mockTransactionReport]
};

export const mockReportResponse: IReportResponse = {
    status: 'success',
    message: 'Reporte generado correctamente',
    reportBase64: 'JVBERi0xLjU...'
};
