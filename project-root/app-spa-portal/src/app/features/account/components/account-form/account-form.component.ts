import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../shared/utils/shared-imports';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account/account.service';
import { IAccount } from '../../models/account.model';
import { IEventAccountData } from '../../models/event-account-data.model';
import { ACCOUNT_TYPE } from '../../../../shared/constants/account.const';
import { ISelectItem } from '../../../../shared/models/select-item.model';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { CustomerService } from '../../../customer/services/customer/customer.service';
import { ICustomer } from '../../../customer/models/customer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-form',
  imports: [...SHARED_IMPORTS, InputComponent, SelectComponent],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent implements OnInit, OnDestroy {
  @Input() account?: IAccount; // Datos opcionales si es edición
  @Input() isEdit: boolean = false; // Indica si es edición o creación
  @Output() submitted = new EventEmitter<IEventAccountData>();
  formAccount: FormGroup;
  accountTypeList: ISelectItem[] = ACCOUNT_TYPE;
  customers: ICustomer[] = [];
  subsList: Subscription[] = [];
  customerList: ISelectItem[] = [];

  constructor(private readonly fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService
  ) {
    this.formAccount = this.initForm();
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    console.log('AccountFormComponent destroyed');
    this.resetForm();
  }

  private initForm() {
    return this.fb.group({
      accountNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      accountType: ['', Validators.required],
      balance: [0.00, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // máximo 2 decimales
      status: [1, Validators.required],
      customerId: ['', Validators.required],
    });
  }

  get accountNumber() { return this.formAccount.get('accountNumber') as FormControl; }
  get accountType() { return this.formAccount.get('accountType') as FormControl; }
  get balance() { return this.formAccount.get('balance') as FormControl; }
  get status() { return this.formAccount.get('status') as FormControl; }
  get customerId() { return this.formAccount.get('customerId') as FormControl; }

  loadData() {
    if (this.account && this.isEdit) {
      this.formAccount.patchValue(this.account);
      this.balance.disable();
    }
    this.getCustomers();
  }

  onSubmit() {
    if (this.formAccount.valid) {
      this.onFormSubmitted();
    }
  }

  onCancel() {
    this.resetForm();
    this.submitted.emit();
  }

  resetForm() {
    this.formAccount.reset();
    this.isEdit = false;
    this.account = undefined;
    this.subsList.forEach(sub => sub.unsubscribe());
  }

  onFormSubmitted() {
    const data = { ...this.account, ...this.formAccount.value };
    if (this.isEdit) {
      this.updateAccount(data);
    } else {
      this.createAccount(data);
    }
  }

  createAccount(formData: IAccount) {
    this.accountService.createAccount(formData).subscribe(() => {
      this.onSubmitEmit();
    });
  }

  updateAccount(formData: IAccount) {
    this.accountService.updateAccount(formData.idAccount, formData).subscribe(() => {
      this.onSubmitEmit();
    });
  }

  onSubmitEmit() {
    this.submitted.emit({ data: { ...this.account, ...this.formAccount.value }, isEdit: this.isEdit });
    this.resetForm();
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


}
