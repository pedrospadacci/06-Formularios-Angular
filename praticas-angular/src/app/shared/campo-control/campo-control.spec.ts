import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoControl } from './campo-control';

describe('CampoControl', () => {
  let component: CampoControl;
  let fixture: ComponentFixture<CampoControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
