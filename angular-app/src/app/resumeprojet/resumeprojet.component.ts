import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ResearchBDDService } from '../services/research-bdd.service';
import { AuthenticationService } from '../services/authentication.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-resumeprojet',
  templateUrl: './resumeprojet.component.html',
  styleUrls: ['./resumeprojet.component.css']
})
export class ResumeprojetComponent implements OnInit {
  iddemande: string;
  useridurl: string;
  userinfos: any;
  tableauProjets: any[];
  tableauPerimetres: any[];
  ligneChiffrageProjets: string[];
  formulaireForm: FormGroup;
  submitted = false;
  etatForm: string;
  validationForm: string;

  constructor(
    private route: ActivatedRoute,
    private resumeProjet: ResearchBDDService,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.userinfos = this.authenticationService.currentUserValue;
  }

  ngOnInit() {

    this.formulaireForm = this.fb.group({  // Crée une instance de FormGroup
      commentaire: ['', Validators.required], // champ commentaire
      etatProjet: [''], // champ état projet
      validationChiffrage: [''] // champ validation
    });

    this.iddemande = this.route.snapshot.paramMap.get('iddemande'); // on récupère id du projet dans l'url
    this.useridurl = this.route.snapshot.paramMap.get('iduser'); // on récupère id due l'utilisateur dans l'url
    console.log(this.iddemande);

    /* Comparaison (pour un client) de id utilisateur url et id utilisateur cookie pour vérifier si le projet
    lui appartient. Sinon redirection page d'accueil */
    // tslint:disable-next-line: triple-equals
    if (this.useridurl != this.userinfos.id_utilisateur) { // ne pas changer le !=
      this.router.navigate(['/etatprojet']); // redirection
    }

    // Récupération du résumé du projet avec la fonction contenu dans research-bdd.service.ts
    this.resumeProjet.getResumeProjetClient(this.userinfos.id_utilisateur, this.iddemande).subscribe((data: string[]) => {
      this.tableauProjets = data; // on met les données dans le tableau
      console.log(this.tableauProjets);
    });

    // Récupération du chiffrage du projet avec la fonction contenu dans research-bdd.service.ts
    this.resumeProjet.getChiffrageClient(this.userinfos.id_utilisateur, this.iddemande).subscribe((data: string[]) => {
      this.ligneChiffrageProjets = data;
      console.log(this.ligneChiffrageProjets);
    });

    // Récupération des périmètres du projet avec la fonction contenu dans research-bdd.service.ts
    this.resumeProjet.getResumePerimetreClient(this.userinfos.id_utilisateur, this.iddemande).subscribe((data: string[]) => {
      this.tableauPerimetres = data;
      if (this.tableauPerimetres.length === 0) { // si on a pas de périmètre renseigné pour ce projet
        this.tableauPerimetres[0] = { nom_perimetre: 'Non renseigné' }; // on affiche non renseigné
      }
      console.log(this.tableauPerimetres);
    });

  }

  // Permet de récupérer les controles sur le formulaire notamment les retours d'erreurs avec la fonction f()
  get f() { return this.formulaireForm.controls; }

  // Envoi du formulaire
  onClickValider(bouton: string) {
    this.submitted = true;
    console.log('debut de fonction');

    // cas ou le client accepte le chiffrage
    if (bouton === 'accepter') {
      console.log('accepter');
      this.formulaireForm.get('commentaire').setValue(''); // pas de commentaire côté client dans ce cas donc on envoie ''
      this.formulaireForm.get('etatProjet').setValue('4'); // passe à l'etat 4 = chiffrage accepté
      this.formulaireForm.get('validationChiffrage').setValue('Chiffrage accepté'); // information de validation
      this.resumeProjet.setCommentaireChiffrage(this.iddemande, this.formulaireForm).subscribe((data: string[]) => {
        console.log(data);
        this.resumeProjet.getResumeProjetClient(this.userinfos.id_utilisateur, this.iddemande).subscribe((data2: string[]) => {
          this.tableauProjets = data2;
          console.log(this.tableauProjets);
        });
      }); // setCommentaireChiffrage (research-bdd.service.ts)
    }

    // Si il y a une erreur dans le formulaire on retourne l'erreur
    if (this.formulaireForm.invalid) {
        return;
    }

    // cas ou le client refuse le chiffrage
    if (bouton === 'refus') {
      console.log('refus');
      this.formulaireForm.get('etatProjet').setValue('7'); // passe a l'etat 7 = projet annulé
      this.formulaireForm.get('validationChiffrage').setValue('Chiffrage refusé'); // information de validation
      this.resumeProjet.setCommentaireChiffrage(this.iddemande, this.formulaireForm).subscribe((data: string[]) => {
        console.log(data);
        this.resumeProjet.getResumeProjetClient(this.userinfos.id_utilisateur, this.iddemande).subscribe((data2: string[]) => {
          this.tableauProjets = data2;
          console.log(this.tableauProjets);
        });
      }); // setCommentaireChiffrage (research-bdd.service.ts)
    }

    // cas ou le client accepte le chiffrage avec réserve
    if (bouton === 'réserve') {
      console.log('réserve');
      this.formulaireForm.get('etatProjet').setValue('2'); // retour à l'etat 2 = Traitement en cours
      this.formulaireForm.get('validationChiffrage').setValue('Chiffrage accepté avec réserve'); // information de validation
      this.resumeProjet.setCommentaireChiffrage(this.iddemande, this.formulaireForm).subscribe((data: string[]) => {
        console.log(data);
        this.resumeProjet.getResumeProjetClient(this.userinfos.id_utilisateur, this.iddemande).subscribe((data2: string[]) => {
          this.tableauProjets = data2;
          console.log(this.tableauProjets);
        });
      }); // setCommentaireChiffrage (research-bdd.service.ts)
    }
  }



  // Permet de réinitialiser le champ commentaire car commun entre les différents boutons
  reinitialiseCommentaire() {
    this.formulaireForm.get('commentaire').setValue('');
  }

  // Vérifie si le chiffrage a une information de validation (refus / accepté / avec réserve)
  isValidationChiffrage() {
    if ( this.tableauProjets && this.tableauProjets[0].validation_chiffrage === null) {
      return false;
    } else {
      return true;
    }
  }

  // Vérifie si il y a une remarque de validation pour le chiffrage (Remarque = Commentaire)
  isRemarqueValidation() {
    if ( (this.tableauProjets && this.tableauProjets[0].remarque_validation === null) ||
     (this.tableauProjets && this.tableauProjets[0].remarque_validation === '') ) {
      return false;
    } else {
      return true;
    }
  }

  // Vérifie si l'état du projet est à 3 pile
  isDemandeChiffre() {
    if ( this.tableauProjets && this.tableauProjets[0].fk_etat_id === 3) {
      return true;
    } else {
      return false;
    }
  }

  // Vérifie si l'état du projet est à 3 ou +
  isApresChiffrage() {
    if (this.tableauProjets && this.tableauProjets[0] && this.tableauProjets[0].fk_etat_id >= 3) {
      return true;
    } else {
      return false;
    }
  }

}
