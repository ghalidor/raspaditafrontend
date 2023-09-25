import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocallistaComponent } from './locallista.component';

describe('LocallistaComponent', () => {
  let component: LocallistaComponent;
  let fixture: ComponentFixture<LocallistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocallistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocallistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
