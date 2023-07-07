import {inject} from '@angular/core';
import { Router , ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

// check if the user has access
const compareAccessLevels = (requiredAccessLevel: any, accessLevels: any): boolean => {
  return accessLevels.groups.includes(requiredAccessLevel[0]);
}

export const accessLevelGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const route = inject(ActivatedRouteSnapshot);
  const requiredAccessLevel = route.data['accessLevels']; // required access level

  return authService.accessGroupsService().pipe(map(res => {
    if (compareAccessLevels(requiredAccessLevel, res)) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }));

};
