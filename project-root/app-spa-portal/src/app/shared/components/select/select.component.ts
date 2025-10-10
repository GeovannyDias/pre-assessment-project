import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectConfigItem } from "./config/select-config.model";
import { SHARED_IMPORTS } from '../../utils/shared-imports';

const CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'app-select',
  imports: [...SHARED_IMPORTS],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR],
  standalone: true
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string = "";
  @Input() placeholder: string = ""; // + required = true
  @Input() required: boolean = false;
  @Input() data: ISelectConfigItem[] = [];
  field: number | boolean | string = '';
  isDisabled: boolean = false;

  onChangeFn = (_?: any) => { };
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

}
