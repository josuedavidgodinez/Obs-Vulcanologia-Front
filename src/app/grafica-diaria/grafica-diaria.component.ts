import { GraficaDiariaService } from './../services/GraficaDiaria/grafica-diaria.service';
import { MatDatetimePickerInputEvent, NgxMatDateAdapter, NgxMatDateFormats, NgxMatDatetimePicker, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { DateSelectionModelChange, MatDatepickerInput } from '@angular/material/datepicker';

@Component({
  selector: 'app-grafica-diaria',
  templateUrl: './grafica-diaria.component.html',
  styleUrls: ['./grafica-diaria.component.css']
})
export class GraficaDiariaComponent implements OnInit {

  imagen: any;

  selectedEstacion: string = 'ise1';
  selectedSensor: string = "1";
  selectedDateTime_i: Date;
  selectedDateTime_f: Date;

  selectChangeHandler1 (event: any) {
    //update the ui
    this.selectedEstacion = event.target.value;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.graficaDiariaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        this.createImageFromBlob(res);
        console.log(res)
      })
    }
  }

  selectChangeHandler2 (event: any) {
    //update the ui
    this.selectedSensor = event.target.value;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.graficaDiariaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        this.createImageFromBlob(res);
        console.log(res)
      })
    }
  }

  selectChangeHandler3 (event: any) {
    //update the ui
    this.selectedDateTime_i = event;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.graficaDiariaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        this.createImageFromBlob(res);
        console.log(res)
      })
    }
  }

   selectChangeHandler4 (event: any) {
    //update the ui
    this.selectedDateTime_f = event;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.graficaDiariaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        this.createImageFromBlob(res);
        console.log(res)
      })
    }
  }

  public formGroup = new FormGroup({
    date_inicio: new FormControl(null, [Validators.required]),
    date_fin: new FormControl(null, [Validators.required])
  })

  constructor(private graficaDiariaService: GraficaDiariaService) { }

  ngOnInit(): void {
    this.graficaDiariaService.GetData(true).subscribe(res => {
      this.createImageFromBlob(res);
    })
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
