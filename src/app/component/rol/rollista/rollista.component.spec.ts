import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollistaComponent } from './rollista.component';

describe('RollistaComponent', () => {
  let component: RollistaComponent;
  let fixture: ComponentFixture<RollistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
