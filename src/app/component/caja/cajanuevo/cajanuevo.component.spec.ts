import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajanuevoComponent } from './cajanuevo.component';

describe('CajanuevoComponent', () => {
  let component: CajanuevoComponent;
  let fixture: ComponentFixture<CajanuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajanuevoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajanuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
