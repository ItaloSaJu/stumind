import { inject } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../shared/auth-state/auth-state.service';
import { map } from 'rxjs';

export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
      map((state) => {

        if (!state) {
          router.navigateByUrl('login');
          return false;
        }
        return true;
      })
    );
  };
};

export const publicGuard = (): CanActivateFn => {
  return () => {

    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
        map((state) => {
          console.log(state);
  
          if (!state) {
            router.navigateByUrl('home');
            return false;
          }
          return true;
        })
      );
  };
};