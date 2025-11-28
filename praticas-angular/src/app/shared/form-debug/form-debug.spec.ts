import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDebug } from './form-debug';

describe('FormDebug', () => {
  let component: FormDebug;
  let fixture: ComponentFixture<FormDebug>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDebug]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDebug);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
