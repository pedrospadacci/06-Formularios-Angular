import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDebugPratica } from './form-debug-pratica';

describe('FormDebugPratica', () => {
  let component: FormDebugPratica;
  let fixture: ComponentFixture<FormDebugPratica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDebugPratica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDebugPratica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
