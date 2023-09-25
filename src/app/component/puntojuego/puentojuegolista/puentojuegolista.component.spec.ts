import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuentojuegolistaComponent } from './puentojuegolista.component';

describe('PuentojuegolistaComponent', () => {
  let component: PuentojuegolistaComponent;
  let fixture: ComponentFixture<PuentojuegolistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuentojuegolistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuentojuegolistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
