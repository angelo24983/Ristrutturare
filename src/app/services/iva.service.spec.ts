import { TestBed, inject } from '@angular/core/testing';

import { IvaService } from './iva.service';

describe('IvaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IvaService]
    });
  });

  it('should be created', inject([IvaService], (service: IvaService) => {
    expect(service).toBeTruthy();
  }));
});
