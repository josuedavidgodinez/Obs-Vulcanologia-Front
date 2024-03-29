import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

/**
 *  Se utiliza Lazy Loading para obtener un mejor redimiento.
 */
const routes: Routes = [
  { path: '', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'grafica-diaria', loadChildren: () => import('./grafica-diaria/grafica-diaria.module').then(m => m.GraficaDiariaModule) },
  { path: 'espectrograma', loadChildren: () => import('./espectrograma/espectrograma.module').then(m => m.EspectrogramaModule) },
  { path: 'densidad-espectral', loadChildren: () => import('./densidad-espectral/densidad-espectral.module').then(m => m.DensidadEspectralModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,useHash:true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
