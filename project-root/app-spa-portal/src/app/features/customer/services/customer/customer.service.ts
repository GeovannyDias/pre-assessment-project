import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE_URL_ENDPOINTS } from '../../../../core/config/service-url-endpoints';
import { ICustomer } from '../../models/customer.model';
import { IMessageResponse } from '../../../../shared/models/message-response.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private readonly http: HttpClient) { }

  getAllCustomers() {
    return this.http.get<ICustomer[]>(SERVICE_URL_ENDPOINTS.CUSTOMERS_ALL);
  }

  getCustomer(idCustomer: string) {
    return this.http.get<ICustomer>(`${SERVICE_URL_ENDPOINTS.CUSTOMER}/${idCustomer}`);
  }

  updateCustomer(idCustomer: string, data: ICustomer) {
    return this.http.put<ICustomer>(`${SERVICE_URL_ENDPOINTS.CUSTOMER}/${idCustomer}`, data);
  }

  updateCustomerPartial(idCustomer: string, data: ICustomer) {
    return this.http.patch<ICustomer>(`${SERVICE_URL_ENDPOINTS.CUSTOMER}/${idCustomer}`, data);
  }

  deleteCustomer(idCustomer: string) {
    return this.http.delete<IMessageResponse>(`${SERVICE_URL_ENDPOINTS.CUSTOMER}/${idCustomer}`);
  }

  createCustomer(data: ICustomer) {
    return this.http.post<ICustomer>(SERVICE_URL_ENDPOINTS.CUSTOMER_CREATE, data);
  }

}
