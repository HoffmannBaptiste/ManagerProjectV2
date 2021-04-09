import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { Role } from '../modeles/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(currentUser.droit_utilisateur) === -1) {
            // role not authorised so redirect to home page
            if (currentUser.droit_utilisateur === Role.Admin) {
              this.router.navigate(['/etatprojetadmin']);
              return false;
            }
            else if (currentUser.droit_utilisateur === Role.Collaborateur) {
              this.router.navigate(['/etatprojet']);
              return false;
            }
             else {
              this.router.navigate(['/etatprojet']);
              return false;
            }
        }

        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/authentification'], { queryParams: { returnUrl: state.url } });
    return false;
}
}
