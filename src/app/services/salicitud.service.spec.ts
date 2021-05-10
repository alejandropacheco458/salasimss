import { TestBed } from '@angular/core/testing';

import { SalicitudService } from './salicitud.service';

describe('SalicitudService', () => {
  let service: SalicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
