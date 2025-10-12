import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionHomePage } from './transaction-home.page';
import { TransactionService } from '../../services/transaction/transaction.service';
import { mockTransaction } from '../../mocks/transaction.mock';
import { of } from 'rxjs';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEsEC from '@angular/common/locales/es-EC';
import { LOCALE_ID } from '@angular/core';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IEventTransactionData } from '../../models/event-transaction-data.model';

describe('TransactionHomePage', () => {
  let component: TransactionHomePage;
  let fixture: ComponentFixture<TransactionHomePage>;
  let transactionService: jest.MockedObject<TransactionService>;

  const mockTransactions = [
    { ...mockTransaction, createdAt: '2025-10-11T10:00:00Z' },
    { ...mockTransaction, idTransaction: '2', createdAt: '2025-10-10T10:00:00Z' }
  ];

  beforeEach(async () => {
    registerLocaleData(localeEsEC);
    transactionService = {
      getTransactions: jest.fn().mockReturnValue(of(mockTransactions)),
      getTransactionById: jest.fn(),
      createTransaction: jest.fn(),
      getTransactionByAccountIdAndDate: jest.fn()
    } as jest.MockedObject<TransactionService>;

    await TestBed.configureTestingModule({
      imports: [
        TransactionHomePage,
        ModalComponent,
        TableComponent,
        InputComponent,
        ButtonComponent,
        TransactionFormComponent
      ],
      providers: [
        { provide: TransactionService, useValue: transactionService },
        { provide: LOCALE_ID, useValue: 'es-EC' },
        DatePipe,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and sort transactions on init', () => {
    expect(transactionService.getTransactions).toHaveBeenCalled();
    expect(component.transactions).toEqual(mockTransactions);
    expect(component.filteredTransactions).toEqual(mockTransactions);
  });

  it('should filter transactions based on search input', () => {
    const event = new Event('input');
    const input = document.createElement('input');
    input.value = mockTransaction.type.toLowerCase();
    Object.defineProperty(event, 'target', { value: input });

    component.onSearchInput(event);

    expect(component.filteredTransactions.length).toBe(2);
  });

  it('should reset filters when search input is empty', () => {
    const event = new Event('input');
    const input = document.createElement('input');
    input.value = '';
    Object.defineProperty(event, 'target', { value: input });

    component.onSearchInput(event);

    expect(component.filteredTransactions).toEqual(component.transactions);
  });

  it('should handle modal control', () => {
    component.openModal();
    expect(component.isModalOpen).toBe(true);

    component.onModalClosed();
    expect(component.isModalOpen).toBe(false);
  });

  it('should handle form submission', () => {
    const eventData: IEventTransactionData = {
      data: mockTransaction,
      isEdit: false
    };

    jest.spyOn(component, 'getTransactions');
    component.onFormSubmitted(eventData);

    expect(component.isModalOpen).toBe(false);
    expect(component.getTransactions).toHaveBeenCalled();
  });

  it('should sort transactions by date in descending order', () => {
    const sorted = component.sortAccountByDate(mockTransactions);
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
