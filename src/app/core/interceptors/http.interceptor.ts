import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from "../services/storage.service";

@Injectable()
export class HttpRequestsResponseInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {
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

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if(event.headers) {
            this.storageService.setCurrentToken(event.headers.get('x-auth-token'));
            console.log(event.headers.get('x-auth-token'));
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {

        return throwError(error);
      })
    );
  }

}
