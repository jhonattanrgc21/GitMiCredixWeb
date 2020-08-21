import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'four-step-confirm-contact',
  templateUrl: './four-step-confirm-contact.component.html',
  styleUrls: ['./four-step-confirm-contact.component.scss']
})
export class FourStepConfirmContactComponent implements OnInit {

  @Input() contactToConfirm: {name:string,email: string, phone:string};

  constructor() { }

  ngOnInit(): void {
  }

}
