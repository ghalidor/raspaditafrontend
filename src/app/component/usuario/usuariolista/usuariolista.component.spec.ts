import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariolistaComponent } from './usuariolista.component';

describe('UsuariolistaComponent', () => {
  let component: UsuariolistaComponent;
  let fixture: ComponentFixture<UsuariolistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariolistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariolistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
