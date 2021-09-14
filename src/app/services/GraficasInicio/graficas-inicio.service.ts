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

  GetData(fechaInicio: any, fechaFin: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('fhi','202008050000');
    params = params.append('fhf', '202008050001');
    return this.httpClient.get(`${environment.server}/med/ise1`, {params: params}).pipe(catchError(this.clientError));
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
