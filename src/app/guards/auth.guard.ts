import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(map(isLoggedIn => {
    if (isLoggedIn) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }));

};