import { Component, OnInit } from '@angular/core';
import { ResearchBDDService } from '../services/research-bdd.service';
import {Router, RouterModule} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import * as $ from 'jquery';

declare var $jscomp: any;

@Component({
  selector: 'app-etatcontrat',
  templateUrl: './etatcontrat.component.html',
  styleUrls: ['./etatcontrat.component.css']
})
export class EtatContratComponent implements OnInit {

  tableauContrats: any[];
  currentUser: any;
  tableauContratsOn : any[];

  constructor(
    private etatContrat: ResearchBDDService,
    private router: Router
    ) { }


  ngOnInit() {
    /* permet de récupérer les informations générales d'état de projet
     avec la fonction getEtatProjetAdmin contenu dans le fichier research-bdd.service.ts */
    this.etatContrat.getEtatContrat(this.currentUser.id_utilisateur).subscribe((data: string[]) => {
      this.tableauContrats = data;
      console.log(this.tableauContrats);
      
      console.log(this.tableauContrats);
    });
    $.getScript('../assets/js/sleek.js');
  }


  // permet de rediriger sur la page  resumeprojetadmin
  onClickResumeContrat(id: string) {
    this.router.navigate(['/resumecontrat/', id]);
  }
}
