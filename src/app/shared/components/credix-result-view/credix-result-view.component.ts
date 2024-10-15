import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-credix-result-view',
  templateUrl: './credix-result-view.component.html',
  styleUrls: ['./credix-result-view.component.scss']
})
export class CredixResultViewComponent implements OnInit {
  @Input() moduleTitle: string;
  @Input() resultTile: string;
  @Input() resultMessage = '';
  @Input() status: 'success' | 'error' | 'warn' | 'info';
  @Input() buttonText: string;
  @Input() routeTo: string;
  @Input() paymentService: boolean = false;
  @Output() buttonPressed = new EventEmitter();
  //@Output() openModal = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {
  }

}
