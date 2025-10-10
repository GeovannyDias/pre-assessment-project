import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SHARED_IMPORTS } from '../../utils/shared-imports';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
  imports: [SHARED_IMPORTS],
  standalone: true
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = "";
  @Input() type: string = "text";
  @Input() placeholder: string = "";
  @Input() required: boolean = false;
  @Input() minlength: number | string = "";
  @Input() maxlength: number | string = "";

  @Input() field: object | number | boolean | string = ''; // se controla desde formulario reactivo, delete @Input() si es necesario
  @Input() isDisabled: boolean = false; // se controla desde formulario reactivo, delete @Input() si es necesario

  onChangeFn: (value: any) => void = () => { };
  onTouchedFn = () => { };

  constructor() { }

  writeValue(value: any): void {
    this.field = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleChange(value: any): void {
    const processedValue = (this.type === 'number' && value !== '') ? Number(value) : value; // Si es number, convierte a número (pero permite vacío)
    this.field = processedValue;
    this.onChangeFn(processedValue);
  }

}
