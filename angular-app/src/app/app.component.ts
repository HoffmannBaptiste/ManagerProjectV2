import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Role } from './modeles/role';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'ProjectManagerv3';
  cheminImage: any = '../assets/images/capgemini.png';
  ImageUser: any = '../assets/images/user.jpg';
  currentUser: any;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(event => {
    //     $.getScript('../assets/js/sleek.js');
    //   });
  }

  get isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/authentification']);
  }

  // retour() {
  //   if (this.currentUser && this.currentUser.droit_utilisateur === Role.Admin) {
  //     this.router.navigate(['/etatprojetadmin']);
  //   } else {
  //     this.router.navigate(['/etatprojet']);
  //   }
  // }

  // ngOnDestroy() {
  //   this.routerSubscription.unsubscribe();
  // }
}
