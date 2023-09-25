import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarticketComponent } from './generarticket.component';

describe('GenerarticketComponent', () => {
  let component: GenerarticketComponent;
  let fixture: ComponentFixture<GenerarticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarticketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
