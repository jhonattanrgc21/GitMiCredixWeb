import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-code-link',
  templateUrl: './credix-code-link.component.html',
  styleUrls: ['./credix-code-link.component.scss']
})
export class CredixCodeLinkComponent implements OnInit {

  @Input() route = '';
  constructor() {
  }

  ngOnInit(): void {
  }

}
