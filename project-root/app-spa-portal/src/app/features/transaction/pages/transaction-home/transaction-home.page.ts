import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ITableColumn } from '../../../../shared/models/table-column.model';
import { TABLE_COLUMN_CONFIG } from './config/table-config';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ITransaction } from '../../models/transaction.model';
import { Subscription } from 'rxjs';
import { TransactionService } from '../../services/transaction/transaction.service';
import { IEventTransactionData } from '../../models/event-transaction-data.model';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-transaction-home',
  imports: [TableComponent, InputComponent, ButtonComponent, ModalComponent, TransactionFormComponent],
  templateUrl: './transaction-home.page.html',
  styleUrl: './transaction-home.page.scss'
})
export class TransactionHomePage implements OnInit, OnDestroy {
  columns: ITableColumn[] = TABLE_COLUMN_CONFIG;
  transactions: ITransaction[] = [];
  filteredTransactions: ITransaction[] = [];
  subsList: Subscription[] = [];
  isModalOpen = false;

  constructor(private readonly transactionService: TransactionService) { }

  ngOnInit() {
    this.getTransactions()
  }

  ngOnDestroy() {
    this.subsList.forEach(sub => sub.unsubscribe());
  }

  getTransactions() {
    const subs = this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = this.sortAccountByDate(data);
      this.filteredTransactions = this.transactions;
      this.subsList.push(subs);
    });
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!value) {
      this.filteredTransactions = this.transactions;
      return;
    }
    const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Normalizar cadenas: elimina acentos y tildes
    this.filteredTransactions = this.transactions.filter((transaction) => {
      const searchableString = normalize(Object.values(transaction)
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


  // Transaction Form Control

  onFormSubmitted(event: IEventTransactionData) {
    if (!event) {
      this.resetData();
      return;
    }
    this.resetData();
    this.getTransactions();
  }

  resetData() {
    this.isModalOpen = false;
  }

  sortAccountByDate(transactiontList: ITransaction[]) {
    return transactiontList.sort((a, b) => {
      return b.createdAt.localeCompare(a.createdAt); // Orden descendente
    });
  }


}
