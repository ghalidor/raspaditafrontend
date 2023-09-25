import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumendiaComponent } from './resumendia.component';

describe('ResumendiaComponent', () => {
  let component: ResumendiaComponent;
  let fixture: ComponentFixture<ResumendiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumendiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumendiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
