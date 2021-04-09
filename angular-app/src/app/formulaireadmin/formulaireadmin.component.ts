import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Router,
  RouterModule,
  ActivatedRoute
} from '@angular/router';
import {
  ResearchBDDService
} from '../services/research-bdd.service';
import { delay } from 'q';

@Component({
  selector: 'app-formulaireadmin',
  templateUrl: './formulaireadmin.component.html',
  styleUrls: ['./formulaireadmin.component.css']
})





export class FormulaireadminComponent implements OnInit {

  sousetapeForm: FormGroup;
  submitted = false;
  calcul: any;
  index: any;
  values = '';
  values2 = '';
  bouton: boolean ;
  regexNom: RegExp = /^[0-9]/;
  lignechiffrageprojets: any[];
  tableau: any[];
  id3: string;
  id2: string;
  id: string;
  iddemande: string;
  i: number;
  pageChiffrage: Array < any > ;
  test: number;
  utilisateurs: any[];
  chargecomplets2 : any[];
  index2 : any;
  index3 : any;
  index4 : any;
  index5 : any;
  index6 : any;
  calcul2 : number;
  calcul4 : number;
  calcul5 : number;
  lemois : any;
  leannee : any;
  lelogin : any;
  lecharge : any;
  unautretableau : any[];
  Charge_int : any;
  chargecomplets3 : any[];
  delete_nom_acteur : any;
  delete_macharge : any;
  delete_monannee : any;
  delete_monmois : any;
  delete_monid : any;
  Autrecalcul : any;
  reloadornot : any;
  utilisateursid : any;

  // onKey(value: string) {
  //   this.values = value ;
  // }

