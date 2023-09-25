import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarionuevoComponent } from './usuarionuevo.component';

describe('UsuarionuevoComponent', () => {
  let component: UsuarionuevoComponent;
  let fixture: ComponentFixture<UsuarionuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarionuevoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarionuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
