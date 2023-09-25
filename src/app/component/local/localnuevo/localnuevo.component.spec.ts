import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalnuevoComponent } from './localnuevo.component';

describe('LocalnuevoComponent', () => {
  let component: LocalnuevoComponent;
  let fixture: ComponentFixture<LocalnuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalnuevoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalnuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
