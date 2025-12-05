import { TestBed } from '@angular/core/testing';

import { VerificaEmail } from './verifica-email';

describe('VerificaEmail', () => {
  let service: VerificaEmail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificaEmail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
