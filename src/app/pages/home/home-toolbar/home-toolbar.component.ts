import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.scss']
})
export class HomeToolbarComponent implements OnInit, OnChanges {
  @Input() isTablet = false;
  @Input() toggleIcon = false;
  @Output() toggleClick = new EventEmitter<void>();
  @Output() signOutClick = new EventEmitter<void>();
  svgIcon: 'menu-close' | 'menu';

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isTablet) {
      this.svgIcon = this.isTablet ? 'menu' : 'menu-close';
    }

    if (changes.toggleIcon && this.toggleIcon) {
      this.svgIcon = 'menu';
    }
  }

  toggle() {
    this.toggleClick.emit();
    this.svgIcon = this.svgIcon === 'menu-close' ? 'menu' : 'menu-close';
  }
}
