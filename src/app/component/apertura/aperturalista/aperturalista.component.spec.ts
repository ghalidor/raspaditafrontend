import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturalistaComponent } from './aperturalista.component';

describe('AperturalistaComponent', () => {
  let component: AperturalistaComponent;
  let fixture: ComponentFixture<AperturalistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AperturalistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AperturalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
