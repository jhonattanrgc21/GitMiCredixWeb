import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable()
export class HttpService {
  cancelHttpCall: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get(service: 'canales' | 'marchamos' | 'incomex', uri: string, params = []): Observable<any> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json');

    let httpParams = new HttpParams();
    params.forEach(p => {
      if (p.value !== null) {
        httpParams = httpParams.append(p.key, p.value);
      }
    });

    return this.http.get<any>(this.getUrl(service) + uri, {headers, params: httpParams})
      .pipe(takeUntil(this.cancelHttpCall));
  }

  post(service: 'canales' | 'marchamos' | 'incomex', uri: string, body = {}, params = []): Observable<any> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'text/json')
      .append('x-auth-token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5NDQxNyIsImV4cCI6MTU5NjMwNzk5OH0.0DtKkUAAI1XHbXu4_BQzvsFugB1bQLT8NO4VzQPukMXIEoYfd4vitgNTOUt8tygwRtDhcvwnqsgVBnm7f_wpNQ');

    let httpParams = new HttpParams();
    params.forEach(p => {
      httpParams = httpParams.append(p.key, p.value);
    });

    return this.http.post<any>(this.getUrl(service) + uri, JSON.stringify(body), {headers, params: httpParams})
      .pipe(takeUntil(this.cancelHttpCall));
  }

  put(service: 'canales' | 'marchamos' | 'incomex', uri: string, body = {}, params = []): Observable<any> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json');

    let httpParams = new HttpParams();
    params.forEach(p => {
      httpParams = httpParams.append(p.key, p.value);
    });

    return this.http.put<any>(this.getUrl(service) + uri, JSON.stringify(body), {headers, params: httpParams})
      .pipe(takeUntil(this.cancelHttpCall));
  }

  delete(service: 'canales' | 'marchamos' | 'incomex', uri: string, params = []): Observable<any> {
    let httpParams = new HttpParams();
    params.forEach(p => {
      httpParams = httpParams.append(p.key, p.value);
    });

    return this.http.delete<any>(this.getUrl(service) + uri, {params: httpParams})
      .pipe(takeUntil(this.cancelHttpCall));
  }

  unsubscribeHttpCall() {
    this.cancelHttpCall.next();
  }

  getUrl(service: 'canales' | 'marchamos' | 'incomex'): string {
    switch (service) {
      case 'canales':
        return environment.urlCanales;
      case 'marchamos':
        return environment.urlMarchamos;
      case 'incomex':
        return environment.urlIncomex;
      default:
        return environment.urlCanales;
    }
  }
}
