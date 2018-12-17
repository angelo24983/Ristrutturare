import { TestBed, inject } from '@angular/core/testing';

import { PreventivoFattureService } from './preventivo-fatture.service';

describe('PreventivoFattureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventivoFattureService]
    });
  });

  it('should be created', inject([PreventivoFattureService], (service: PreventivoFattureService) => {
    expect(service).toBeTruthy();
  }));
});
