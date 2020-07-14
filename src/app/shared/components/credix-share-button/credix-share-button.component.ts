import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-share-button',
  templateUrl: './credix-share-button.component.html',
  styleUrls: ['./credix-share-button.component.scss']
})
export class CredixShareButtonComponent implements OnInit {
  @Input() url: string;
  @Input() description: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
