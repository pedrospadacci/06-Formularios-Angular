import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormPrat02 } from './data-form-prat-02';

describe('DataFormPrat02', () => {
  let component: DataFormPrat02;
  let fixture: ComponentFixture<DataFormPrat02>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFormPrat02]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataFormPrat02);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
