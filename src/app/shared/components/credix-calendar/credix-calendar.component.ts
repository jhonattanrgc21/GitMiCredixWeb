import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-credix-calendar',
  templateUrl: './credix-calendar.component.html',
  styleUrls: ['./credix-calendar.component.scss']
})
export class CredixCalendarComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  date = new Date();
  selectedDate: Date;
  weeks: [Date[]?] = [];
  dayOfWeek = '';
  month = '';
  longMonth = '';

  constructor(public dialog: MatDialogRef<CredixCalendarComponent>) {
    this.getDate();
  }

  ngOnInit(): void {

  }

  getDate() {
    this.getDayOfWeek(this.date.getDay());
    this.getMonth(this.date.getMonth());
    this.getWeeksInMonth(this.date.getFullYear(), this.date.getMonth());
  }

  nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.getDate();
  }

  previousMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.getDate();
  }

  onDateClick(date: Date) {
    this.selectedDate = date;
  }

  submit() {
    this.dialog.close({date: this.selectedDate});
  }

  private getWeeksInMonth(year: number, month: number) {
    this.weeks = [];
    const daysInMonth: number = new Date(year, month + 1, 0).getDate();
    let dayOfWeek: number = new Date(year, month, 1).getDay();
    let week = [null, null, null, null, null, null, null];

    for (let i = 1; i <= daysInMonth; i++) {
      switch (dayOfWeek) {
        case 0 :
          week[0] = new Date(year, month, i);
          break;
        case 1 :
          week[1] = new Date(year, month, i);
          break;
        case 2 :
          week[2] = new Date(year, month, i);
          break;
        case 3 :
          week[3] = new Date(year, month, i);
          break;
        case 4 :
          week[4] = new Date(year, month, i);
          break;
        case 5 :
          week[5] = new Date(year, month, i);
          break;
        case 6 :
          week[6] = new Date(year, month, i);
          break;
      }

      if (dayOfWeek === 6 || i === daysInMonth) {
        this.weeks.push(week);
        week = [null, null, null, null, null, null, null];
      }

      dayOfWeek = new Date(year, month, i + 1).getDay();
    }
  }

  private getDayOfWeek(dayOfWeek: number) {
    switch (dayOfWeek) {
      case 0 :
        this.dayOfWeek = 'Dom';
        break;
      case 1 :
        this.dayOfWeek = 'Lun';
        break;
      case 2 :
        this.dayOfWeek = 'Mar';
        break;
      case 3 :
        this.dayOfWeek = 'Mie';
        break;
      case 4 :
        this.dayOfWeek = 'Jue';
        break;
      case 5 :
        this.dayOfWeek = 'Vir';
        break;
      case 6 :
        this.dayOfWeek = 'Sab';
        break;
    }
  }

  private getMonth(month: number) {
    switch (month) {
      case 0 :
        this.month = 'Ene';
        this.longMonth = 'Enero';
        break;
      case 1 :
        this.month = 'Feb';
        this.longMonth = 'Febrero';
        break;
      case 2 :
        this.month = 'Mar';
        this.longMonth = 'Marzo';
        break;
      case 3 :
        this.month = 'Abr';
        this.longMonth = 'Abril';
        break;
      case 4 :
        this.month = 'May';
        this.longMonth = 'Mayo';
        break;
      case 5 :
        this.month = 'Jun';
        this.longMonth = 'Junio';
        break;
      case 6 :
        this.month = 'Jul';
        this.longMonth = 'Julio';
        break;
      case 7 :
        this.month = 'Ago';
        this.longMonth = 'Agosto';
        break;
      case 8 :
        this.month = 'Sep';
        this.longMonth = 'Septiembre';
        break;
      case 9 :
        this.month = 'Oct';
        this.longMonth = 'Octubre';
        break;
      case 10 :
        this.month = 'Nov';
        this.longMonth = 'Noviembre';
        break;
      case 11 :
        this.month = 'Dic';
        this.longMonth = 'Diciembre';
        break;
    }
  }
}
