import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-link-button',
  templateUrl: './credix-link-button.component.html',
  styleUrls: ['./credix-link-button.component.scss']
})
export class CredixLinkButtonComponent implements OnInit {
  @Input() disabled = false;
  @Input() text = '';
  @Input() route = '';
  @Input() target = '_blank';

  constructor() {
  }

  ngOnInit(): void {
  }

}
