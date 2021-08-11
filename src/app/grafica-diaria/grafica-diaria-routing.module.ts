import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficaDiariaComponent } from './grafica-diaria.component';

const routes: Routes = [{ path: '', component: GraficaDiariaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficaDiariaRoutingModule { }
