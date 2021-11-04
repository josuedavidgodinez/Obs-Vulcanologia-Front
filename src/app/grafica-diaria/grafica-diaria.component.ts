import { GraficaDiariaService } from './../services/GraficaDiaria/grafica-diaria.service';
import { NgxMatDateAdapter, NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-grafica-diaria',
  templateUrl: './grafica-diaria.component.html',
  styleUrls: ['./grafica-diaria.component.css']
})
export class GraficaDiariaComponent implements OnInit {
  imagen: any;
  imgUrl: string;
  selectedEstacion: string = 'ise1';
  selectedSensor: string = "1";
  selectedDateTime_f: Date;

  selectChangeHandler1 (event: any) {
    //update the ui
    this.selectedEstacion = event.target.value;
    if(typeof this.selectedDateTime_f !== 'undefined'){
      this.imgUrl = this.graficaDiariaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_f);
    }
  }

  selectChangeHandler2 (event: any) {
    //update the ui
    this.selectedSensor = event.target.value;
    if(typeof this.selectedDateTime_f !== 'undefined'){
      this.imgUrl = this.graficaDiariaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_f);
    }
  }

   selectChangeHandler4 (event: any) {
    //update the ui
    this.selectedDateTime_f = event;
    if(typeof this.selectedDateTime_f !== 'undefined'){
      this.imgUrl = this.graficaDiariaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_f);
    }
  }

  public formGroup = new FormGroup({
    date_inicio: new FormControl(null, [Validators.required]),
    date_fin: new FormControl(null, [Validators.required])
  })

  constructor(private graficaDiariaService: GraficaDiariaService) { }

  ngOnInit(): void {
    const date = new Date();
    const ms = 1000*60*60*24;
    const nd = new Date(date.valueOf() - ms);
    this.imgUrl = this.graficaDiariaService.GetDataFecha('ise1','1',nd);
  }



createImageFromBlob(image: Blob) {
       let reader = new FileReader();
       reader.addEventListener("load", () => {
          this.imagen = reader.result;
       }, false);

       if (image) {
          reader.readAsDataURL(image);
       }
}

}


const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: "l, LTS"
  },
  display: {
    dateInput: "l, LTS",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@NgModule({
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: CustomNgxDateTimeModule,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
})
export class CustomNgxDateTimeModule { }
