import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ResearchBDDService } from '../services/research-bdd.service';
import { AuthenticationService } from '../services/authentication.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-resumecontrat',
  templateUrl: './resumecontrat.component.html',
  styleUrls: ['./resumecontrat.component.css']
})
export class ResumecontratComponent implements OnInit {
  idcontrat: string;
  firstParam: string;
  tableauContrats: any[];
  lignetaches: any[];
  formulaireForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private resumeContrat: ResearchBDDService,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.formulaireForm = this.fb.group({  // Crée une instance de FormGroup
      commentaire: ['', Validators.required], // champ commentaire
      etatProjet: [''], // champ état projet
      validationChiffrage: [''] // champ validation
    });

    this.idcontrat = this.route.snapshot.paramMap.get('idcontrat'); // on récupère id du projet dans l'url
    console.log("contrat id: " + this.idcontrat);


    // // Récupération du résumé du projet avec la fonction contenu dans research-bdd.service.ts
    this.resumeContrat.getResumeContrat(this.idcontrat).subscribe((data: string[]) => {
      this.tableauContrats = data;
      console.log(this.tableauContrats);
    });

    // Récupération du chiffrage du projet avec la fonction contenu dans research-bdd.service.ts

   this.resumeContrat.getTacheContrat(this.idcontrat).subscribe((data: string[]) => {
      this.lignetaches = data;
      console.log(this.lignetaches);
    });

  }

  onClickFormulaireContrat() {
    this.router.navigate(['/formulairecontrat/', this.idcontrat]);
  }

}
