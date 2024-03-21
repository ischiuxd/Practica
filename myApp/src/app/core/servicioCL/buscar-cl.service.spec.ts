import { TestBed } from '@angular/core/testing';

import { BuscarCLService } from './buscar-cl.service';

describe('BuscarCLService', () => {
  let service: BuscarCLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarCLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
