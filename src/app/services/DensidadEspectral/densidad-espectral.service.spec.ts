import { TestBed } from '@angular/core/testing';

import { DensidadEspectralService } from './densidad-espectral.service';

describe('DensidadEspectralService', () => {
  let service: DensidadEspectralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DensidadEspectralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
