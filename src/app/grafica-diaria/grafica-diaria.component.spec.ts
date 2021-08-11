import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaDiariaComponent } from './grafica-diaria.component';

describe('GraficaDiariaComponent', () => {
  let component: GraficaDiariaComponent;
  let fixture: ComponentFixture<GraficaDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaDiariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
