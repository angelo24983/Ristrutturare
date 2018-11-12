import { TestBed, inject } from '@angular/core/testing';

import { PagamentoService } from './pagamento.service';

describe('PagamentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagamentoService]
    });
  });

  it('should be created', inject([PagamentoService], (service: PagamentoService) => {
    expect(service).toBeTruthy();
  }));
});
