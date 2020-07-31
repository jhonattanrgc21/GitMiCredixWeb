import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../services/storage.service';
import {CredixToastService} from '../services/credix-toast.service';

@Injectable()
export class HttpRequestsResponseInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private toastService: CredixToastService) {
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

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.headers) {
            if (event.headers.get('x-auth-token') != null) {
              this.storageService.setCurrentToken(event.headers.get('x-auth-token'));
            }
          }
          console.log(event.body);
          /*if ((event.body.titleOne === 'error' || event.body.type === 'error')) {
            const message = event.body.message ? event.body.message : event.body.json.message ? event.body.json.message: event.body.descriptionOne;
            this.toastService.show({text: message, type: 'error'});
          }*/
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {

        return throwError(error);
      })
    );
  }

}
