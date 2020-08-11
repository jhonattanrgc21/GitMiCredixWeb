import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {HomeService} from './home.service';
import {StorageService} from '../../core/services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isTablet = false;
  options = {autoHide: false, scrollbarMinSize: 100};

  constructor(private breakpointObserver: BreakpointObserver,
              private storageService: StorageService,
              private router: Router,
              public homeService: HomeService) {
  }

  ngOnInit() {
    this.checkScreenBreakpoint();
  }

  checkScreenBreakpoint() {
    this.breakpointObserver
      .observe(['(max-width: 1199px)'])
      .subscribe((state: BreakpointState) => {
        this.isTablet = state.matches;
        this.homeService.isTablet(this.isTablet);
      });
  }

  signOut() {
    this.homeService.logOut({
      deviceIdentifier: 1213123134,
      typeIncome: 2
    }).subscribe(response => {
      if (response.type === 'success') {
        this.router.navigate(['/']);
      }
    });
  }

}
