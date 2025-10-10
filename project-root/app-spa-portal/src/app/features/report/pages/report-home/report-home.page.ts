import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITableColumn } from '../../../../shared/models/table-column.model';
import { TABLE_COLUMN_CONFIG } from './config/table-config';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { CustomerService } from '../../../customer/services/customer/customer.service';
import { AccountService } from '../../../account/services/account/account.service';
import { ISelectItem } from '../../../../shared/models/select-item.model';
import { IAccount } from '../../../account/models/account.model';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../../../shared/utils/shared-imports';
import { ICustomer } from '../../../customer/models/customer.model';
import { formatAccountType } from '../../../../shared/utils/format-account';
import { TransactionService } from '../../../transaction/services/transaction/transaction.service';
import { ITransactionParams } from '../../../transaction/models/transaction-params.model';
import { ITransaction, ITransactionReport } from '../../../transaction/models/transaction.model';
import { ReportService } from '../../services/report/report.service';

@Component({
  selector: 'app-report-home',
  imports: [...SHARED_IMPORTS, TableComponent, InputComponent, ButtonComponent, SelectComponent],
  templateUrl: './report-home.page.html',
  styleUrl: './report-home.page.scss'
})
export class ReportHomePage implements OnInit, OnDestroy {
  columns: ITableColumn[] = TABLE_COLUMN_CONFIG;
  customerList: ISelectItem[] = [];
  customers: ICustomer[] = [];
  customer: ICustomer | null = null;
  accountList: ISelectItem[] = [];
  account: IAccount | null = null;
  accounts: IAccount[] = [];
  transactions: ITransaction[] = [];
  subsList: Subscription[] = [];

  formTransaction: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly accountService: AccountService,
    private readonly transactionService: TransactionService,
    private readonly reportService: ReportService
  ) {
    this.formTransaction = this.initForm();
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    console.log('ReportHomePage destroyed');
    this.subsList.forEach(sub => sub.unsubscribe());
  }


  private initForm() {
    return this.fb.group({
      customerId: ['', Validators.required],
      accountId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  get customerId() { return this.formTransaction.get('customerId') as FormControl; }
  get accountId() { return this.formTransaction.get('accountId') as FormControl; }
  get startDate() { return this.formTransaction.get('startDate') as FormControl; }
  get endDate() { return this.formTransaction.get('endDate') as FormControl; }

  onSubmit() {
    this.formTransaction.markAllAsTouched();
    if (this.formTransaction.valid) {
      this.onFormSubmitted();
    }
  }

  onFormSubmitted() {
    const params: ITransactionParams = {
      accountId: this.accountId.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value
    };
    this.getTransactionFilter(params);
  }

  loadData() {
    this.getCustomers();
    this.accountId.disable();
  }

  getCustomers() {
    const subs = this.customerService.getAllCustomers().subscribe((data) => {
      this.customers = data;
      this.customerList = this.mapCustomersToSelectItems(this.customers);
      this.subsList.push(subs);
    });
  }

  mapCustomersToSelectItems(customers: ICustomer[]): ISelectItem[] {
    return customers.map(customer => ({
      value: customer.idCustomer,
      label: `${customer.firstName} ${customer.lastName}`
    }));
  };

  onCustomerSelected(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.customerId.setValue(value);
    if (this.customerId.valid && this.customerId.value) {
      this.customer = this.customers.find(customer => customer.idCustomer === this.customerId.value)!;
      this.getAccountsByCustomerId(this.customerId.value);
      this.accountId.enable();
    } else {
      this.accountList = [];
      this.accountId.reset('');
      this.accountId.disable();
    }
  }

  getAccountsByCustomerId(customerId: string) {
    const subs = this.accountService.getAccountByCustomerId(customerId).subscribe((data) => {
      this.accounts = data;
      this.accountList = this.mapAccountsToSelectItems(this.accounts);
      this.subsList.push(subs);
    });
  }

  mapAccountsToSelectItems(accounts: IAccount[]): ISelectItem[] {
    return accounts.map(account => ({
      value: account.idAccount,
      label: `${account.accountNumber} - ${formatAccountType(account.accountType)}`
    }));
  };


  onAccountSelected(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.accountId.setValue(value);
    if (this.customerId.valid && this.customerId.value) {
      this.account = this.accounts.find(acc => acc.idAccount === this.accountId.value)!;
    }
  }

  getTransactionFilter(params: ITransactionParams) {
    const subs = this.transactionService.getTransactionByAccountIdAndDate(params).subscribe((data) => {
      const transactionList = this.addCustomerToTransactions(data, this.customer!);
      this.transactions = this.sortAccountByDate(transactionList);
      this.subsList.push(subs);
    });
  }

  sortAccountByDate(transactiontList: ITransaction[]) {
    return transactiontList.sort((a, b) => {
      return b.createdAt.localeCompare(a.createdAt); // Orden descendente
    });
  }

  addCustomerToTransactions(transactions: ITransaction[], customer: ICustomer): ITransactionReport[] {
    return transactions.map(transaction => {
      return {
        ...transaction,
        customer: customer
      };
    });
  }

  generateReport() {
    if (!this.customer || !this.account || this.transactions.length === 0) {
      alert('No existe datos para generar el reporte.');
      return;
    }
    const reportData = this.reportService.prepareReportData(this.customer, this.account, this.transactions);
    this.reportService.generateReport(reportData).subscribe(response => {
      this.openBase64Pdf(response.reportBase64);
    });

  }

  openBase64Pdf(base64Data: string) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  }

  resetReport() {
    this.formTransaction.reset();
    this.accountList = [];
    this.customer = null;
    this.account = null;
    this.transactions = [];
    this.accountId.reset('');
    this.accountId.disable();
  }



}
