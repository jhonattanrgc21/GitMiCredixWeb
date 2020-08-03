import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../services/storage.service';
import {CredixToastService} from '../services/credix-toast.service';
import {LoadingSpinnerService} from '../services/loading-spinner.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class HttpRequestsResponseInterceptor implements HttpInterceptor {
  canalesUrL = environment.urlCanales;
  marchamosUrl = environment.urlMarchamos;
  incomexUrl = environment.urlIncomex;
  requestsCount = 0;

  constructor(private storageService: StorageService,
              private toastService: CredixToastService,
              private loadingSpinnerService: LoadingSpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;​

    if (this.storageService.getCurrentToken()) {
      request = req.clone({
        setHeaders: {
          'x-auth-token': this.storageService.getCurrentToken()
        }
      });
    }

    if (request.url.search(this.canalesUrL) !== -1 || request.url.search(this.marchamosUrl) !== -1 ||
      request.url.search(this.incomexUrl) !== -1) {
      this.requestsCount++;
      this.loadingSpinnerService.startLoading();
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if ((request.url.search(this.canalesUrL) !== -1 || request.url.search(this.marchamosUrl) !== -1 ||
            request.url.search(this.incomexUrl) !== -1)) {
            this.requestsCount--;
            if (this.requestsCount === 0) {
              this.loadingSpinnerService.stopLoading();
            }
          }

          if (event.headers) {
            if (event.headers.get('x-auth-token') != null) {
              this.storageService.setCurrentToken(event.headers.get('x-auth-token'));
            }
          }

          if ((event.body.titleOne === 'error' || event.body.type === 'error')) {
            const message = event.body.message ? event.body.message : event.body.json.message;

            if (message) {
              this.toastService.show({text: message, type: 'error'});
            }
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (request.url.search(this.canalesUrL) !== -1 || request.url.search(this.marchamosUrl) !== -1 ||
          request.url.search(this.incomexUrl) !== -1) {
          this.loadingSpinnerService.stopLoading();
        }
        return throwError(error);
      })
    );
  }

}
