import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'first-step-credix-code',
  templateUrl: './first-step-credix-code.component.html',
  styleUrls: ['./first-step-credix-code.component.scss']
})
export class FirstStepCredixCodeComponent implements OnInit {


  @Input() credixCode: FormControl = new FormControl(null,[Validators.required]);


  constructor(private httpService: HttpService,
              private storageService: StorageService) {  }

  ngOnInit(): void {
    this.getUserAplicantAccountNumber();
  }


  getUserAplicantAccountNumber() {
    this.httpService.post('canales', 'applicant/finduserapplicantaccountnumber', {
      channelId: 102,
      accountNumber: this.storageService.getCurrentUser().accountNumber
    }).subscribe(response => {
      console.log(response);
    });
  }

  
}
