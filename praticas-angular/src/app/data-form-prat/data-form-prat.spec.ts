import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormPrat } from './data-form-prat';

describe('DataFormPrat', () => {
  let component: DataFormPrat;
  let fixture: ComponentFixture<DataFormPrat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFormPrat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataFormPrat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
