import { Component, OnInit } from '@angular/core';
import { ResearchBDDService } from '../services/research-bdd.service';
import {Router, RouterModule} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import * as $ from 'jquery';

declare var $jscomp: any;

@Component({
  selector: 'app-etatprojet',
  templateUrl: './etatprojet.component.html',
  styleUrls: ['./etatprojet.component.css']
})
export class EtatprojetComponent implements OnInit {

  tableauProjets: any[];
  tabtest: any[];
  currentUser: any;
  shaObj: any;

  constructor( private etatProjet: ResearchBDDService, private router: Router, private user: AuthenticationService) {
    this.currentUser = this.user.currentUserValue; // cookie
  }

  ngOnInit() {
    /* permet de récupérer les informations générales d'état de projet du client connecté
     avec la fonction getEtatProjetClient contenu dans le fichier research-bdd.service.ts */
    this.etatProjet.getEtatProjetClient(this.currentUser.id_utilisateur).subscribe((data: string[]) => {
      this.tableauProjets = data;
      console.log(this.tableauProjets);
    });
    $.getScript('../assets/js/sleek.js');
  }

  // permet de renvoyer sur la page résume projet du projet sur lequel on a cliqué
  onClickProjet(iddemande: string) {
    this.router.navigate(['/resumeprojet', this.currentUser.id_utilisateur, iddemande]);
  }
  // permet de renvoyer sur la page de création de nouveau projet
  onClickNouveauProjet() {
    this.router.navigate(['/formulaireclient']);
  }

}
