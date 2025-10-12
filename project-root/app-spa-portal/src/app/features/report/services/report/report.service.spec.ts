import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ReportService } from './report.service';
import { SERVICE_URL_ENDPOINTS } from '../../../../core/config/service-url-endpoints';
import { provideHttpClient } from '@angular/common/http';
import { mockReportRequest, mockReportResponse } from '../../mocks/report.mock';
import { mockCustomer } from '../../../customer/mocks/customer.mock';
import { mockAccount } from '../../../account/mocks/account.mock';
import { mockTransaction } from '../../../transaction/mocks/transaction.mock';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-EC';

describe('ReportService', () => {
  let service: ReportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    registerLocaleData(localeEs);
    TestBed.configureTestingModule({
      providers: [
        ReportService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DatePipe, useFactory: () => new DatePipe('es-EC') }
      ]
    });
    service = TestBed.inject(ReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a report', () => {
    service.generateReport(mockReportRequest).subscribe({
      next: (response) => expect(response).toEqual(mockReportResponse)
    });

    const req = httpMock.expectOne(SERVICE_URL_ENDPOINTS.REPORT_TRANSACTIONS);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockReportRequest);
    req.flush(mockReportResponse);
  });

  it('should prepare report data correctly', () => {
    const transactions = [mockTransaction];

    const result = service.prepareReportData(mockCustomer, mockAccount, transactions);

    expect(result).toEqual({
      customerName: `${mockCustomer.firstName} ${mockCustomer.lastName}`,
      accountNumber: mockAccount.accountNumber,
      accountType: 'Ahorro',
      accountStatus: 'Activo',
      transactions: [{
        date: '11/10/2025',
        balanceBefore: mockTransaction.balanceBefore.toString(),
        accountStatus: 'Activo',
        amount: '100',
        balanceAfter: mockTransaction.balanceAfter.toString()
      }]
    });
  });

  it('should handle empty transactions array when preparing report data', () => {
    const result = service.prepareReportData(mockCustomer, mockAccount, []);

    expect(result).toEqual({
      customerName: `${mockCustomer.firstName} ${mockCustomer.lastName}`,
      accountNumber: mockAccount.accountNumber,
      accountType: 'Ahorro',
      accountStatus: 'Activo',
      transactions: []
    });
  });
});
