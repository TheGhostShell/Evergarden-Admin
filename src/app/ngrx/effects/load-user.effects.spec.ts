import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of} from 'rxjs';

import {LoadUserEffects} from './load-user.effects';

describe('LoadUserEffects', () => {
  const actions$: Observable<any> = of();
  let effects: LoadUserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadUserEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get<LoadUserEffects>(LoadUserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
