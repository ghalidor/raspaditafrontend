import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleditarComponent } from './roleditar.component';

describe('RoleditarComponent', () => {
  let component: RoleditarComponent;
  let fixture: ComponentFixture<RoleditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
