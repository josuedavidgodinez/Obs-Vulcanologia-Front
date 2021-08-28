import { TestBed } from '@angular/core/testing';

import { GraficaDiariaService } from './grafica-diaria.service';

describe('GraficaDiariaService', () => {
  let service: GraficaDiariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficaDiariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
