import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: string, hide: boolean = true): string {

    return hide ? value.replace(/./g, '*') : value;

  }

}
