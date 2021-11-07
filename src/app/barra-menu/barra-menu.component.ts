import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css']
})
export class BarraMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Función para ir a una página de la webapp 
   * @param ruta Ruta a ir dentro del menú
   */
  irA(ruta) {
    if (ruta === 'inicio') {
      this.router.navigate([ruta]).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate([ruta]);
    }
   
  }

}
