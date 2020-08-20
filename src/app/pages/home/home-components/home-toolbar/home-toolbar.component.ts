import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HomeService} from '../../home.service';
import {GoHomeService} from '../../../../core/services/go-home.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.scss']
})
export class HomeToolbarComponent implements OnInit {
  @Output() toggleClick = new EventEmitter<void>();
  @Output() signOutClick = new EventEmitter<void>();
  svgIcon: 'menu-close' | 'menu' = 'menu-close';

  constructor(private homeService: HomeService,
              private goHomeService: GoHomeService) {
  }

  ngOnInit(): void {
    this.homeService.isTabletObs.subscribe(value => {
      this.svgIcon = value ? 'menu' : 'menu-close';
    });

    this.homeService.isClosingObs.subscribe(value => {
      if (value) {
        this.svgIcon = 'menu';
      }
    });
  }

  goHome() {
    this.goHomeService.goHome();
  }

  toggle() {
    this.toggleClick.emit();
    this.svgIcon = this.svgIcon === 'menu-close' ? 'menu' : 'menu-close';
  }
}
