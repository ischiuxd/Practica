import { TestBed } from '@angular/core/testing';

import { BuscarBLGService } from './buscar-blg.service';

describe('BuscarBLGService', () => {
  let service: BuscarBLGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarBLGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
