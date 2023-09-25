import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuentojuegonuevoComponent } from './puentojuegonuevo.component';

describe('PuentojuegonuevoComponent', () => {
  let component: PuentojuegonuevoComponent;
  let fixture: ComponentFixture<PuentojuegonuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuentojuegonuevoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuentojuegonuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
