import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ConvertStringDateToDate} from '../../utils';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {
  private months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  transform(date: Date | string, format: 'numeric' | 'alphanumeric' | 'yearMonth' = 'numeric', locale: string = 'es'): string {
    let returnDate: Date;

    if (!date) {
      return '';
    }

    if (date instanceof Date) {
      returnDate = new Date(date);
    } else {
      returnDate = ConvertStringDateToDate(date);
    }

    if (format === 'numeric') {
      return new DatePipe(locale).transform(returnDate, 'dd/MM/yyyy');
    } else if (format === 'alphanumeric') {
      return `${returnDate.getDate()} ${this.months[returnDate.getMonth()]} ${returnDate.getFullYear()}`;
    } else {
      return `${this.months[returnDate.getMonth()]} ${returnDate.getFullYear()}`;
    }
  }
}
