import { Component, OnInit } from '@angular/core';
import { ResearchBDDService } from '../services/research-bdd.service';
import {Router, RouterModule} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-etatprojetadmin',
  templateUrl: './etatprojetadmin.component.html',
  styleUrls: ['./etatprojetadmin.component.css']
})
export class EtatprojetadminComponent implements OnInit {

  tableauProjets: any[];
  // edited = true;

  constructor(
    private etatProjet: ResearchBDDService,
    private router: Router
    ) { }


  ngOnInit() {
    /* permet de récupérer les informations générales d'état de projet
     avec la fonction getEtatProjetAdmin contenu dans le fichier research-bdd.service.ts */
    this.etatProjet.getEtatProjetAdmin().subscribe((data: string[]) => {
      this.tableauProjets = data;
      console.log(this.tableauProjets);
    });
    $.getScript('../assets/js/sleek.js');
    // this.saveTodos();
  }

  // saveTodos(): void {
  //   // wait 3 Seconds and hide
  //   setTimeout(function() {
  //       this.edited = false;
  //       console.log(this.edited);
  //   }.bind(this), 3000);
  //  }

  // permet de rediriger sur la page  resumeprojetadmin
  onClickResumeProjet(id: string) {
    this.router.navigate(['/formulaireadmin/', id]);
  }
}
