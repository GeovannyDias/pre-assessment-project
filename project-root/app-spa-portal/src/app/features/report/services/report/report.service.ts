import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReportRequest, ITransactionReport } from '../../models/report-request.model';
import { IReportResponse } from '../../models/report-response.model';
import { SERVICE_URL_ENDPOINTS } from '../../../../core/config/service-url-endpoints';
import { ICustomer } from '../../../customer/models/customer.model';
import { IAccount } from '../../../account/models/account.model';
import { ITransaction } from '../../../transaction/models/transaction.model';
import { formatAccountType } from '../../../../shared/utils/format-account';
import { formatStatus } from '../../../../shared/utils/format-status';
import { formatAmountForTransactionType } from '../../../../shared/utils/format-transaction';
import { formatDateTimeUsingPipe } from '../../../../shared/utils/format-date-time';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private readonly http: HttpClient) { }

  generateReport(data: IReportRequest) {
    return this.http.post<IReportResponse>(SERVICE_URL_ENDPOINTS.REPORT_TRANSACTIONS, data);
  }

  prepareReportData(customer: ICustomer, account: IAccount, transactions: ITransaction[]): IReportRequest {
    const transactionsData: ITransactionReport[] = transactions.map(transaction => ({
      date: formatDateTimeUsingPipe(transaction.createdAt, 'dd/MM/yyyy'),
      balanceBefore: transaction.balanceBefore.toString(),
      accountStatus: formatStatus(account.status),
      amount: formatAmountForTransactionType(transaction.amount, transaction),
      balanceAfter: transaction.balanceAfter.toString()
    }));

    const data: IReportRequest = {
      customerName: `${customer.firstName} ${customer.lastName}`,
      accountNumber: account.accountNumber,
      accountType: formatAccountType(account.accountType),
      accountStatus: formatStatus(account.status),
      transactions: transactionsData
    };
    return data;
  }




}
