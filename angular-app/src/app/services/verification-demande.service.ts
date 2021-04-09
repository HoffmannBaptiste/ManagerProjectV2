import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { ResearchBDDService } from './research-bdd.service';
import { Role } from '../modeles/role';

@Injectable({
  providedIn: 'root'
})
export class VerificationDemandeService implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private resumeProjet: ResearchBDDService
) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    // console.log(route.url[0].path);
    const routeurl = route.url[0].path;

    if (currentUser) {
      if (currentUser.droit_utilisateur === Role.Admin) {
        switch (routeurl) {
          case 'resumeprojetadmin':
            this.resumeProjet.getResumeProjetAdmin(
              currentUser.id_utilisateur,
              route.paramMap.get('iddemande'))
              .subscribe((data: string[]) => {
                // console.log(data);
              },
              error => {
                this.router.navigate(['/etatprojetadmin'], { queryParams: { returnUrl: state.url } });
                return false;
              });
            break;
          case 'utilisateur':
            this.resumeProjet.getUtilisateurInfos(
              route.paramMap.get('iduser'))
              .subscribe((data: string[]) => {
                // console.log(data);
              },
              error => {
                this.router.navigate(['/etatprojetadmin'], { queryParams: { returnUrl: state.url } });
                return false;
              });
            break;
          default:
            break;
        }
      } else {
        this.resumeProjet.getResumeProjetClient(
          currentUser.id_utilisateur,
          route.paramMap.get('iddemande'))
          .subscribe((data: string[]) => {
            console.log(data);
          },
          error => {
            this.router.navigate(['/etatprojet'], { queryParams: { returnUrl: state.url } });
            return false;
          });
      }

      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/authentification'], { queryParams: { returnUrl: state.url } });
    return false;
}
}
