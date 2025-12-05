import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormPrat03 } from './data-form-prat-03';

describe('DataFormPrat03', () => {
  let component: DataFormPrat03;
  let fixture: ComponentFixture<DataFormPrat03>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFormPrat03]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataFormPrat03);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
