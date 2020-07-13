import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {
  @Input() username: string;
  @Input() avatar: string;
  greetingMessage: string;

  constructor() {
    this.checkTime();
  }

  ngOnInit(): void {
    setInterval(this.checkTime, 1000 * 60 * 60);
  }

  checkTime() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greetingMessage = '¡Buenos días!';
    } else if (currentHour < 18) {
      this.greetingMessage = '¡Buenas tardes!';
    } else {
      this.greetingMessage = '¡Buenas noches!';
    }
  }
}
