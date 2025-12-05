/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsultaCepPrat02Service } from './consulta-cep-prat02.service';

describe('Service: ConsultaCepPrat02', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaCepPrat02Service]
    });
  });

  it('should ...', inject([ConsultaCepPrat02Service], (service: ConsultaCepPrat02Service) => {
    expect(service).toBeTruthy();
  }));
});
