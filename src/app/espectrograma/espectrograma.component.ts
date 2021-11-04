import { EspectogramaService } from './../services/Espectograma/espectograma.service';
import { MatDatetimePickerInputEvent, NgxMatDateAdapter, NgxMatDateFormats, NgxMatDatetimePicker, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit,  ViewChild,TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { DateSelectionModelChange, MatDatepickerInput } from '@angular/material/datepicker';
import {
  Gallery,
  GalleryItem,
  ThumbnailsPosition,
  ImageSize
} from "ng-gallery";
import { Lightbox } from 'ng-gallery/lightbox';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-espectrograma',
  templateUrl: './espectrograma.component.html',
  styleUrls: ['./espectrograma.component.css']
})
export class EspectrogramaComponent implements OnInit {
  selectedEstacion: string = 'ise1';
  selectedSensor: string = "1";
  selectedDateTime_i: Date;
  selectedDateTime_f: Date;
  selectedIndex = 0;
  dataInShow = { fi: "", ff: "", link: "" }
  imageData = [];
  imgsInfo = [];

  items: GalleryItem[];
  @ViewChild("itemTemplate", { static: true }) itemTemplate: TemplateRef<any>;

  selectChangeHandler1 (event: any) {
    //update the ui
    this.selectedEstacion = event.target.value;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.EspectogramaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        this.llenarDatos(res);
      })
    }
  }

  selectChangeHandler2 (event: any) {
    //update the ui
    this.selectedSensor = event.target.value;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.EspectogramaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        this.llenarDatos(res);
      })
    }
  }

  selectChangeHandler3 (event: any) {
    //update the ui
    this.selectedDateTime_i = event;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.EspectogramaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        this.llenarDatos(res);
      })
    }
  }

  selectChangeHandler4 (event: any) {
    //update the ui
    this.selectedDateTime_f = event;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.EspectogramaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        this.llenarDatos(res);
      })
    }
  }

  openInTab (link: string): void {
    window.open(link, "_blank");
  }
  changeData (i: number) {
    const arr: any[] = this.imgsInfo;
    if(arr.length > 0){
      this.selectedIndex = i;
      const obj = arr[this.selectedIndex];
      this.dataInShow.fi = new Date(obj.fechaInicial).toString();
      this.dataInShow.ff = new Date(obj.fechaFinal).toString();
      this.dataInShow.link = `${environment.imagenes}` + obj.imgName;
    }else{
      this.dataInShow.fi = "";
      this.dataInShow.ff = "";
      this.dataInShow.link = "";
    }
  }

  public formGroup = new FormGroup({
    date_inicio: new FormControl(null, [Validators.required]),
    date_fin: new FormControl(null, [Validators.required])
  })

  constructor(private EspectogramaService: EspectogramaService,public gallery: Gallery, public lightbox: Lightbox) { }

  ngOnInit(): void {
    const galleryRef = this.gallery.ref('basic-test');
    galleryRef.indexChanged.subscribe(gs => {
      console.log(gs);
      this.changeData(gs.currIndex);
    });
    galleryRef.itemsChanged.subscribe(gs => {
      console.log(gs);
      galleryRef.set(gs.currIndex);
    });
    this.EspectogramaService.GetData(true).subscribe(res => {
      this.llenarDatos(res);
    })
  }

  llenarDatos(imagen:any){
    this.imageData = [];
    this.imgsInfo = [];
    if(Array.isArray(imagen.list)) this.imgsInfo = imagen.list;
    for (let index = 0; index < this.imgsInfo.length; index++) {
      const element = this.imgsInfo[index];
      this.imageData.push(
        {
          srcUrl: `${environment.imagenes}` + element.imgName,
          previewUrl: `${environment.imagenes}` + element.imgName
        }
      );
    }
    this.items = this.imageData.map(item => {
      return {
        type: "imageViewer",
        data: {
          src: item.srcUrl,
          thumb: item.previewUrl
        }
      };
    });
    this.changeData(this.selectedIndex);
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
