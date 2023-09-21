import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsidebarComponent } from './lsidebar.component';

describe('LsidebarComponent', () => {
  let component: LsidebarComponent;
  let fixture: ComponentFixture<LsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
