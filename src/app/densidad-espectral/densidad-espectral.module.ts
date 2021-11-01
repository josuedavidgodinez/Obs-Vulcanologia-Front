import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DensidadEspectralRoutingModule } from './densidad-espectral-routing.module';
import { DensidadEspectralComponent } from './densidad-espectral.component';


@NgModule({
  declarations: [
    DensidadEspectralComponent
  ],
  imports: [
    CommonModule,
    DensidadEspectralRoutingModule
  ]
})
export class DensidadEspectralModule { }
