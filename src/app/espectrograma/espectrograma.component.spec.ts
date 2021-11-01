import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspectrogramaComponent } from './espectrograma.component';

describe('EspectrogramaComponent', () => {
  let component: EspectrogramaComponent;
  let fixture: ComponentFixture<EspectrogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspectrogramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspectrogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
