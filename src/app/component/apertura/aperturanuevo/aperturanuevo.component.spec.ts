import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturanuevoComponent } from './aperturanuevo.component';

describe('AperturanuevoComponent', () => {
  let component: AperturanuevoComponent;
  let fixture: ComponentFixture<AperturanuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AperturanuevoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AperturanuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
