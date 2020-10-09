import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-share-button',
  templateUrl: './credix-share-button.component.html',
  styleUrls: ['./credix-share-button.component.scss']
})
export class CredixShareButtonComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() image: string;
  @Input() disabled = false;
  @Input() url = '';
  baseUrl = environment.url;

  constructor() {
  }

  ngOnInit(): void {
  }

}
