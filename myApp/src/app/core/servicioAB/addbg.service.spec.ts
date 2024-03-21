import { TestBed } from '@angular/core/testing';

import { AddbgService } from './addbg.service';

describe('AddbgService', () => {
  let service: AddbgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddbgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
