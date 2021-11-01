import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DensidadEspectralComponent } from './densidad-espectral.component';

const routes: Routes = [{ path: '', component: DensidadEspectralComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DensidadEspectralRoutingModule { }
