import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuentojuegoeditarComponent } from './puentojuegoeditar.component';

describe('PuentojuegoeditarComponent', () => {
  let component: PuentojuegoeditarComponent;
  let fixture: ComponentFixture<PuentojuegoeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuentojuegoeditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuentojuegoeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
