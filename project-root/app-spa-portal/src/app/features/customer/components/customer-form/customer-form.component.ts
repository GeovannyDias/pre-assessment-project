import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../../../shared/utils/shared-imports';
import { ICustomer } from '../../models/customer.model';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { IEventCustomerData } from '../../models/event-customer-data.model';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-customer-form',
  imports: [...SHARED_IMPORTS, InputComponent],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  @Input() customer?: ICustomer; // Datos opcionales si es edición
  @Input() isEdit: boolean = false; // Indica si es edición o creación
  @Output() submitted = new EventEmitter<IEventCustomerData>();
  formCustomer: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly customerService: CustomerService
  ) {
    this.formCustomer = this.initForm();
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    console.log('CustomerFormComponent destroyed');
    this.resetForm();
  }

  private initForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identification: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  get firstName() { return this.formCustomer.get('firstName') as FormControl; }
  get lastName() { return this.formCustomer.get('lastName') as FormControl; }
  get identification() { return this.formCustomer.get('identification') as FormControl; }
  get address() { return this.formCustomer.get('address') as FormControl; }
  get phone() { return this.formCustomer.get('phone') as FormControl; }

  loadData() {
    if (this.customer && this.isEdit) {
      this.formCustomer.patchValue(
        this.customer
      );
      this.formCustomer.get('identification')?.disable(); // Identificación no editable
    }
  }

  onSubmit() {
    if (this.formCustomer.valid) {
      this.onFormSubmitted();
    }
  }

  onCancel() {
    this.resetForm();
    this.submitted.emit();
  }

  resetForm() {
    this.formCustomer.reset();
    this.isEdit = false;
    this.customer = undefined;
  }

  onFormSubmitted() {
    const data = { ...this.customer, ...this.formCustomer.value };
    if (this.isEdit) {
      this.updateCustomer(data);
    } else {
      this.createCustomer(data);
    }
  }

  createCustomer(formData: ICustomer) {
    this.customerService.createCustomer(formData).subscribe(() => {
      this.onSubmitEmit();
    });
  }

  updateCustomer(formData: ICustomer) {
    this.customerService.updateCustomer(formData.idCustomer, formData).subscribe(() => {
      this.onSubmitEmit();
    });
  }

  onSubmitEmit() {
    this.submitted.emit({ data: { ...this.customer, ...this.formCustomer.value }, isEdit: this.isEdit });
    this.resetForm();
  }


}
