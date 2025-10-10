import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransaction } from '../../models/transaction.model';
import { SERVICE_URL_ENDPOINTS } from '../../../../core/config/service-url-endpoints';
import { ITransactionParams } from '../../models/transaction-params.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private readonly http: HttpClient) { }

  getTransactionById(idTransaction: string) {
    return this.http.get<ITransaction>(`${SERVICE_URL_ENDPOINTS.TRANSACTION}/${idTransaction}`);
  }

  getTransactionByAccountIdAndDate(params: ITransactionParams) {
    const httpParams = new HttpParams()
      .set('accountId', params.accountId)
      .set('startDate', params.startDate)
      .set('endDate', params.endDate);
    return this.http.get<ITransaction[]>(SERVICE_URL_ENDPOINTS.TRANSACTIONS_FILTER, { params: httpParams });
  }

  createTransaction(data: ITransaction) {
    return this.http.post<ITransaction>(SERVICE_URL_ENDPOINTS.TRANSACTION_CREATE, data);
  }

  getTransactions() {
    return this.http.get<ITransaction[]>(SERVICE_URL_ENDPOINTS.TRANSACTIONS_ALL);
  }

}
