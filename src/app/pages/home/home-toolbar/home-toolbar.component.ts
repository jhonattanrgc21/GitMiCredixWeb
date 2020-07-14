import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.scss']
})
export class HomeToolbarComponent implements OnInit {
  @Output() toggleClick = new EventEmitter<void>();
  @Output() signOutClick = new EventEmitter<void>();
  toggleIcons = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.toggleClick.emit();
    this.toggleIcons = !this.toggleIcons;
  }
}
