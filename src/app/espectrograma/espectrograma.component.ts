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

  items: GalleryItem[];
  @ViewChild("itemTemplate", { static: true }) itemTemplate: TemplateRef<any>;

  imageData = data;

  selectChangeHandler1 (event: any) {
    //update the ui
    this.selectedEstacion = event.target.value;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.EspectogramaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        console.log(res)
      })
    }
  }

  selectChangeHandler2 (event: any) {
    //update the ui
    this.selectedSensor = event.target.value;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.EspectogramaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        console.log(res)
      })
    }
  }

  selectChangeHandler3 (event: any) {
    //update the ui
    this.selectedDateTime_i = event;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.EspectogramaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        console.log(res)
      })
    }
  }

   selectChangeHandler4 (event: any) {
    //update the ui
    this.selectedDateTime_f = event;
    if((typeof this.selectedDateTime_i !== 'undefined' && typeof this.selectedDateTime_f !== 'undefined')){
      this.EspectogramaService.GetDataFecha(this.selectedEstacion,this.selectedSensor,this.selectedDateTime_i,this.selectedDateTime_f).subscribe(res => {
        console.log(res)
      })
    }
  }

  public formGroup = new FormGroup({
    date_inicio: new FormControl(null, [Validators.required]),
    date_fin: new FormControl(null, [Validators.required])
  })

  constructor(private EspectogramaService: EspectogramaService,public gallery: Gallery, public lightbox: Lightbox) { }

  ngOnInit(): void {

    this.items = this.imageData.map(item => {
      return {
        type: "imageViewer",
        data: {
          src: item.srcUrl,
          thumb: item.previewUrl
        }
      };
    });
  }
}

const data = [
  {
    srcUrl: "http://ec2-54-162-123-190.compute-1.amazonaws.com:3300/media/graphs/ieg20211026143049_20211027033049_ise1_1.png",
    previewUrl: "http://ec2-54-162-123-190.compute-1.amazonaws.com:3300/media/graphs/ieg20211026143049_20211027033049_ise1_1.png"
  },
  {
    srcUrl: "http://ec2-54-162-123-190.compute-1.amazonaws.com:3300/media/graphs/ieg20211026143049_20211027033049_ise1_1.png",
    previewUrl: "http://ec2-54-162-123-190.compute-1.amazonaws.com:3300/media/graphs/ieg20211026143049_20211027033049_ise1_1.png"
  },
  {
    srcUrl: "http://ec2-54-162-123-190.compute-1.amazonaws.com:3300/media/graphs/ieg20211026143049_20211027033049_ise1_1.png",
    previewUrl: "http://ec2-54-162-123-190.compute-1.amazonaws.com:3300/media/graphs/ieg20211026143049_20211027033049_ise1_1.png"
  },
  {
    srcUrl: "http://ec2-54-162-123-190.compute-1.amazonaws.com:3300/media/graphs/ieg20211026143049_20211027033049_ise1_1.png",
    previewUrl: "http://ec2-54-162-123-190.compute-1.amazonaws.com:3300/media/graphs/ieg20211026143049_20211027033049_ise1_1.png"
  }
];


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
