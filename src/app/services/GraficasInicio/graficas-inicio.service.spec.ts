import { TestBed } from '@angular/core/testing';

import { GraficasInicioService } from './graficas-inicio.service';

describe('GraficasInicioService', () => {
  let service: GraficasInicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficasInicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
