import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-grafica-diaria',
  templateUrl: './grafica-diaria.component.html',
  styleUrls: ['./grafica-diaria.component.css']
})
export class GraficaDiariaComponent implements OnInit {

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {}

}
