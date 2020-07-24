import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-progress-bar',
  templateUrl: './credix-progress-bar.component.html',
  styleUrls: ['./credix-progress-bar.component.scss']
})
export class CredixProgressBarComponent implements OnInit, OnChanges {
  @Input() label: string;
  @Input() goal = 10;
  @Input() value = 0;
  isCompleted = false;
  width = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.isCompleted = this.value === this.goal;
      this.width = this.value * 10;
    }, 300);
  }
}
