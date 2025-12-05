/* tslint:disable:no-unused-variable */

import { TestBed,  inject } from '@angular/core/testing';
import { ConsultaCepPrat03Service } from './consulta-cep-prat03.service';

describe('Service: ConsultaCepPrat03', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaCepPrat03Service]
    });
  });

  it('should ...', inject([ConsultaCepPrat03Service], (service: ConsultaCepPrat03Service) => {
    expect(service).toBeTruthy();
  }));
});
