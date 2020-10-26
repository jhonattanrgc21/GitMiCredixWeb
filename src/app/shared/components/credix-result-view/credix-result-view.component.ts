import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-credix-result-view',
  templateUrl: './credix-result-view.component.html',
  styleUrls: ['./credix-result-view.component.scss']
})
export class CredixResultViewComponent implements OnInit {
  @Input() title: string;
  @Input() resultTile: string;
  @Input() resultMessage = '';
  @Input() status: 'success' | 'error' | 'warn';
  @Input() buttonText: string;
  @Input() routeTo: string;
  @Output() buttonPressed = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  go() {
    this.router.navigate([this.routeTo]).then();
  }
}
