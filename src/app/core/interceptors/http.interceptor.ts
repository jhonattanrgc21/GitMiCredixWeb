import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {StorageService} from '../services/storage.service';
import {LoadingSpinnerService} from '../services/loading-spinner.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {CredixCodeErrorService} from '../services/credix-code-error.service';
import { RenewTokenService } from '../services/renew-token.service';

@Injectable()
export class HttpRequestsResponseInterceptor implements HttpInterceptor {
  canalesUrL = environment.urlCanales;
  marchamosUrl = environment.urlMarchamos;
  incomexUrl = environment.urlIncomex;
  requestsCount = 0;
  private printUserInfo = true;

  constructor(private storageService: StorageService,
              private credixCodeErrorService: CredixCodeErrorService,
              private loadingSpinnerService: LoadingSpinnerService,
              private router: Router,
              private renewToken: RenewTokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;​

    if (this.storageService.getCurrentToken()) {
      request = req.clone({
        setHeaders: {
          'x-auth-token': this.storageService.getCurrentToken()
        }
      });
      this.print();
    }

    if (request.url.search(this.canalesUrL) !== -1 || request.url.search(this.marchamosUrl) !== -1 ||
      request.url.search(this.incomexUrl) !== -1) {
      this.requestsCount++;
      this.loadingSpinnerService.startLoading();
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

          if (event.headers) {
            if (event.headers.get('x-auth-token') != null) {
              this.storageService.setCurrentToken(event.headers.get('x-auth-token'));
              this.renewToken.clearTimer(event.body.json.timelife * 60);
              if(this.renewToken.requestsCount === 0) this.renewToken.startTimer();
              this.print();
            }
          }

          if (event.body.status && event.body.status === 406) {
            this.credixCodeErrorService.emitCredixCodeError();
          }

          if (event.body.status === 401) {
            this.router.navigate(['/']);
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }),
      finalize(() => {
        if (request.url.search(this.canalesUrL) !== -1 || request.url.search(this.marchamosUrl) !== -1 ||
          request.url.search(this.incomexUrl) !== -1) {
          this.requestsCount--;
          if (this.requestsCount === 0) {
            this.loadingSpinnerService.stopLoading();
          }
          this.renewToken.increaseRequestCount();
        }
      })
    );
  }

  print() {
    if (!environment.production && this.printUserInfo) {
      this.printUserInfo = false;
    }
  }

}
