import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ITableColumn } from '../../../../shared/models/table-column.model';
import { TABLE_COLUMN_CONFIG } from './config/table-config';
import { IEventAccountData } from '../../models/event-account-data.model';
import { IAccount } from '../../models/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account/account.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { AccountFormComponent } from '../../components/account-form/account-form.component';

@Component({
  selector: 'app-account-home',
  imports: [TableComponent, InputComponent, ButtonComponent, ModalComponent, AccountFormComponent],
  templateUrl: './account-home.page.html',
  styleUrl: './account-home.page.scss'
})
export class AccountHomePage implements OnInit, OnDestroy {
  columns: ITableColumn[] = TABLE_COLUMN_CONFIG;
  accounts: IAccount[] = [];
  filteredAccounts: IAccount[] = [];
  subsList: Subscription[] = [];
  isModalOpen = false;
  selectedAccount?: IAccount;
  isEditMode: boolean = false;

  constructor(private readonly accountService: AccountService) { }

  ngOnInit() {
    this.getAccounts();
  }

  ngOnDestroy() {
    this.subsList.forEach(sub => sub.unsubscribe());
  }

  getAccounts() {
    const subs = this.accountService.getAllAccounts().subscribe((data) => {
      this.accounts = this.sortAccountByDate(data);
      this.filteredAccounts = this.accounts;
      this.subsList.push(subs);
    });
  }

  onEditRow(row: IAccount) {
    this.selectedAccount = row;
    this.isEditMode = true;
    this.openModal();
  }

  onDeleteRow(row: IAccount) {
    const confirmed = window.confirm(`¿Estás seguro de querer eliminar este registro?`);
    if (!confirmed) {
      return;
    }
    this.accountService.deleteAccount(row.idAccount).subscribe((res) => {
      this.getAccounts();
      alert(res.message);
    });
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!value) {
      this.filteredAccounts = this.accounts;
      return;
    }
    const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normalizar cadenas: elimina acentos y tildes
    this.filteredAccounts = this.accounts.filter((account) => {
      const searchableString = normalize(Object.values(account).map(fieldValue => {
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase();
        }
        if (fieldValue && typeof fieldValue === 'object' && fieldValue.firstName && fieldValue.lastName) {
          return normalize(`${fieldValue.firstName} ${fieldValue.lastName}`).toLowerCase();
        }
        if (typeof fieldValue === 'number') {
          return fieldValue.toString();
        }
        return '';
      }).join(' '));
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

  // Account Form Control

  onFormSubmitted(event: IEventAccountData) {
    if (!event) {
      this.resetData();
      return;
    }
    this.resetData();
    this.getAccounts();
  }

  resetData() {
    this.isModalOpen = false;
    this.isEditMode = false;
    this.selectedAccount = undefined;
  }

  sortAccountByDate(accountList: IAccount[]) {
    return accountList.sort((a, b) => {
      return b.createdAt.localeCompare(a.createdAt); // Orden descendente
    });
  }



}
