import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariolocalComponent } from './usuariolocal.component';

describe('UsuariolocalComponent', () => {
  let component: UsuariolocalComponent;
  let fixture: ComponentFixture<UsuariolocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariolocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariolocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
