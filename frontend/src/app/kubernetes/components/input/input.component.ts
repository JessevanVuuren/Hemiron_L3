import {
  Component,
  Input,
  Optional,
  Self,
} from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl } from "@angular/forms";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss",
})
export class InputComponent implements ControlValueAccessor{
  @Input() placeholder!: string;
  @Input() disabled!: boolean;
  @Input() type!: string;
  @Input() id!: string;
  @Input() ngStyle: any;
  @Input() required!: boolean;
  control?: FormControl;

  protected value: string = "";

  constructor(
  ) {}

  public writeValue(value: any): void {
    this.value = value;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onChange(event: any) {}

  public onTouched() {}
}
