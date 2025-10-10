import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SHARED_IMPORTS } from '../../utils/shared-imports';
import { TableColumnConfig } from './config/table.config';

@Component({
  selector: 'app-table',
  imports: [...SHARED_IMPORTS],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true
})
export class TableComponent {
  @Input() columns: TableColumnConfig[] = [];
  @Input() data: any[] = [];
  @Input() actionColumnWidth: string = "100px";
  @Input() showActionsColumn: boolean = false;
  @Input() showSelectButon: boolean = false;
  @Input() showEditButon: boolean = false;
  @Input() showDeleteButon: boolean = false;

  @Output() selectRow = new EventEmitter<any>();
  @Output() editRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<any>();

  constructor() { }

  get visibleColumns(): TableColumnConfig[] {
    return this.columns.filter(col => col.visible !== false);
  }

  onEditRow(row: any) {
    this.editRow.emit(row);
  }

  onDeleteRow(row: any) {
    this.deleteRow.emit(row);
  }

  onSelectRow(row: any) {
    this.selectRow.emit(row);
  }



}
