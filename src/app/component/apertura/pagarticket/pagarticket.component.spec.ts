import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarticketComponent } from './pagarticket.component';

describe('PagarticketComponent', () => {
  let component: PagarticketComponent;
  let fixture: ComponentFixture<PagarticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagarticketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
