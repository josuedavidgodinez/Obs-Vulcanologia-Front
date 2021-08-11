import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspectrogramaRoutingModule } from './espectrograma-routing.module';
import { EspectrogramaComponent } from './espectrograma.component';


@NgModule({
  declarations: [
    EspectrogramaComponent
  ],
  imports: [
    CommonModule,
    EspectrogramaRoutingModule
  ]
})
export class EspectrogramaModule { }
