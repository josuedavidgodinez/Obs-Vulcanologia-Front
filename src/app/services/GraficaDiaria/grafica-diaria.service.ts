import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common'; 

@Injectable({
  providedIn: 'root'
})
export class GraficaDiariaService {

  constructor(private httpClient: HttpClient) { }

  GetData(formulario: any): Observable<any> {
    return this.httpClient.get(`${environment.server}/media/ise1/1/i24H`, { responseType: 'blob' }).pipe(catchError(this.clientError));
  }

  GetDataFecha(estacion:any,sensor:any,fecha_i:any,fecha_f:any): Observable<any> {
    fecha_i = this.ParsingDate(fecha_i);
    fecha_f = this.ParsingDate(fecha_f);
    console.log(`${environment.server}/media/`+estacion+`/`+sensor+`/i24H?fhi=`+fecha_i+`&fhf=`+fecha_f);
    return this.httpClient.get(`${environment.server}/media/`+estacion+`/`+sensor+`/i24H?fhi=`+fecha_i+`&fhf=`+fecha_f, { responseType: 'blob' }).pipe(catchError(this.clientError));
  }

  ParsingDate(fecha:Date){
    return formatDate(fecha, 'yyyyMMddHHmm', 'en-US');
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
