import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarticketsaldoComponent } from './pagarticketsaldo.component';

describe('PagarticketsaldoComponent', () => {
  let component: PagarticketsaldoComponent;
  let fixture: ComponentFixture<PagarticketsaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagarticketsaldoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarticketsaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
