import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {HomeService} from './home.service';
import {Router} from '@angular/router';
import {SimplebarAngularComponent} from 'simplebar-angular';
import {ScrollService} from '../../core/services/scroll.service';
import {TagsService} from '../../core/services/tags.service';
import {globalCacheBusterNotifier} from 'ngx-cacheable';
import { UserIdleService } from 'angular-user-idle';
import { ModalService } from 'src/app/core/services/modal.service';
import { RenewTokenService } from '../../core/services/renew-token.service';
import { HttpRequestsResponseInterceptor } from '../../core/interceptors/http.interceptor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  isTablet = false;
  globalListenFunc: Function;
  options = {autoHide: false, scrollbarMinSize: 100};
  @ViewChild('scrollBar', {read: SimplebarAngularComponent, static: true})
  scrollBar: SimplebarAngularComponent;
  count = 0;
  isOpenConfirm = false;
  isOpenAdvice = false;
  obs1;
  obs2;

  constructor(public homeService: HomeService,
              private tagsService: TagsService,
              private scrollService: ScrollService,
              private breakpointObserver: BreakpointObserver,
              private router: Router,
              private userIdle: UserIdleService,
              private renderer: Renderer2,
              private modalService: ModalService,
              private renewTokenService: RenewTokenService) {
  }

  ngOnInit() {

    //Start watching for user inactivity.
    this.userIdle.setConfigValues({idle: 300, timeout: 240, ping: 10});
    this.userIdle.startWatching();
    this.obs1 = this.userIdle.onTimerStart().subscribe(count => {
                                                      if(count === 1)this.openConfirmModal();
                                                    });
    this.obs2 = this.userIdle.onTimeout().subscribe(() => {
                                                this.stop();
                                                this.stopWatching();
                                                this.openConfirmTwoModal();
                                              });

    this.globalListenFunc = this.renderer.listen('document', 'click', e => {
      this.restart();
    });

    this.globalListenFunc = this.renderer.listen('document', 'keypress', e => {
      this.restart();
    });


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

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }

  ngOnDestroy() {
    // remove listener
    this.globalListenFunc();
    this.stop();
    this.stopWatching();
    this.renewTokenService.stopTimer();
    this.renewTokenService.resetRequestCount();
    this.obs1.unsubscribe();
    this.obs2.unsubscribe();
  }

  openConfirmModal() {

      this.modalService.confirmationPopup('Inactividad detectada','En 60 segundos, procederemos a cerrar su sesión, ¿Desea continuar logueado?', 500,250,true,59000).subscribe(response => {
        if (response ){
          this.restart();
        }else if(response !== undefined){
            this.stop();
            this.stopWatching();
            this.signOut();
        }
      });

  }

  openConfirmTwoModal() {
      this.modalService.confirmationPopup('Aviso','Su sesión ha vencido, por favor inicie sesión nuevamente.', 500, 250, undefined, undefined, true).subscribe(response => {
        this.signOut();
      });
  }
}
