import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import {selectJwtToken} from "../../store/auth/auth.selectors";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectJwtToken).pipe(
    take(1),
    map((jwtToken) => {
      if (jwtToken) {
        return true;
      } else {
        router.navigate(['/sign-in']).then();
        return false;
      }
    })
  );
};
