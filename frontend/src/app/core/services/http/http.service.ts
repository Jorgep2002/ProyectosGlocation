import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

 
  public doGet<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(url, options);
  }


  public doPost<T, R>(url: string, body: T, options?: HttpOptions): Observable<R> {
    return this.http.post<R>(url, body, options);
  }

 
  public doPut<T, R>(url: string, body: T, options?: HttpOptions): Observable<R> {
    return this.http.put<R>(url, body, options);
  }



  public doDelete<R>(url: string, options?: HttpOptions): Observable<R> {
    return this.http.delete<R>(url, options);
  }
}
