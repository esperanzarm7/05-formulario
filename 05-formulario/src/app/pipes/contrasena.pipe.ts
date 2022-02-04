import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {
    if (value == true) {
      return 'text';
    } else {
      return 'password';
    }
  }
}
