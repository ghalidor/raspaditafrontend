import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioeditarComponent } from './usuarioeditar.component';

describe('UsuarioeditarComponent', () => {
  let component: UsuarioeditarComponent;
  let fixture: ComponentFixture<UsuarioeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioeditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