  // onKey2(value: string) {
  //   this.values2 = value ;
  // }

  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private etatProjet: ResearchBDDService,
      private fctbdd: ResearchBDDService,
      private get_listcharge : ResearchBDDService,
  ) {}

  ngOnInit() {

      this.fctbdd.getUtilisateurs().subscribe((data: string[]) => {
        this.utilisateurs = data;
        console.log(this.utilisateurs);
      // for (const iterator of this.utilisateurs) {
      //   console.log(Object.keys(iterator).map(key => iterator[key]));
      // }
      });

      this.get_listcharge.getlistcharge().subscribe((data3: string[]) => {
        this.chargecomplets2 = data3;
        console.log(this.chargecomplets2);
      });





      this.sousetapeForm = this.fb.group({

          // Initialisation des champs
          annee: ['',
              [
                  Validators.required,
                  Validators.maxLength(250),

              ]
          ],


          mois: ['',
              [
                  Validators.required,
                  Validators.maxLength(250),

              ]
          ],

          acteur: ['',
              [
                  Validators.required,
                  Validators.maxLength(250),

              ]
          ],
          charge: ['',
              [
                  Validators.required,
                  Validators.maxLength(50),
                  Validators.pattern(this.regexNom)

              ]
          ],
          grade: ['',
          [
              Validators.required,
              Validators.maxLength(50),

          ]
      ],
          tjm: ['',
              [
                  Validators.required,
                  Validators.maxLength(50),
                  Validators.pattern(this.regexNom)

              ]
          ],
          total: [''],
          remarques: [],
          sousetape: ['',
              [
                  Validators.required,
                  Validators.maxLength(250),

              ]
          ],
          etape: ['',
              [
                  Validators.required,
                  Validators.maxLength(250),

              ]
          ],


      });



      // Permet de mettre à jour le tableau des sousetape en allant piocher dans la BDD
      this.id = this.route.snapshot.paramMap.get('id');
      this.etatProjet.getFormulaireAdmin(this.id).subscribe((data: string[]) => {
          this.lignechiffrageprojets = data;
          // tslint:disable-next-line: max-line-length

          // CALCUL TOTAL cout
          this.calcul = 0;
          for (this.index = 0; this.index < this.lignechiffrageprojets.length; this.index++) {
        this.calcul = this.calcul + this.lignechiffrageprojets[this.index].valeur_total;
     }
          this.calcul = this.calcul + this.sousetapeForm.get('total').value;

          if (this.lignechiffrageprojets && this.lignechiffrageprojets[0]
            && this.lignechiffrageprojets[0].fk_etat_id !== (2 || undefined)) {
            this.router.navigate(['/resumeprojetadmin/', this.id]);
          }
          console.log(this.lignechiffrageprojets);
      });

      this.calcul2 = 0;


  }



  formulaire() {

    this.AjouterLigne();

  }

  deleteEtape(id) {

      this.SupprimerLigne(id);


  }

  // Redirection
  onClickRetourResume() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['/resumeprojetadmin/', this.id]);
  }

  // Valide le chiffrage de l'admin qui sera a disposition du client désormais
  onClickValiderChiffrage() {
      this.id = this.route.snapshot.paramMap.get('id');
      // passage du projet à l'état 3 (Demande chiffrée)
      this.etatProjet.setEtatProjetTraiteAdmin(this.id, 3).subscribe((data: string[]) => {
          console.log(data);
          // Envoi du coût total du projet
          this.etatProjet.setValeurTotal(this.id, this.calcul).subscribe((data2: string[]) => {
            console.log(data2);
            // Redirection
            this.onClickRetourResume();
          });
      });
  }

  isMontrerFormulaireChiffrage(etat: number) {
    if (etat === 2 || etat === null) {
        return true;
    } else {
        return false;
    }
}

  modifEtape(id, index) {

      document.getElementById('openModal2').click();
      console.log(id);
      console.log(this.lignechiffrageprojets);

      this.id3 = id;

      //On verifie si on doit faire une soustraction ou une adition
      //if (this.lignechiffrageprojets[index].valeur_charge >= this.sousetapeForm.get('charge').value) {
      //  this.calcul5 = Number(this.sousetapeForm.get('charge').value) + Number(this.chargecomplets2[this.index5].janvier_charge);
      //}
      //else {
      //  this.calcul5 = Number(this.chargecomplets2[this.index5].janvier_charge) - Number(this.sousetapeForm.get('charge').value);
      //}
      this.sousetapeForm.get('etape').setValue(this.lignechiffrageprojets[index].nom_etape);
      this.sousetapeForm.get('sousetape').setValue(this.lignechiffrageprojets[index].nom_sous_etape);
      this.sousetapeForm.get('acteur').setValue(this.lignechiffrageprojets[index].nom_acteur);
      this.sousetapeForm.get('mois').setValue(this.lignechiffrageprojets[index].mois_chiffrage);
      this.sousetapeForm.get('annee').setValue(this.lignechiffrageprojets[index].annee_chiffrage);

      this.sousetapeForm.get('grade').setValue(this.lignechiffrageprojets[index].nom_grade);
      this.sousetapeForm.get('charge').setValue(this.lignechiffrageprojets[index].valeur_charge);
      this.sousetapeForm.get('tjm').setValue(this.lignechiffrageprojets[index].valeur_tjm);
      this.sousetapeForm.get('total').setValue(this.lignechiffrageprojets[index].valeur_total);
      this.sousetapeForm.get('remarques').setValue(this.lignechiffrageprojets[index].remarque);


      // CALCUL TOTAL // remi
      // this.calcul = 0;
      // for (this.index = 0; this.index < this.lignechiffrageprojets.length; this.index++) {
      //   this.calcul = this.calcul + this.lignechiffrageprojets[this.index].valeur_total;
      // }
      // this.calcul = this.calcul + this.sousetapeForm.get('total').value;

    }

  sauv() {
    this.deleteEtape(this.id2);
  }

  modifierTotalChriffrage (){
    this.AjouterLigne();
  }


    // Tests des champs obligatoires
    get f() {
      return this.sousetapeForm.controls;
    }

    recuperationID(id) {
      this.id2 = id;
      console.log(this.id2);

  }

  onChangePage(pageChiffrage: Array < any > ) {
      // update current page of items

      this.pageChiffrage = pageChiffrage;
  }

