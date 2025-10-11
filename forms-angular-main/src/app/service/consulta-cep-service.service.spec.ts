import { TestBed } from '@angular/core/testing';

import { ConsultaCepServiceService } from './consulta-cep-service.service';

describe('ConsultaCepServiceService', () => {
  let service: ConsultaCepServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaCepServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
