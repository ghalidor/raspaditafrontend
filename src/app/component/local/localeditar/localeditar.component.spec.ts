import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleditarComponent } from './localeditar.component';

describe('LocaleditarComponent', () => {
  let component: LocaleditarComponent;
  let fixture: ComponentFixture<LocaleditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocaleditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocaleditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
