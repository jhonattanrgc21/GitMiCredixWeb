import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(date: Date | string, format: 'numeric' | 'alphanumeric' = 'numeric', locale: string = 'es'): string {
    let returnDate;

    if (date instanceof Date) {
      returnDate = new Date(date);
    } else {
      returnDate = new Date(Number(date.split('/')[2]), Number(date.split('/')[1]), Number(date.split('/')[0]));
    }

    if (format === 'numeric') {
      return new DatePipe(locale).transform(returnDate, 'dd/MM/yyyy');
    } else {
      return `${returnDate.getDate()} ${this.getAlphaNumericMonth(returnDate.getMonth())} ${returnDate.getFullYear()}`;
    }
  }

  getAlphaNumericMonth(month: number): string {
    switch (month) {
      case 0:
        return 'Ene';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Abr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Ago';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dic';
      default:
        return 'Ene';
    }
  }

}
