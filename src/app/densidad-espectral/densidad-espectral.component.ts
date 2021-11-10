import { Component, OnInit } from '@angular/core';
import { DensidadEspectralService } from './../services/DensidadEspectral/densidad-espectral.service';

@Component({
  selector: 'app-densidad-espectral',
  templateUrl: './densidad-espectral.component.html',
  styleUrls: ['./densidad-espectral.component.css']
})
export class DensidadEspectralComponent implements OnInit {

  imagen: any;

  constructor(private DensidadEspectralService: DensidadEspectralService) { }

  ngOnInit(): void {
    this.DensidadEspectralService.GetData(true).subscribe(res => {
      this.createImageFromBlob(res);
    })
  }

  /**
   * 
   * @param image 
   */
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imagen = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
}

}
