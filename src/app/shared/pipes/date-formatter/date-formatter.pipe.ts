import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ConvertStringDateToDate} from '../../utils';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {
  private months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  private longMonths =
    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  transform(date: Date | string, format: 'numeric' | 'alphanumeric' | 'alphanumeric2' | 'shortAlphanumeric' | 'yearMonth' = 'numeric', locale: string = 'es')
    : string {
    let returnDate: Date;

    if (!date) {
      return '';
    }

    if (date instanceof Date) {
      returnDate = new Date(date);
    } else {
      returnDate = ConvertStringDateToDate(date);
    }

    switch (format) {
      case 'numeric':
        return new DatePipe(locale).transform(returnDate, 'dd/MM/yyyy');
      case 'alphanumeric':
        return `${returnDate.getDate()} ${this.months[returnDate.getMonth()]} ${returnDate.getFullYear()}`;
      case 'alphanumeric2':
        return `${returnDate.getDate()} ${this.longMonths[returnDate.getMonth()]} ${returnDate.getFullYear()}`;
      case 'shortAlphanumeric':
        return `${returnDate.getDate()} ${this.months[returnDate.getMonth()]} ${returnDate.getFullYear().toString().substring(2)}`;
      case 'yearMonth':
        return `${this.months[returnDate.getMonth()]} ${returnDate.getFullYear()}`;
      default:
        return new DatePipe(locale).transform(returnDate, 'dd/MM/yyyy');
    }
  }
}
