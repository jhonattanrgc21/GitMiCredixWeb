import { Component, Input } from '@angular/core';

@Component({
  selector: 'title-card-not-active-component',
  templateUrl: './title-card-not-active-content.component.html',
  styleUrls: ['./title-card-not-active-content.component.scss']
})
export class TitleCardNotActiveComponent{
  @Input() type: 'modal' | 'dropdown' = 'modal'
  phoneUrl = 'tel:+50622273349'

  openPhoneCall(){
    window.location.href = 'tel:' + this.phoneUrl
  }

  goToLocationsWebsite(){
    window.open('https://www.credix.com/sucursales/', '_blank')
  }

}
