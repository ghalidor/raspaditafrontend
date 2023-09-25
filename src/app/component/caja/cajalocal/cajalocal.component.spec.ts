import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajalocalComponent } from './cajalocal.component';

describe('CajalocalComponent', () => {
  let component: CajalocalComponent;
  let fixture: ComponentFixture<CajalocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajalocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajalocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
