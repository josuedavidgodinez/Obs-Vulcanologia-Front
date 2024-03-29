
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspectrogramaRoutingModule } from './espectrograma-routing.module';
import { EspectrogramaComponent } from './espectrograma.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    EspectrogramaComponent
  ],
  imports: [
    CommonModule,
    EspectrogramaRoutingModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageViewerModule,
    GalleryModule,
    LightboxModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
  ]
})
export class EspectrogramaModule { }
