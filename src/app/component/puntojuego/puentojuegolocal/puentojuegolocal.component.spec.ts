import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuentojuegolocalComponent } from './puentojuegolocal.component';

describe('PuentojuegolocalComponent', () => {
  let component: PuentojuegolocalComponent;
  let fixture: ComponentFixture<PuentojuegolocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuentojuegolocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuentojuegolocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
