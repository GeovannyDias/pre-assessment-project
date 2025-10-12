import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerHomePage } from './customer-home.page';
import { CustomerService } from '../../services/customer/customer.service';
import { mockCustomer } from '../../mocks/customer.mock';
import { of } from 'rxjs';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEsEC from '@angular/common/locales/es-EC';
import { LOCALE_ID } from '@angular/core';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IEventCustomerData } from '../../models/event-customer-data.model';

describe('CustomerHomePage', () => {
  let component: CustomerHomePage;
  let fixture: ComponentFixture<CustomerHomePage>;
  let customerService: jest.MockedObject<CustomerService>;

  const mockCustomers = [
    { ...mockCustomer, createdAt: '2025-10-11T10:00:00Z' },
    { ...mockCustomer, idCustomer: '2', createdAt: '2025-10-10T10:00:00Z' }
  ];

  beforeEach(async () => {
    registerLocaleData(localeEsEC);
    customerService = {
      getAllCustomers: jest.fn().mockReturnValue(of(mockCustomers)),
      getCustomer: jest.fn(),
      updateCustomer: jest.fn(),
      updateCustomerPartial: jest.fn(),
      deleteCustomer: jest.fn().mockReturnValue(of({ message: 'Customer deleted successfully' })),
      createCustomer: jest.fn()
    } as jest.MockedObject<CustomerService>;

    await TestBed.configureTestingModule({
      imports: [
        CustomerHomePage,
        ModalComponent,
        TableComponent,
        InputComponent,
        ButtonComponent,
        CustomerFormComponent
      ],
      providers: [
        { provide: CustomerService, useValue: customerService },
        { provide: LOCALE_ID, useValue: 'es-EC' },
        DatePipe,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and sort customers on init', () => {
    expect(customerService.getAllCustomers).toHaveBeenCalled();
    expect(component.customers).toEqual(mockCustomers);
    expect(component.filteredCustomers).toEqual(mockCustomers);
  });

  it('should filter customers based on search input', () => {
    const event = new Event('input');
    const input = document.createElement('input');
    input.value = mockCustomer.firstName.toLowerCase();
    Object.defineProperty(event, 'target', { value: input });

    component.onSearchInput(event);

    expect(component.filteredCustomers.length).toBe(2);
  });

  it('should reset filters when search input is empty', () => {
    const event = new Event('input');
    const input = document.createElement('input');
    input.value = '';
    Object.defineProperty(event, 'target', { value: input });

    component.onSearchInput(event);

    expect(component.filteredCustomers).toEqual(component.customers);
  });

  it('should open modal in edit mode', () => {
    component.onEditRow(mockCustomer);

    expect(component.selectedCustomer).toEqual(mockCustomer);
    expect(component.isEditMode).toBe(true);
    expect(component.isModalOpen).toBe(true);
  });

  it('should handle modal close', () => {
    component.isModalOpen = true;
    component.isEditMode = true;
    component.selectedCustomer = mockCustomer;

    component.onModalClosed();

    expect(component.isModalOpen).toBe(false);
    expect(component.isEditMode).toBe(false);
    expect(component.selectedCustomer).toBeUndefined();
  });

  it('should handle form submission', () => {
    const eventData: IEventCustomerData = {
      data: mockCustomer,
      isEdit: true
    };

    jest.spyOn(component, 'getCustomers');
    component.onFormSubmitted(eventData);

    expect(component.isModalOpen).toBe(false);
    expect(component.isEditMode).toBe(false);
    expect(component.selectedCustomer).toBeUndefined();
    expect(component.getCustomers).toHaveBeenCalled();
  });

  it('should handle customer deletion with confirmation', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    jest.spyOn(window, 'alert').mockImplementation();

    component.onDeleteRow(mockCustomer);

    expect(confirmSpy).toHaveBeenCalled();
    expect(customerService.deleteCustomer).toHaveBeenCalledWith(mockCustomer.idCustomer);
    expect(component.customers).toEqual(mockCustomers);
  });

  it('should not delete customer when confirmation is cancelled', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);

    component.onDeleteRow(mockCustomer);

    expect(window.confirm).toHaveBeenCalled();
    expect(customerService.deleteCustomer).not.toHaveBeenCalled();
  });

  it('should sort customers by date in descending order', () => {
    const sorted = component.sortCustomerByDate(mockCustomers);
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
