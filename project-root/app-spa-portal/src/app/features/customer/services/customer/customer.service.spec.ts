import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';
import { SERVICE_URL_ENDPOINTS } from '../../../../core/config/service-url-endpoints';
import { ICustomer } from '../../models/customer.model';
import { IMessageResponse } from '../../../../shared/models/message-response.model';
import { provideHttpClient } from '@angular/common/http';
import { mockCustomer, newCustomer } from '../../mocks/customer.mock';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all customers', () => {
    const mockCustomers: ICustomer[] = [mockCustomer];

    service.getAllCustomers().subscribe({
      next: (customers) => expect(customers).toEqual(mockCustomers)
    });

    const req = httpMock.expectOne(SERVICE_URL_ENDPOINTS.CUSTOMERS_ALL);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
  });

  it('should get a customer by id', () => {
    const idCustomer = mockCustomer.idCustomer;

    service.getCustomer(idCustomer).subscribe({
      next: (customer) => expect(customer).toEqual(mockCustomer)
    });

    const req = httpMock.expectOne(`${SERVICE_URL_ENDPOINTS.CUSTOMER}/${idCustomer}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomer);
  });

  it('should create a customer', () => {
    service.createCustomer(newCustomer).subscribe({
      next: (customer) => expect(customer).toEqual(mockCustomer)
    });

    const req = httpMock.expectOne(SERVICE_URL_ENDPOINTS.CUSTOMER_CREATE);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCustomer);
    req.flush(mockCustomer);
  });

  it('should update a customer', () => {
    const idCustomer = mockCustomer.idCustomer;
    const updatedCustomer = { ...mockCustomer, firstName: 'Jane' };

    service.updateCustomer(idCustomer, updatedCustomer).subscribe({
      next: (customer) => expect(customer).toEqual(updatedCustomer)
    });

    const req = httpMock.expectOne(`${SERVICE_URL_ENDPOINTS.CUSTOMER}/${idCustomer}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCustomer);
    req.flush(updatedCustomer);
  });

  it('should update a customer partially', () => {
    const idCustomer = mockCustomer.idCustomer;
    const partialCustomer: ICustomer = {
      ...mockCustomer,
      firstName: 'Jane',
      phone: '555-9876'
    };

    service.updateCustomerPartial(idCustomer, partialCustomer).subscribe({
      next: (customer) => expect(customer).toEqual(partialCustomer)
    });

    const req = httpMock.expectOne(`${SERVICE_URL_ENDPOINTS.CUSTOMER}/${idCustomer}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(partialCustomer);
    req.flush(partialCustomer);
  });

  it('should delete a customer', () => {
    const idCustomer = mockCustomer.idCustomer;
    const mockResponse: IMessageResponse = {
      message: 'Customer deleted successfully'
    };

    service.deleteCustomer(idCustomer).subscribe({
      next: (response) => expect(response).toEqual(mockResponse)
    });

    const req = httpMock.expectOne(`${SERVICE_URL_ENDPOINTS.CUSTOMER}/${idCustomer}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});