/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DropDownPratService } from './drop-down-prat.service';

describe('Service: DropDownPrat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DropDownPratService]
    });
  });

  it('should ...', inject([DropDownPratService], (service: DropDownPratService) => {
    expect(service).toBeTruthy();
  }));
});
