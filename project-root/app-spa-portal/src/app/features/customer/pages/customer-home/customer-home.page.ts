import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ITableColumn } from '../../../../shared/models/table-column.model';
import { TABLE_COLUMN_CONFIG } from './config/table-config';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CustomerService } from '../../services/customer/customer.service';
import { ICustomer } from '../../models/customer.model';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { IEventCustomerData } from '../../models/event-customer-data.model';

@Component({
  selector: 'app-customer-home',
  imports: [TableComponent, InputComponent, ButtonComponent, ModalComponent, CustomerFormComponent],
  templateUrl: './customer-home.page.html',
  styleUrl: './customer-home.page.scss'
})
export class CustomerHomePage implements OnInit, OnDestroy {
  columns: ITableColumn[] = TABLE_COLUMN_CONFIG;
  customers: ICustomer[] = [];
  filteredCustomers: ICustomer[] = [];
  subsList: Subscription[] = [];
  isModalOpen = false;
  selectedCustomer?: ICustomer;
  isEditMode: boolean = false;

  constructor(private readonly customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  ngOnDestroy() {
    this.subsList.forEach(sub => sub.unsubscribe());
  }

  getCustomers() {
    const subs = this.customerService.getAllCustomers().subscribe((data) => {
      this.customers = this.sortCustomerByDate(data);
      this.filteredCustomers = this.customers;
      this.subsList.push(subs);
    });
  }

  onEditRow(row: ICustomer) {
    this.selectedCustomer = row;
    this.isEditMode = true;
    this.openModal();
  }

  onDeleteRow(row: ICustomer) {
    const confirmed = window.confirm(`¿Estás seguro de querer eliminar este registro?`);
    if (!confirmed) {
      return;
    }
    this.customerService.deleteCustomer(row.idCustomer).subscribe((res) => {
      this.getCustomers();
      alert(res.message);
    });
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!value) {
      this.filteredCustomers = this.customers;
      return;
    }
    const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normalizar cadenas: elimina acentos y tildes
    this.filteredCustomers = this.customers.filter((customer) => {
      const searchableString = normalize(Object.values(customer)
        .map(fieldValue => (typeof fieldValue === 'string' ? fieldValue.toLowerCase() : '')).join(' ')
      );
      const normalizedValue = normalize(value);
      return searchableString.includes(normalizedValue);
    });
  }

  // Modal Control

  openModal() {
    this.isModalOpen = true;
  }

  onModalClosed() {
    console.log('Modal closed');
    this.resetData();
  }

  onModalOpened() {
    console.log('Modal opened');
  }


  // Customer Form Control

  onFormSubmitted(event: IEventCustomerData) {
    if (!event) {
      this.resetData();
      return;
    }

    this.resetData();
    this.getCustomers();

  }

  resetData() {
    this.isModalOpen = false;
    this.isEditMode = false;
    this.selectedCustomer = undefined;
  }

  sortCustomerByDate(customerList: ICustomer[]) {
    return customerList.sort((a, b) => {
      return b.createdAt.localeCompare(a.createdAt); // Orden descendente
    });
  }


}
