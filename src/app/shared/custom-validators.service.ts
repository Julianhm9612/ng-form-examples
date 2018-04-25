import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable()
export class CustomValidatorsService {

  constructor() {
  }

  valueNotIn(fieldName) {
    return function (input: FormControl) {
      const fieldRef = input.root.get(fieldName);
      if (fieldRef && fieldRef.value && fieldRef.value.length > 0
        && input.value && input.value.length > 0
        && input.value.toLowerCase().includes(fieldRef.value.toLowerCase())) {
        return {
          valueNotIn: true
        };
      }
      return null;
    };
  }

  nonSpecialCharacters(input: FormControl) {
    if (/[@#$%^&*()_\[\]\\|<>\/]/.test(input.value) === true) {
      console.log('da fuck');
      return {
        nonSpecialCharacters: true
      };
    }
    return null;
  }
}
