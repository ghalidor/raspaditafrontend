import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoJuegoComponent } from './punto-juego.component';

describe('PuntoJuegoComponent', () => {
  let component: PuntoJuegoComponent;
  let fixture: ComponentFixture<PuntoJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntoJuegoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntoJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
