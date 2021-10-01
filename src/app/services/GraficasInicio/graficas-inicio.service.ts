import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraficasInicioService {

  constructor(private httpClient: HttpClient) { }

  GetDataIse1(): Observable<any> {
    let params = new HttpParams();
    //params = params.append('fhi',fechaInicio);
    //params = params.append('fhf', fechaFin);
    return this.httpClient.get(`${environment.server}/med/ise1/LecturaInicio`).pipe(catchError(this.clientError));
  }

  GetDataIse2(): Observable<any> {
    let params = new HttpParams();
    //params = params.append('fhi',fechaInicio);
    //params = params.append('fhf', fechaFin);
    return this.httpClient.get(`${environment.server}/med/ise2/LecturaInicio`).pipe(catchError(this.clientError));
  }
  
  GetDataE1ms1(): Observable<any> {
    let params = new HttpParams();
    //params = params.append('fhi',fechaInicio);
    //params = params.append('fhf', fechaFin);
    return this.httpClient.get(`${environment.server}/med/e1ms1/LecturaInicio`).pipe(catchError(this.clientError));
  }

  clientError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}