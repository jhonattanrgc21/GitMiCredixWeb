import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  imageGoogleBandageUrl: string = '../../../assets/images/google-play-badge.png';
  imageAppStoreBandageUrl: string = '../../../assets/images/appStore.png';
  close:boolean = false;
  constructor() {
  }

  ngOnInit(): void {
  }

  closeHeader(): boolean{
    return !this.close;
  }
}
