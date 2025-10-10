import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { SHARED_IMPORTS } from '../../utils/shared-imports';

@Component({
  selector: 'app-modal',
  imports: [...SHARED_IMPORTS],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit, OnChanges, OnDestroy {

  @Input() title: string = 'Modal';
  @Input() isOpen: boolean = false;
  @Input() closeOnBackdropClick: boolean = true;

  @Output() closed = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  ngOnInit() {
    console.log('ModalComponent initialized');
  }

  ngOnDestroy() {
    console.log('ModalComponent destroyed');
  }

  ngOnChanges() {
    if (this.isOpen) {
      this.opened.emit();
    }
  }

  closeModal() {
    this.isOpen = false;
    this.closed.emit();
  }

  handleBackdropClick() {
    if (this.closeOnBackdropClick) {
      this.closeModal();
    }
  }


}
