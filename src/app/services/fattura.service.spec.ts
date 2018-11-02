import { TestBed, inject } from '@angular/core/testing';

import { FatturaService } from './fattura.service';

describe('FatturaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FatturaService]
    });
  });

  it('should be created', inject([FatturaService], (service: FatturaService) => {
    expect(service).toBeTruthy();
  }));
});
