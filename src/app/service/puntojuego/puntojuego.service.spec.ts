import { TestBed } from '@angular/core/testing';

import { PuntojuegoService } from './puntojuego.service';

describe('PuntojuegoService', () => {
  let service: PuntojuegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntojuegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
