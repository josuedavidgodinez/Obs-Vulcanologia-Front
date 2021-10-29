import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspectrogramaComponent } from './espectrograma.component';

const routes: Routes = [{ path: '', component: EspectrogramaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspectrogramaRoutingModule { }
