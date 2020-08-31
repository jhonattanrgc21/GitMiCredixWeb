import {Component, OnInit} from '@angular/core';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-digital-payments',
  templateUrl: './digital-payments.component.html',
  styleUrls: ['./digital-payments.component.scss']
})
export class DigitalPaymentsComponent implements OnInit {
  copyId = 0;

  constructor(private toastService: CredixToastService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  copyIbanAccount(text: string, id: 1 | 2 | 3 | 4) {
    this.copyId = id;
    this.toastService.show({text, type: 'success'});
    setTimeout(() => this.copyId = 0, 3000);
  }

  goToReportTransference() {
    this.router.navigate(['/home/report-transference']);
  }
}
