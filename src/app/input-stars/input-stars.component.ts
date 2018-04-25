import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input-stars',
  templateUrl: './input-stars.component.html',
  styleUrls: ['./input-stars.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputStarsComponent),
      multi: true,
    }
  ]
})
export class InputStarsComponent implements OnInit, ControlValueAccessor {
  onChange;
  onTouched;
  value = 0;
  values = [];

  constructor() {
  }

  ngOnInit() {
    this.value = this.value || 5;
    this.values = Array(this.value).fill(1).map((x, i) => i + 1);
  }

  onClick(value) {
    this.value = value;
    this.onChange(value);
    this.onTouched(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
