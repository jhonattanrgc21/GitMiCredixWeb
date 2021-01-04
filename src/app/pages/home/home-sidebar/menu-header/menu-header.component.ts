import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../../../core/services/storage.service';
import {ApplicantApiService, cleanProfilePhoto$} from '../../../../core/services/applicant-api.service';
import {startWith} from 'rxjs/operators';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {
  profilePhoto = 'assets/images/avatar-icon.svg';
  applicantName = '';
  greetingMessage: string;

  constructor(private storageService: StorageService,
              private applicantApiService: ApplicantApiService) {
    this.checkTime();
  }

  ngOnInit(): void {
    this.getApplicantProfilePhoto();
    this.getApplicantName();
    setInterval(this.checkTime, 1000 * 60 * 60);
  }

  getApplicantProfilePhoto(): void {
    cleanProfilePhoto$.asObservable()
      .pipe(startWith(1))
      .subscribe(() =>
        this.applicantApiService.getApplicantProfilePhoto().subscribe(profilePhoto => {
          this.profilePhoto = profilePhoto ? `data:image/png;base64,${profilePhoto}` : 'assets/images/avatar-icon.svg';
        }));
  }

  getApplicantName() {
    this.applicantName = this.storageService.getCurrentUser().aplicantName;
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
