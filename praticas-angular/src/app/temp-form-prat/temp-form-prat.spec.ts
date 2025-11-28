import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempFormPrat } from './temp-form-prat';

describe('TempFormPrat', () => {
  let component: TempFormPrat;
  let fixture: ComponentFixture<TempFormPrat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TempFormPrat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempFormPrat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
