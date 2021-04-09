import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeComponent2 } from './home2/home.component2';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { EtatprojetComponent } from './etatprojet/etatprojet.component';
import { EtatprojetadminComponent } from './etatprojetadmin/etatprojetadmin.component';
import { FormulaireadminComponent } from './formulaireadmin/formulaireadmin.component';
import { FormulairecontratComponent } from './formulairecontrat/formulairecontrat.component';
import { FormulaireclientComponent } from './formulaireclient/formulaireclient.component';
import { ResumeprojetComponent } from './resumeprojet/resumeprojet.component';
import { ResumeprojetadminComponent } from './resumeprojetadmin/resumeprojetadmin.component';
import { CreationusersComponent } from './creationusers/creationusers.component';
import { ErrorComponent } from './error/error.component';
import { DatePipe } from '@angular/common';
import { Role } from './modeles/role';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerificationDemandeService } from './services/verification-demande.service';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserComponent } from './user/user.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { RolesComponent } from './roles/roles.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { CreationrolesComponent } from './creationroles/creationroles.component';
import { FormulairecontratcreationComponent } from './formulairecontratcreation/formulairecontratcreation.component';
import { EtatcontratadminComponent } from './etatcontratadmin/etatcontratadmin.component';
import { EtatContratComponent } from './etatcontrat/etatcontrat.component';
import { ResumecontratComponent } from './resumecontrat/resumecontrat.component';




const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home2', component: HomeComponent2 },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'formulaireclient', canActivate: [AuthGuardService], component: FormulaireclientComponent },
  { path: 'formulaireadmin/:id', canActivate: [AuthGuardService], data: { roles: [Role.Admin] }, component: FormulaireadminComponent },
  { path: 'formulairecontrat/:id', canActivate: [AuthGuardService], data: { roles: [Role.Admin] }, component: FormulairecontratComponent },
  { path: 'resumeprojet/:iduser/:iddemande', canActivate: [AuthGuardService, VerificationDemandeService], component: ResumeprojetComponent},
  // tslint:disable-next-line: max-line-length
  { path: 'resumeprojetadmin/:iddemande', canActivate: [AuthGuardService , VerificationDemandeService], data: { roles: [Role.Admin] }, component: ResumeprojetadminComponent},
  { path: 'etatprojet', canActivate: [AuthGuardService],  data: { roles: [Role.User] [Role.Collaborateur] }, component: EtatprojetComponent},
  { path: 'etatprojetadmin', canActivate: [AuthGuardService], data: { roles: [Role.Admin] }, component: EtatprojetadminComponent},
  { path: 'utilisateurs', canActivate: [AuthGuardService], data: { roles: [Role.Admin] }, component: ListUsersComponent},
  { path: 'utilisateur/:iduser', canActivate: [AuthGuardService], component: UserComponent},
  { path: 'creationusers',  data: { roles: [Role.Admin] }, canActivate: [AuthGuardService], component: CreationusersComponent},
  { path: '', component: AuthentificationComponent },
  { path: 'erreur', component: ErrorComponent},
  { path: 'creationroles',  data: { roles: [Role.Admin] }, canActivate: [AuthGuardService], component: CreationrolesComponent},
  { path: 'roles/:idroles', canActivate: [AuthGuardService], component: RolesComponent},
  { path: 'roles', canActivate: [AuthGuardService], data: { roles: [Role.Admin] }, component: ListRolesComponent},
  { path: 'etatcontratadmin', canActivate: [AuthGuardService], data: { roles: [Role.Admin] }, component: EtatcontratadminComponent},
  { path: 'formulaireccontratcreation', canActivate: [AuthGuardService], component: FormulairecontratcreationComponent },
  { path: 'resumecontrat/:idcontrat', canActivate: [AuthGuardService , VerificationDemandeService], data: { roles: [Role.Admin] }, component: ResumecontratComponent},
  { path: 'etatcontratadmin', canActivate: [AuthGuardService], data: { roles: [Role.Admin] }, component: EtatcontratadminComponent},
  { path: 'etatcontrat', canActivate: [AuthGuardService], component: EtatContratComponent},
  {path : '**', redirectTo: '/erreur'}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeComponent2,
    AuthentificationComponent,
    EtatprojetComponent,
    EtatprojetadminComponent,
    FormulaireadminComponent,
    FormulairecontratComponent,
    FormulaireclientComponent,
    ResumeprojetComponent,
    ResumeprojetadminComponent,
    CreationusersComponent,
    ErrorComponent,
    ListUsersComponent,
    UserComponent,
    RolesComponent,
    ListRolesComponent,
    CreationrolesComponent,
    FormulairecontratcreationComponent,
    EtatcontratadminComponent,
    EtatcontratadminComponent,
    EtatContratComponent,
    ResumecontratComponent,
    JwPaginationComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
