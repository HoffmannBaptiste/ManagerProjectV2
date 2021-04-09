import { Component, OnInit } from '@angular/core';
import { ResearchBDDService } from '../services/research-bdd.service';
import {Router, RouterModule} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-etatcontratadmin',
  templateUrl: './etatcontratadmin.component.html',
  styleUrls: ['./etatcontratadmin.component.css']
})
export class EtatcontratadminComponent implements OnInit {

  tableauContrats: any[];

  constructor(
    private etatContrat: ResearchBDDService,
    private router: Router
    ) { }


  ngOnInit() {
    /* permet de récupérer les informations générales d'état de projet
     avec la fonction getEtatProjetAdmin contenu dans le fichier research-bdd.service.ts */
    this.etatContrat.getEtatContratAdmin().subscribe((data: string[]) => {
      this.tableauContrats = data;
      console.log(this.tableauContrats);
    });
    $.getScript('../assets/js/sleek.js');
  }


  // permet de rediriger sur la page  resumeprojetadmin
  onClickResumeContrat(id: string) {
    this.router.navigate(['/resumecontrat/', id]);
  }

  
}
