import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountHomePage } from './account-home.page';
import { AccountService } from '../../services/account/account.service';
import { of } from 'rxjs';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEsEC from '@angular/common/locales/es-EC';
import { LOCALE_ID } from '@angular/core';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AccountFormComponent } from '../../components/account-form/account-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IEventAccountData } from '../../models/event-account-data.model';
import { mockAccount } from '../../mocks/account.mock';

describe('AccountHomePage', () => {
  let component: AccountHomePage;
  let fixture: ComponentFixture<AccountHomePage>;
  let accountService: jest.MockedObject<AccountService>;

  const mockAccounts = [
    { ...mockAccount, createdAt: '2025-10-11T10:00:00Z' },
    { ...mockAccount, idAccount: '2', createdAt: '2025-10-10T10:00:00Z' }
  ];

  beforeEach(async () => {
    registerLocaleData(localeEsEC);

    accountService = {
      getAllAccounts: jest.fn().mockReturnValue(of(mockAccounts)),
      getAccount: jest.fn(),
      updateAccount: jest.fn(),
      updateAccountPartial: jest.fn(),
      deleteAccount: jest.fn().mockReturnValue(of({ message: 'Account deleted successfully' })),
      createAccount: jest.fn()
    } as jest.MockedObject<AccountService>;

    await TestBed.configureTestingModule({
      imports: [
        AccountHomePage,
        ModalComponent,
        TableComponent,
        InputComponent,
        ButtonComponent,
        AccountFormComponent
      ],
      providers: [
        { provide: AccountService, useValue: accountService },
        { provide: LOCALE_ID, useValue: 'es-EC' },
        DatePipe,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and sort accounts on init', () => {
    expect(accountService.getAllAccounts).toHaveBeenCalled();
    expect(component.accounts).toEqual(mockAccounts);
    expect(component.filteredAccounts).toEqual(mockAccounts);
  });

  it('should filter accounts based on search input', () => {
    const event = new Event('input');
    const input = document.createElement('input');
    input.value = mockAccount.accountNumber.toLowerCase();
    Object.defineProperty(event, 'target', { value: input });

    component.onSearchInput(event);

    expect(component.filteredAccounts.length).toBe(2);
  });

  it('should reset filters when search input is empty', () => {
    const event = new Event('input');
    const input = document.createElement('input');
    input.value = '';
    Object.defineProperty(event, 'target', { value: input });

    component.onSearchInput(event);

    expect(component.filteredAccounts).toEqual(component.accounts);
  });

  it('should open modal in edit mode', () => {
    component.onEditRow(mockAccount);

    expect(component.selectedAccount).toEqual(mockAccount);
    expect(component.isEditMode).toBe(true);
    expect(component.isModalOpen).toBe(true);
  });

  it('should handle modal close', () => {
    component.isModalOpen = true;
    component.isEditMode = true;
    component.selectedAccount = mockAccount;

    component.onModalClosed();

    expect(component.isModalOpen).toBe(false);
    expect(component.isEditMode).toBe(false);
    expect(component.selectedAccount).toBeUndefined();
  });

  it('should handle form submission', () => {
    const eventData: IEventAccountData = {
      data: mockAccount,
      isEdit: true
    };

    jest.spyOn(component, 'getAccounts');
    component.onFormSubmitted(eventData);

    expect(component.isModalOpen).toBe(false);
    expect(component.isEditMode).toBe(false);
    expect(component.selectedAccount).toBeUndefined();
    expect(component.getAccounts).toHaveBeenCalled();
  });

  it('should handle account deletion with confirmation', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    jest.spyOn(window, 'alert').mockImplementation();

    component.onDeleteRow(mockAccount);

    expect(confirmSpy).toHaveBeenCalled();
    expect(accountService.deleteAccount).toHaveBeenCalledWith(mockAccount.idAccount);
    expect(component.accounts).toEqual(mockAccounts);
  });

  it('should not delete account when confirmation is cancelled', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);

    component.onDeleteRow(mockAccount);

    expect(window.confirm).toHaveBeenCalled();
    expect(accountService.deleteAccount).not.toHaveBeenCalled();
  });

  it('should sort accounts by date in descending order', () => {
    const sorted = component.sortAccountByDate(mockAccounts);
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
