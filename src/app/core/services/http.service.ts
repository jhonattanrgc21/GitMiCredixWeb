import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  cancelHttpCall: Subject<void> = new Subject<void>();
  channelId = environment.channelId;

  private static getUrl(service: 'canales' | 'marchamos' | 'incomex'): string {
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

  get(service: 'canales' | 'marchamos' | 'incomex', uri: string, params = []): Observable<any> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json');

    let httpParams = new HttpParams();
    params.forEach(p => {
      if (p.value !== null) {
        httpParams = httpParams.append(p.key, p.value);
      }
    });

    return this.http.get<any>(HttpService.getUrl(service) + uri, {headers, params: httpParams})
      .pipe(takeUntil(this.cancelHttpCall));
  }

  post(service: 'canales' | 'marchamos' | 'incomex', uri: string, body: any = {}, params = []): Observable<any> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json');

    let httpParams = new HttpParams();
    params.forEach(p => {
      httpParams = httpParams.append(p.key, p.value);
    });

    body.channelId = this.channelId;

    return this.http.post<any>(HttpService.getUrl(service) + uri, JSON.stringify(body), {headers, params: httpParams})
      .pipe(takeUntil(this.cancelHttpCall));
  }

  put(service: 'canales' | 'marchamos' | 'incomex', uri: string, body: any = {}, params = []): Observable<any> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json');

    let httpParams = new HttpParams();
    params.forEach(p => {
      httpParams = httpParams.append(p.key, p.value);
    });

    body.channelId = this.channelId;

    return this.http.put<any>(HttpService.getUrl(service) + uri, JSON.stringify(body), {headers, params: httpParams})
      .pipe(takeUntil(this.cancelHttpCall));
  }

  delete(service: 'canales' | 'marchamos' | 'incomex', uri: string, params = []): Observable<any> {
    let httpParams = new HttpParams();
    params.forEach(p => {
      httpParams = httpParams.append(p.key, p.value);
    });

    return this.http.delete<any>(HttpService.getUrl(service) + uri, {params: httpParams})
      .pipe(takeUntil(this.cancelHttpCall));
  }

  unsubscribeHttpCall() {
    this.cancelHttpCall.next();
  }
}
