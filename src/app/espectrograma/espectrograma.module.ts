
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
import { BrowserModule } from '@angular/platform-browser';
import { ImageViewerModule } from 'ng2-image-viewer';

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
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    // Especificar libería para importar
    ImageViewerModule
  ],
  providers: [],
  bootstrap: [EspectrogramaComponent],

})
export class EspectrogramaModule { }
