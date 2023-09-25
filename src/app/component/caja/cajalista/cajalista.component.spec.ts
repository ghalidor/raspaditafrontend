import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajalistaComponent } from './cajalista.component';

describe('CajalistaComponent', () => {
  let component: CajalistaComponent;
  let fixture: ComponentFixture<CajalistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajalistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
