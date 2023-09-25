import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaeditarComponent } from './cajaeditar.component';

describe('CajaeditarComponent', () => {
  let component: CajaeditarComponent;
  let fixture: ComponentFixture<CajaeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaeditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajaeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
