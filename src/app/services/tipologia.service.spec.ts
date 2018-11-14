import { TestBed, inject } from '@angular/core/testing';

import { TipologiaService } from './tipologia.service';

describe('TipologiaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipologiaService]
    });
  });

  it('should be created', inject([TipologiaService], (service: TipologiaService) => {
    expect(service).toBeTruthy();
  }));
});
