import {inject} from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

// check if the user has access
const compareAccessLevels = (requiredAccessLevel: any, accessLevels: any): boolean => {
  return accessLevels.groups.includes(requiredAccessLevel);
}

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.accessGroupsService().pipe(map(res => {
    if (compareAccessLevels("SystemAdmin", res)) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }));

};