AjouterLigne() {
  //console.log("la deuxieme annee", this.leannee)
    // Permet de faire le calcul TJM* CHARGE = TOTAL
    this.sousetapeForm.get('total').setValue((this.sousetapeForm.get('tjm').value * this.sousetapeForm.get('charge').value));


    // Variable pour tester les champs obligatoire
    this.submitted = true;

    //console.log("bonsoir je suis : ", this.sousetapeForm);
    if (this.sousetapeForm.invalid) {
          return;
    }



      // Ajout d'une ligne sous etape dans la BDD
    this.id = this.route.snapshot.paramMap.get('id');
    this.etatProjet.setFormulaireAdmin(this.id, this.sousetapeForm).subscribe((data2: string[]) => {
      // Déclenche le clic pour les fênetres pop up
      console.log(data2);
      document.getElementById('openModal').click();
      // data2.forEach(element => this.lignechiffrageprojets.push(element)); // remi
    });

    // CALCUL TOTAL cout
    this.calcul = 0;
    for (this.index = 0; this.index < this.lignechiffrageprojets.length; this.index++) {
        this.calcul = this.calcul + this.lignechiffrageprojets[this.index].valeur_total;
    }
    this.calcul = this.calcul + this.sousetapeForm.get('total').value;

    //On declare les variables pour pouvoir comparer


    //this.calcul = 0;
    //On vient ajouter le la charge de la ligne dans la table utilisateurscharge
    /*for (this.index2 = 0; this.index2 < this.chargecomplets2.length; this.index2++) {
      if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "janvier")) {
        this.calcul2 = this.calcul2 + this.chargecomplets2[this.index2].janvier_charge;
        return this.calcul2;
        console.log("Voici le calcul dans la boucle :", this.calcul2);
    } }*/
    //On peut le declarer en tant que fonction pour éviter de l'utiliser a chaque fois
    //On vient ajouter le la charge de la ligne dans la table utilisateurscharge
    this.calcul2 = this.sousetapeForm.value.charge;
    for (this.index2 = 0; this.index2 < this.chargecomplets2.length; this.index2++) {
      if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "janvier")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].janvier_charge);
        console.log("Tu ajoute une ligne dans janvier :", this.calcul2);
      }
      else if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "fevrier")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].fevrier_charge);
      }
      else if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "mars")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].mars_charge);
      }
      else if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "avril")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].avril_charge);
      }
      else if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "mai")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].mai_charge);
      }
      else if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "juin")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].juin_charge);
      }
      else if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "juillet")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].juillet_charge);
      }
      else if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "aout")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].aout_charge);
      }
      else if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "septembre")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].septembre_charge);
      }
      else if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "octobre")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].octobre_charge);
      }
      else if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "nvembre")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].novembre_charge);
      }
      else if (this.chargecomplets2[this.index2].emploi_login_utilisateur == this.sousetapeForm.value.acteur && (this.chargecomplets2[this.index2].annee_charge == this.sousetapeForm.value.annee) && (this.sousetapeForm.value.mois = "decembre")) {
        this.calcul2 = Number(this.sousetapeForm.value.charge) + Number(this.chargecomplets2[this.index2].decembre_charge);
      }
      else {
        console.log("On ne rentre pas dans janvier");
      }
    }

    //console.log(this.sousetapeForm.value.charge);
    //console.log(this.sousetapeForm.value.mois);
    //console.log(this.sousetapeForm.value.acteur);
    //console.log(this.sousetapeForm.value.annee);
    //console.log(this.calcul2);

    for (let indexuserid = 0; indexuserid < this.utilisateurs.length; indexuserid++) {
      if (this.sousetapeForm.value.acteur == this.utilisateurs[indexuserid].login_utilisateur ) {
        this.utilisateursid = this.utilisateurs[indexuserid].id_utilisateur;
      }
      else {
        indexuserid ++;
      }

    }

    this.get_listcharge.setChargeTotal(this.utilisateursid, this.sousetapeForm.value.charge, this.sousetapeForm.value.mois, this.sousetapeForm.value.annee).subscribe((data220: string[]) => {
      console.log("VA DANS LA BASE : ", data220);
      // Redirection
      //this.router.navigate(['/utilisateurs']);
    });


    //lemois = this.sousetapeForm.get('mois');
    //console.log("voici le mois", lemois );
    // vider les champs à remplir sur la page web
    this.sousetapeForm.get('etape').setValue('');
    this.sousetapeForm.get('sousetape').setValue('');
    this.sousetapeForm.get('acteur').setValue('');
    this.sousetapeForm.get('mois').setValue('');
    this.sousetapeForm.get('annee').setValue('');
    this.sousetapeForm.get('charge').setValue('');
    this.sousetapeForm.get('grade').setValue('');
    this.sousetapeForm.get('tjm').setValue('');
    this.sousetapeForm.get('total').setValue('');
    this.sousetapeForm.get('remarques').setValue('');
    this.calcul2 = 0;

    this.get_listcharge.getlistcharge().subscribe((data33: string[]) => {
      this.chargecomplets2 = data33;
      console.log(this.chargecomplets2);
    });
    console.log("Vous avez effectué un ajout");

  }

  SupprimerLigne (id){
    // Permet de supprimer une ligne sous etape à l'écran et dans la BDD
    this.iddemande = this.route.snapshot.paramMap.get('id');
    //console.log(this.id2);
    //console.log(this.id);
    //console.log(typeof this.id2);
    //console.log("Voici votre premiere ligne :", this.lignechiffrageprojets[1].id_ligne);
    //console.log("Voici votre premiere ligne (nom de l'étape) :", this.lignechiffrageprojets[1].nom_etape);
    //console.log(this.lignechiffrageprojets);
    this.get_listcharge.getlistcharge().subscribe((data233: string[]) => {
      this.chargecomplets2 = data233;
      console.log("Voici le tableau après la suppresion ", this.chargecomplets2);
    });

    for (this.index4 = 0; this.index4 < this.lignechiffrageprojets.length; this.index4++) {
      if (this.lignechiffrageprojets[this.index4].id_ligne == this.id2) {
          this.delete_nom_acteur = this.lignechiffrageprojets[this.index4].nom_acteur;
          this.delete_monannee = this.lignechiffrageprojets[this.index4].annee_chiffrage;
          this.delete_monmois = this.lignechiffrageprojets[this.index4].mois_chiffrage;
          this.delete_macharge = this.lignechiffrageprojets[this.index4].valeur_charge;
          this.delete_monid = this.lignechiffrageprojets[this.index4].id_ligne;
          console.log("Voici l'ID de reference :", this.id2);
          console.log("Voici l'ID que l'on supprimer :", this.delete_monid);
          console.log("Voici la valeur de la charge que l'on veut supprimer :", this.delete_macharge);
          //return this.delete_nom_acteur;
      }
    }
    console.log("Voici la charge après la boucle for :", this.delete_macharge);
    this.reloadornot = 0 ;
    this.calcul4 = 0;
    //console.log("Voici le second nom de votre acteur :", this.delete_nom_acteur);
    //Deuxieme boucle for pour vérifier la cooncordance des lignes dans la table chiffrage et dans la table charge utilisateur

    for (let indexuserid2 = 0; indexuserid2 < this.utilisateurs.length; indexuserid2++) {
      if (this.delete_nom_acteur == this.utilisateurs[indexuserid2].login_utilisateur ) {
        this.utilisateursid = this.utilisateurs[indexuserid2].id_utilisateur;
      }
      else {
        indexuserid2 ++;
      }

    }


    //console.log("Voici la valeur de index4 après la boucle for :", this.index4);
    this.get_listcharge.DeleteChargeUser(this.utilisateursid, this.delete_monmois, this.delete_monannee, this.delete_macharge).subscribe((data2211: string[]) => {
          console.log("voiici ce qui va dans la bse : ", data2211);
    });
    //console.log("Voici la ligne avant la boucle :", this.lignechiffrageprojets[this.index3].mois_chiffrage);
  this.etatProjet.setDeleteFormulaire(id, this.iddemande).subscribe((data: string[]) => {
        this.lignechiffrageprojets = data;
        console.log(this.lignechiffrageprojets[Number(id)]);
        console.log(this.lignechiffrageprojets);

        // CALCUL TOTAL cout mis a jour en direct
        this.calcul = 0;
        for (this.index = 0; this.index < this.lignechiffrageprojets.length; this.index++) {
          this.calcul = this.calcul + this.lignechiffrageprojets[this.index].valeur_total;
        }
        this.calcul = this.calcul + this.sousetapeForm.get('total').value;

      });

        //this.calcul2 = 0;
        //this.calcul2 = this.calcul2 + this.lignechiffrageprojets[this.id2];
        //console.log("Voici le chiffrage après la boucle: ", this.lignechiffrageprojets[this.id2]);
      this.get_listcharge.getlistcharge().subscribe((data23: string[]) => {
        this.chargecomplets2 = data23;
        console.log("Voici le tableau après la suppresion ", this.chargecomplets2);
      });
      console.log("Vous avez effectué une suppression");

      if (this.reloadornot == 1) {
        this.refresh();

      }




  }

  ModificationChriffrage() {


  }

  refresh(): void {
    window.location.reload();
}

}
