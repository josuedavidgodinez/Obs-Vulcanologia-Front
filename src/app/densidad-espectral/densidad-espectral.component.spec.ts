import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DensidadEspectralComponent } from './densidad-espectral.component';

describe('DensidadEspectralComponent', () => {
  let component: DensidadEspectralComponent;
  let fixture: ComponentFixture<DensidadEspectralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DensidadEspectralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DensidadEspectralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
