import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ITransaction } from '../../models/transaction.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../../../shared/utils/shared-imports';
import { IEventTransactionData } from '../../models/event-transaction-data.model';
import { TransactionService } from '../../services/transaction/transaction.service';
import { ISelectItem } from '../../../../shared/models/select-item.model';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { CustomerService } from '../../../customer/services/customer/customer.service';
import { AccountService } from '../../../account/services/account/account.service';
import { ICustomer } from '../../../customer/models/customer.model';
import { Subscription } from 'rxjs';
import { IAccount } from '../../../account/models/account.model';
import { formatAccountType } from '../../../../shared/utils/format-account';
import { TRANSACTION_TYPE } from '../../../../shared/constants/transaction.const';

@Component({
  selector: 'app-transaction-form',
  imports: [...SHARED_IMPORTS, InputComponent, SelectComponent],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent implements OnInit, OnDestroy {
  @Output() submitted = new EventEmitter<IEventTransactionData>();
  formTransaction: FormGroup;
  customerList: ISelectItem[] = [];
  accountList: ISelectItem[] = [];
  accouns: IAccount[] = [];
  subsList: Subscription[] = [];
  customerId: FormControl = new FormControl({ value: '', disabled: false }, Validators.required);
  balance: FormControl = new FormControl({ value: 0.00, disabled: true }, Validators.required);
  transactionTypeList: ISelectItem[] = TRANSACTION_TYPE;
  descriptionAuto: string = '';

  constructor(private readonly fb: FormBuilder,
    private readonly transactionService: TransactionService,
    private readonly customerService: CustomerService,
    private readonly accountService: AccountService
  ) {
    this.formTransaction = this.initForm();
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    console.log('TransactionFormComponent destroyed');
    this.resetForm();
  }

  private initForm() {
    return this.fb.group({
      accountId: ['', Validators.required],
      type: ['', Validators.required], // 'DEBIT' o 'CREDIT'
      amount: [0.00, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0.01)]], // máximo 2 decimales y mayor a 0
      description: ['', Validators.required]
    });
  }

  get accountId() { return this.formTransaction.get('accountId') as FormControl; }
  get type() { return this.formTransaction.get('type') as FormControl; }
  get amount() { return this.formTransaction.get('amount') as FormControl; }
  get description() { return this.formTransaction.get('description') as FormControl; }

  loadData() {
    this.getCustomers();
    this.accountId.disable();
    this.description.disable();
  }

  onSubmit() {
    this.formTransaction.markAllAsTouched();
    if (this.formTransaction.valid) {
      this.onFormSubmitted();
    }
  }

  onCancel() {
    this.resetForm();
    this.submitted.emit();
  }

  resetForm() {
    this.formTransaction.reset();
    this.balance.reset(0.00);
    this.subsList.forEach(sub => sub.unsubscribe());
  }

  onFormSubmitted() {
    this.createTransaction(this.formTransaction.getRawValue());
  }

  createTransaction(formData: ITransaction) {
    this.transactionService.createTransaction(formData).subscribe(() => {
      this.onSubmitEmit();
    });
  }

  onSubmitEmit() {
    this.submitted.emit({ data: this.formTransaction.getRawValue(), isEdit: false });
    this.resetForm();
  }

  getCustomers() {
    const subs = this.customerService.getAllCustomers().subscribe((data) => {
      this.customerList = this.mapCustomersToSelectItems(data);
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
    if (this.customerId.value) {
      this.getAccountsByCustomerId(this.customerId.value);
      this.accountId.enable();
    } else {
      this.accountList = [];
      this.accountId.reset();
      this.accountId.disable();
    }
  }

  getAccountsByCustomerId(customerId: string) {
    const subs = this.accountService.getAccountByCustomerId(customerId).subscribe((data) => {
      this.accouns = data;
      this.accountList = this.mapAccountsToSelectItems(data);
      this.subsList.push(subs);
    });
  }

  mapAccountsToSelectItems(accounts: IAccount[]): ISelectItem[] {
    return accounts.map(account => ({
      value: account.idAccount,
      label: `${account.accountNumber} - ${formatAccountType(account.accountType)}`
    }));
  };

  onDescriptionTypeInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value === this.transactionTypeList[0].value) {
      this.descriptionAuto = 'Depósito de';
    }
    if (value === this.transactionTypeList[1].value) {
      this.descriptionAuto = 'Retiro de';
    }
    this.amount.setValue(0);
    this.description.setValue(`${this.descriptionAuto} ${this.amount.value}`);
  }

  onDescriptionAmountInput() {
    this.description.setValue(`${this.descriptionAuto} ${this.amount.value}`);
  }

  onAccountSelected(event: Event) {
    const idAccount = (event.target as HTMLInputElement).value;
    const selectedAccount = this.accouns.find(account => account.idAccount === idAccount);
    this.balance.setValue(selectedAccount ? selectedAccount.balance : 0.00);
  }

}
