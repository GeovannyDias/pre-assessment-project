import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { SERVICE_URL_ENDPOINTS } from '../../../../core/config/service-url-endpoints';
import { IAccount } from '../../models/account.model';
import { IMessageResponse } from '../../../../shared/models/message-response.model';
import { provideHttpClient } from '@angular/common/http';
import { mockAccount, newAccount } from '../../mocks/account.mock';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all accounts', () => {
    const mockAccounts: IAccount[] = [mockAccount];

    service.getAllAccounts().subscribe({
      next: (accounts) => expect(accounts).toEqual(mockAccounts)
    });

    const req = httpMock.expectOne(SERVICE_URL_ENDPOINTS.ACCOUNTS_ALL);
    expect(req.request.method).toBe('GET');
    req.flush(mockAccounts);
  });

  it('should get an account by id', () => {
    const idAccount = mockAccount.idAccount;

    service.getAccount(idAccount).subscribe({
      next: (account) => expect(account).toEqual(mockAccount)
    });

    const req = httpMock.expectOne(`${SERVICE_URL_ENDPOINTS.ACCOUNT}/${idAccount}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAccount);
  });

  it('should create an account', () => {
    service.createAccount(newAccount).subscribe({
      next: (account) => expect(account).toEqual(mockAccount)
    });

    const req = httpMock.expectOne(SERVICE_URL_ENDPOINTS.ACCOUNT_CREATE);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newAccount);
    req.flush(mockAccount);
  });

  it('should update an account', () => {
    const idAccount = mockAccount.idAccount;
    const updatedAccount = { ...mockAccount, balance: 2000.00 };

    service.updateAccount(idAccount, updatedAccount).subscribe({
      next: (account) => expect(account).toEqual(updatedAccount)
    });

    const req = httpMock.expectOne(`${SERVICE_URL_ENDPOINTS.ACCOUNT}/${idAccount}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedAccount);
    req.flush(updatedAccount);
  });

  it('should update an account partially', () => {
    const idAccount = mockAccount.idAccount;
    const partialAccount: IAccount = {
      ...mockAccount,
      balance: 1500.00,
      status: 1
    };

    service.updateAccountPartial(idAccount, partialAccount).subscribe({
      next: (account) => expect(account).toEqual(partialAccount)
    });

    const req = httpMock.expectOne(`${SERVICE_URL_ENDPOINTS.ACCOUNT}/${idAccount}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(partialAccount);
    req.flush(partialAccount);
  });

  it('should delete an account', () => {
    const idAccount = mockAccount.idAccount;
    const mockResponse: IMessageResponse = {
      message: 'Account deleted successfully'
    };

    service.deleteAccount(idAccount).subscribe({
      next: (response) => expect(response).toEqual(mockResponse)
    });

    const req = httpMock.expectOne(`${SERVICE_URL_ENDPOINTS.ACCOUNT}/${idAccount}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should get accounts by customer id', () => {
    const idCustomer = mockAccount.customerId;
    const mockAccounts: IAccount[] = [mockAccount];

    service.getAccountByCustomerId(idCustomer).subscribe({
      next: (accounts) => expect(accounts).toEqual(mockAccounts)
    });

    const req = httpMock.expectOne(`${SERVICE_URL_ENDPOINTS.ACCOUNTS_CUSTOMER}/${idCustomer}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAccounts);
  });
});
