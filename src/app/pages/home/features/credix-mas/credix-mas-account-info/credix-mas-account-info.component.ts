import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { SubscribePopupComponent } from './subscribe-popup/subscribe-popup.component';
import { SlowBuffer } from 'buffer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credix-mas-account-info',
  templateUrl: './credix-mas-account-info.component.html',
  styleUrls: ['./credix-mas-account-info.component.scss']
})
export class CredixMasAccountInfoComponent implements OnInit {

  subscription = false;

  constructor(private modalService: ModalService, private router: Router) { }

  ngOnInit(): void {
  }

  subscribe(){
    this.modalService
      .open(
        { data: {
            subscription: this.subscription,
            date: '27/08/2023'
          }, hideCloseButton: true, component: SubscribePopupComponent},
        {width: 400, height: 229, disableClose: false, panelClass: 'promo-popup'}, 1)
        .afterClosed().subscribe((value) => {
          if(value){
            this.router.navigate(['/home/credix-mas/success'])
          }
        });
  }


}
