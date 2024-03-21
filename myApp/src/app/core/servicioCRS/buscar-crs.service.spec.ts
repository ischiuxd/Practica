import { TestBed } from '@angular/core/testing';

import { BuscarCrsService } from './buscar-crs.service';

describe('BuscarCrsService', () => {
  let service: BuscarCrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarCrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
