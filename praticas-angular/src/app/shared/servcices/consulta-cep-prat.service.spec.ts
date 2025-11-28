/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsultaCepPratService } from './consulta-cep-prat.service';

describe('Service: ConsultaCepPrat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaCepPratService]
    });
  });

  it('should ...', inject([ConsultaCepPratService], (service: ConsultaCepPratService) => {
    expect(service).toBeTruthy();
  }));
});
