import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariocajaComponent } from './usuariocaja.component';

describe('UsuariocajaComponent', () => {
  let component: UsuariocajaComponent;
  let fixture: ComponentFixture<UsuariocajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariocajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariocajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
