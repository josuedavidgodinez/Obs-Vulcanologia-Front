import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GraficaDiariaService {

  constructor(private httpClient: HttpClient) { }

  GetDataFecha(estacion:any,sensor:any,fecha_f:any): string {
    fecha_f = this.ParsingDate(fecha_f);
    const imgURL = `${environment.server}/media/24h/`+estacion+`/`+sensor+`?fh=`+fecha_f;
    console.log(imgURL);
    return imgURL;
  }
  ParsingDate(fecha:Date){
    return formatDate(fecha, 'yyyyMMddHHmm', 'en-US');
  }
}
