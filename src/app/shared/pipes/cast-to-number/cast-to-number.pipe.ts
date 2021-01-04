import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'castToNumber'
})
export class CastToNumberPipe implements PipeTransform {

  transform(value: string): number {
    const separator = value.indexOf(',') > -1 ? ',' : '.';
    const integerValue = value.split(separator)[0].replace(/\./g, '');
    const decimalValue = value.split(separator)[1] ?
      value.split(separator)[1].substring(0, value.split(separator)[1].length === 2 ? 2 : 1)
      : '00';
    return Number(`${integerValue}.${decimalValue ? decimalValue : '00'}`);
  }

}
