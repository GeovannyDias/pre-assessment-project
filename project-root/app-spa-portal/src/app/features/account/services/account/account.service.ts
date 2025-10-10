import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccount } from '../../models/account.model';
import { IMessageResponse } from '../../../../shared/models/message-response.model';
import { SERVICE_URL_ENDPOINTS } from '../../../../core/config/service-url-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private readonly http: HttpClient) { }

  getAllAccounts() {
    return this.http.get<IAccount[]>(SERVICE_URL_ENDPOINTS.ACCOUNTS_ALL);
  }

  getAccount(idAccount: string) {
    return this.http.get<IAccount>(`${SERVICE_URL_ENDPOINTS.ACCOUNT}/${idAccount}`);
  }

  updateAccount(idAccount: string, data: IAccount) {
    return this.http.put<IAccount>(`${SERVICE_URL_ENDPOINTS.ACCOUNT}/${idAccount}`, data);
  }

  updateAccountPartial(idAccount: string, data: IAccount) {
    return this.http.patch<IAccount>(`${SERVICE_URL_ENDPOINTS.ACCOUNT}/${idAccount}`, data);
  }

  deleteAccount(idAccount: string) {
    return this.http.delete<IMessageResponse>(`${SERVICE_URL_ENDPOINTS.ACCOUNT}/${idAccount}`);
  }

  createAccount(data: IAccount) {
    return this.http.post<IAccount>(SERVICE_URL_ENDPOINTS.ACCOUNT_CREATE, data);
  }

  getAccountByCustomerId(idCustomer: string) {
    return this.http.get<IAccount[]>(`${SERVICE_URL_ENDPOINTS.ACCOUNTS_CUSTOMER}/${idCustomer}`);
  }


}
