import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {HomeService} from './home.service';
import {Router} from '@angular/router';
import {SimplebarAngularComponent} from 'simplebar-angular';
import {ScrollService} from '../../core/services/scroll.service';
import {TagsService} from '../../core/services/tags.service';
import {globalCacheBusterNotifier} from 'ngx-cacheable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  isTablet = false;
  options = {autoHide: false, scrollbarMinSize: 100};

  @ViewChild('scrollBar', {read: SimplebarAngularComponent, static: true})
  scrollBar: SimplebarAngularComponent;

  constructor(public homeService: HomeService,
              private tagsService: TagsService,
              private scrollService: ScrollService,
              private breakpointObserver: BreakpointObserver,
              private router: Router) {
  }

  ngOnInit() {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe();
    this.checkScreenBreakpoint();
  }

  ngAfterViewInit(): void {
    this.scrollBar.SimpleBar.getScrollElement().addEventListener('scroll', (event) =>
      this.scrollService.emitScroll(this.scrollBar.SimpleBar.getScrollElement().scrollTop));
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
      globalCacheBusterNotifier.next();
      this.router.navigate(['/']);
    }, error => {
      globalCacheBusterNotifier.next();
      this.router.navigate(['/']);
    });
  }

}
