import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolnuevoComponent } from './rolnuevo.component';

describe('RolnuevoComponent', () => {
  let component: RolnuevoComponent;
  let fixture: ComponentFixture<RolnuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolnuevoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolnuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
