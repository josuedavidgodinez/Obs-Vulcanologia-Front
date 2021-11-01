import { TestBed } from '@angular/core/testing';

import { EspectogramaService } from './espectograma.service';

describe('EspectogramaService', () => {
  let service: EspectogramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspectogramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
