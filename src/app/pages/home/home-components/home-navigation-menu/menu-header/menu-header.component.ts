import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../../../../core/services/storage.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {
  avatar = 'assets/images/avatar.png';
  greetingMessage: string;

  constructor(private storageService: StorageService) {
    this.checkTime();
  }

  ngOnInit(): void {
    setInterval(this.checkTime, 1000 * 60 * 60);
  }

  getApplicantName(): string {
    return this.storageService.getCurrentUser().aplicantName;
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
