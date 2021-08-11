import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficaDiariaRoutingModule } from './grafica-diaria-routing.module';
import { GraficaDiariaComponent } from './grafica-diaria.component';


@NgModule({
  declarations: [
    GraficaDiariaComponent
  ],
  imports: [
    CommonModule,
    GraficaDiariaRoutingModule
  ]
})
export class GraficaDiariaModule { }
