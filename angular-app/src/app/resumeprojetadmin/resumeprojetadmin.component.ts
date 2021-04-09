import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ResearchBDDService } from '../services/research-bdd.service';
import { AuthenticationService } from '../services/authentication.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-resumeprojetadmin',
  templateUrl: './resumeprojetadmin.component.html',
  styleUrls: ['./resumeprojetadmin.component.css']
})
export class ResumeprojetadminComponent implements OnInit {
  iddemande: string;
  tableauProjets: any[];
  tableauPerimetres: any[];
  ligneChiffrageProjets: string[];
  tableauDroitUtilisateur: any[];
  userinfos: any;
  i: number;
  submitted = false;
  formulaireForm: FormGroup;

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
    console.log(this.iddemande);


    // // Récupération du résumé du projet avec la fonction contenu dans research-bdd.service.ts
    this.resumeProjet.getResumeProjetAdmin(this.userinfos.id_utilisateur, this.iddemande).subscribe((data: string[]) => {
      this.tableauProjets = data;
      console.log(this.tableauProjets);
    });

    // Récupération du chiffrage du projet avec la fonction contenu dans research-bdd.service.ts
    this.resumeProjet.getChiffrageAdmin(this.userinfos.id_utilisateur, this.iddemande).subscribe((data: string[]) => {
      this.ligneChiffrageProjets = data;
      console.log(this.ligneChiffrageProjets);
    });

    // Récupération des périmètres du projet avec la fonction contenu dans research-bdd.service.ts
    this.resumeProjet.getResumePerimetreAdmin(this.userinfos.id_utilisateur, this.iddemande).subscribe((data: string[]) => {
      this.tableauPerimetres = data;

      if (this.tableauPerimetres.length === 0) { // si on a pas de périmètre renseigné pour ce projet
        this.tableauPerimetres[0] = { nom_perimetre: 'Non renseigné' }; // on affiche non renseigné
      }

      console.log('taille perim' + this.tableauPerimetres.length);
      console.log(this.tableauPerimetres);
    });

    // Récupération du rôle de l'utilisateur qui a créer le projet avec la fonction contenu dans research-bdd.service.ts
    this.resumeProjet.getDroitUtilisateurAdmin(this.userinfos.id_utilisateur, this.iddemande).subscribe((data: string[]) => {
      this.tableauDroitUtilisateur = data;
      console.log(this.tableauDroitUtilisateur);
    });

  }

  // Permet de passer l'état du projet à 2 si on etait à l'état 1 et fais de la redirection
  onClickRouteChiffrage() {
    console.log(this.iddemande);
    if (this.tableauProjets && this.tableauProjets[0] && this.tableauProjets[0].fk_etat_id === 1) {
      // passe l'état du projet à 2
      this.resumeProjet.setEtatProjetTraiteAdmin(this.iddemande, 2).subscribe((data: string[]) => {
        console.log(data);
        this.router.navigate(['/formulaireadmin/', this.iddemande]); // redirection
      });
    } else {
    console.log('passage avant redirection');
    this.router.navigate(['/formulaireadmin/', this.iddemande]); // redirection
    }
  }

  // Vérifie si on est à l'état 1 du projet
  verificationPopup() {
    if (this.tableauProjets && this.tableauProjets[0] && this.tableauProjets[0].fk_etat_id === 1) {
      return true;
    } else {
      return false;
    }
  }

  // Vérifie si on est à l'état 2 ou + du projet
  isAfficherChiffrage() {
    if (this.tableauProjets && this.tableauProjets[0] && this.tableauProjets[0].fk_etat_id >= 2) {
      return true;
    } else {
      return false;
    }
  }

  // Vérifie si on est à l'état 3 ou + du projet
  isApresChiffrage() {
    if (this.tableauProjets && this.tableauProjets[0] && this.tableauProjets[0].fk_etat_id >= 3) {
      return true;
    } else {
      return false;
    }
  }

  // Vérifie si le chiffrage a une information de validation (refus / accepté / avec réserve)
  isValidationChiffrage() {
    if ( this.tableauProjets && this.tableauProjets[0].validation_chiffrage === null) {
      return false;
    } else {
      return true;
    }
  }

  // Vérifie si il y a une remarque de validation pour le chiffrage(Remarque = Commentaire)
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

  // Vérifie si l'état du projet est à 3 pile mais en même temps que l'utilisateur qui a crée le projet est un admin
  /* isAfficherBoutonChiffrageAdmin() {
    if ( (this.tableauProjets && this.tableauProjets[0].fk_etat_id === 3) &&
     (this.tableauDroitUtilisateur && this.tableauDroitUtilisateur[0].droit_utilisateur === 2) ) {
      return true;
    } else {
      return false;
    }
  } */

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
        this.resumeProjet.getResumeProjetAdmin(this.userinfos.id_utilisateur, this.iddemande).subscribe((data2: string[]) => {
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
        this.resumeProjet.getResumeProjetAdmin(this.userinfos.id_utilisateur, this.iddemande).subscribe((data2: string[]) => {
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
        this.resumeProjet.getResumeProjetAdmin(this.userinfos.id_utilisateur, this.iddemande).subscribe((data2: string[]) => {
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

 // Vérifie si le rôle de l'utilisateur qui a créer le projet est le rôle admin
  isUtilisateurAdmin() {
    if (this.tableauDroitUtilisateur && this.tableauDroitUtilisateur[0].droit_utilisateur === 2) {
      return true;
    } else {
      return false;
    }
  }

}
