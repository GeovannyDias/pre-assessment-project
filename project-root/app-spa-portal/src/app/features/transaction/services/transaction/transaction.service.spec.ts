import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';
import { SERVICE_URL_ENDPOINTS } from '../../../../core/config/service-url-endpoints';
import { ITransaction } from '../../models/transaction.model';
import { provideHttpClient } from '@angular/common/http';
import { mockTransaction, mockTransactionParams, newTransaction } from '../../mocks/transaction.mock';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all transactions', () => {
    const mockTransactions: ITransaction[] = [mockTransaction];

    service.getTransactions().subscribe({
      next: (transactions) => expect(transactions).toEqual(mockTransactions)
    });

    const req = httpMock.expectOne(SERVICE_URL_ENDPOINTS.TRANSACTIONS_ALL);
    expect(req.request.method).toBe('GET');
    req.flush(mockTransactions);
  });

  it('should get a transaction by id', () => {
    const idTransaction = mockTransaction.idTransaction;

    service.getTransactionById(idTransaction).subscribe({
      next: (transaction) => expect(transaction).toEqual(mockTransaction)
    });

    const req = httpMock.expectOne(`${SERVICE_URL_ENDPOINTS.TRANSACTION}/${idTransaction}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTransaction);
  });

  it('should create a transaction', () => {
    service.createTransaction(newTransaction).subscribe({
      next: (transaction) => expect(transaction).toEqual(mockTransaction)
    });

    const req = httpMock.expectOne(SERVICE_URL_ENDPOINTS.TRANSACTION_CREATE);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTransaction);
    req.flush(mockTransaction);
  });

  it('should get transactions by account id and date range', () => {
    const mockTransactions: ITransaction[] = [mockTransaction];
    const params = mockTransactionParams;

    service.getTransactionByAccountIdAndDate(params).subscribe({
      next: (transactions) => expect(transactions).toEqual(mockTransactions)
    });

    const req = httpMock.expectOne(request =>
      request.url === SERVICE_URL_ENDPOINTS.TRANSACTIONS_FILTER &&
      request.method === 'GET' &&
      request.params.get('accountId') === params.accountId &&
      request.params.get('startDate') === params.startDate &&
      request.params.get('endDate') === params.endDate
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockTransactions);
  });
});
