import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportHomePage } from './report-home.page';
import { CustomerService } from '../../../customer/services/customer/customer.service';
import { AccountService } from '../../../account/services/account/account.service';
import { TransactionService } from '../../../transaction/services/transaction/transaction.service';
import { ReportService } from '../../services/report/report.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEsEC from '@angular/common/locales/es-EC';
import { LOCALE_ID } from '@angular/core';
import { of } from 'rxjs';
import { mockAccount, mockCustomer, mockTransaction, mockAccountSelectItems } from '../../mocks/report-home.mock';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ReportHomePage', () => {
  let component: ReportHomePage;
  let fixture: ComponentFixture<ReportHomePage>;
  let customerService: jest.MockedObject<CustomerService>;
  let accountService: jest.MockedObject<AccountService>;
  let transactionService: jest.MockedObject<TransactionService>;
  let reportService: jest.MockedObject<ReportService>;

  const mockCustomers = [mockCustomer];
  const mockAccounts = [mockAccount];
  const mockTransactions = [mockTransaction];
  const mockReportBase64 = 'mockPdfBase64String';

  beforeEach(async () => {
    registerLocaleData(localeEsEC);

    customerService = {
      getAllCustomers: jest.fn().mockReturnValue(of(mockCustomers))
    } as jest.MockedObject<CustomerService>;

    accountService = {
      getAccountByCustomerId: jest.fn().mockReturnValue(of(mockAccounts))
    } as jest.MockedObject<AccountService>;

    transactionService = {
      getTransactionByAccountIdAndDate: jest.fn().mockReturnValue(of(mockTransactions))
    } as jest.MockedObject<TransactionService>;

    reportService = {
      prepareReportData: jest.fn().mockReturnValue({}),
      generateReport: jest.fn().mockReturnValue(of({ reportBase64: mockReportBase64 }))
    } as jest.MockedObject<ReportService>;

    await TestBed.configureTestingModule({
      imports: [
        ReportHomePage,
        ReactiveFormsModule,
        TableComponent,
        InputComponent,
        ButtonComponent,
        SelectComponent
      ],
      providers: [
        FormBuilder,
        { provide: CustomerService, useValue: customerService },
        { provide: AccountService, useValue: accountService },
        { provide: TransactionService, useValue: transactionService },
        { provide: ReportService, useValue: reportService },
        { provide: LOCALE_ID, useValue: 'es-EC' },
        DatePipe,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required fields', () => {
    expect(component.formTransaction.get('customerId')).toBeTruthy();
    expect(component.formTransaction.get('accountId')).toBeTruthy();
    expect(component.formTransaction.get('startDate')).toBeTruthy();
    expect(component.formTransaction.get('endDate')).toBeTruthy();
  });

  it('should load customers on init', () => {
    expect(customerService.getAllCustomers).toHaveBeenCalled();
    expect(component.customerList).toHaveLength(mockCustomers.length);
  });

  it('should handle customer selection', () => {
    const event = { target: { value: mockCustomer.idCustomer } } as unknown as Event;
    component.onCustomerSelected(event);

    expect(component.customerId.value).toBe(mockCustomer.idCustomer);
    expect(accountService.getAccountByCustomerId).toHaveBeenCalledWith(mockCustomer.idCustomer);
    expect(component.accountId.enabled).toBe(true);
  });

  it('should handle account selection', () => {
    component.accounts = mockAccounts;
    const event = { target: { value: mockAccount.idAccount } } as unknown as Event;

    component.customerId.setValue(mockCustomer.idCustomer);
    component.onAccountSelected(event);

    expect(component.accountId.value).toBe(mockAccount.idAccount);
    expect(component.account).toEqual(mockAccount);
  });

  it('should submit form with valid data', () => {
    const startDate = '2025-10-01';
    const endDate = '2025-10-11';

    component.formTransaction.patchValue({
      customerId: mockCustomer.idCustomer,
      accountId: mockAccount.idAccount,
      startDate,
      endDate
    });

    component.onSubmit();

    expect(transactionService.getTransactionByAccountIdAndDate).toHaveBeenCalledWith({
      accountId: mockAccount.idAccount,
      startDate,
      endDate
    });
  });

  it('should not submit form with invalid data', () => {
    component.onSubmit();
    expect(transactionService.getTransactionByAccountIdAndDate).not.toHaveBeenCalled();
  });

  it('should generate report with valid data', () => {
    component.customer = mockCustomer;
    component.account = mockAccount;
    component.transactions = mockTransactions;

    const openBase64PdfSpy = jest.spyOn(component, 'openBase64Pdf');
    component.generateReport();

    expect(reportService.prepareReportData).toHaveBeenCalledWith(
      mockCustomer,
      mockAccount,
      mockTransactions
    );
    expect(reportService.generateReport).toHaveBeenCalled();
    expect(openBase64PdfSpy).toHaveBeenCalledWith(mockReportBase64);
  });

  it('should not generate report without required data', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
    component.generateReport();

    expect(alertSpy).toHaveBeenCalledWith('No existe datos para generar el reporte.');
    expect(reportService.generateReport).not.toHaveBeenCalled();
  });

  it('should reset form and data', () => {
    component.customer = mockCustomer;
    component.account = mockAccount;
    component.transactions = mockTransactions;
    component.accountList = mockAccountSelectItems;

    component.resetReport();

    expect(component.formTransaction.pristine).toBe(true);
    expect(component.customer).toBeNull();
    expect(component.account).toBeNull();
    expect(component.transactions).toHaveLength(0);
    expect(component.accountList).toHaveLength(0);
    expect(component.accountId.disabled).toBe(true);
  });

  it('should sort transactions by date in descending order', () => {
    const transactions = [
      { ...mockTransaction, createdAt: '2025-10-11T10:00:00Z' },
      { ...mockTransaction, createdAt: '2025-10-10T10:00:00Z' }
    ];

    const sorted = component.sortAccountByDate(transactions);
    expect(sorted[0].createdAt).toBe('2025-10-11T10:00:00Z');
    expect(sorted[1].createdAt).toBe('2025-10-10T10:00:00Z');
  });

  it('should cleanup subscriptions on destroy', () => {
    const mockUnsubscribe = jest.fn();
    component.subsList = [{ unsubscribe: mockUnsubscribe } as any];

    component.ngOnDestroy();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
