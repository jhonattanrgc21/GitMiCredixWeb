import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {HomeService} from './home.service';
import {StorageService} from '../../core/services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';

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
              public homeService: HomeService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.checkRoute();
    this.checkScreenBreakpoint();
  }

  checkRoute() {
    this.activatedRoute.url.subscribe(url => {
      console.log(url);
    });
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
