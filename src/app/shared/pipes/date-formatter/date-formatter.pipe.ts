import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(date: Date | string, format: 'numeric' | 'alphanumeric' = 'numeric', locale: string = 'es'): string {
    date = new Date(date);
    if (format === 'numeric') {
      return new DatePipe(locale).transform(date, 'dd/MM/yyyy');
    } else {
      return `${date.getDate()} ${this.getAlphaNumericMonth(date.getMonth())} ${date.getFullYear()}`;
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
