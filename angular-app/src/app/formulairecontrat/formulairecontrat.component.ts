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
  selector: 'app-formulairecontrat',
  templateUrl: './formulairecontrat.component.html',
  styleUrls: ['./formulairecontrat.component.css']
})





export class FormulairecontratComponent implements OnInit {
  bouton11 : any;
  bouton12 : any;
  lignechiffrageprojets2 : any[];
  acteurclean : string;
  idarrayacteur : any[];
  arrayacteurtemp : any[];
  chargemoisacteur : any;
  testnombre1 : any;
  arrayacteur: any[];
  arraychargeacteur : any[];
  arraychargefinal : any[];
  testnombre2 : any;
  testnombre3 : any;
  soususerForm: FormGroup;
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
  index7 : any;
  index8 : any;
  index9 : any;
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
  dayOfWeek : any;
  count : any;
  datedebutauto1 : any;
  datedebutforce1 : any;
  datefin1 : any;
  moisdebut : any;
  moisfin : any;
  moiscount : any;
  moiscountjanvier : any;
  moiscountfevrier : any;
  year : any;
  month : any;
  resultfin : any;
  dropdt : any;
  pickdt : any;
  firstDay : any;
  lastDay : any;
  lastDateMonth : any;
  firstDate : any;
  lastDate : any;
  firstMonth : any;
  lastMonth : any;
  tableaumoisjours : any[];
  tableaumoisjours2 : any [];
  ajoutetableau : any;
  indexmois : any;
  tableaumoispercent : any;
  count2 : any;
  percentmois : any;
  reducer : any;
  totalcount : any;
  tableaupercentchargemois : any[];
  percentmoischarge : any;
  totaljourscharge : any;
  premiermois : any;
  derniermois : any;
  arraymois : any[];
  arraymoistemp : any[];
  arrayannee : any[];
  tableaupercentchargemoisacteur : any[];
  reducer2 : any;
  totalcount2 : any;
  indexcount : any;
  indexcounter : any;
  indexcounter2 : any;
  indexcounter3 : any;
  indexcounter4 : any;
  FinalArray : any[];
  indexcountannee : any;
  indexcountcharge : any;
  indexcountcharge2 : any;
  indexcountannee2 : any;
  finalindex : any;
  finalindex2 : any;
  finalindex3 : any;
  finalindex4 : any;
  ligneIdContrat : any;
  indexarrayid : any;
  indexsuprr : any;
  date1 : any;
  date2 :any;
  date3 : any;
  lignechiffrageprojetsmodif : any[];
  button1 : any;
  button2 : any;
  button3 : any;
  button4 : any;
  percentacteurarray : any[];
  lignechiffrageprojetsdelete : any [];
  calcul1chargetotale : any;
  // onKey(value: string) {
  //   this.values = value ;
  // }

  // onKey2(value: string) {
  //   this.values2 = value ;
  // }

  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private fbuser : FormBuilder,
      private router: Router,
      private etatProjet: ResearchBDDService,
      private fctbdd: ResearchBDDService,
      private get_listcharge : ResearchBDDService,
      private set_listcharge : ResearchBDDService,
      private setset_listcharge : ResearchBDDService,
      private set_contratcharge : ResearchBDDService,

  ) {}

  ngOnInit() {




      this.arrayacteur = [];
      this.arraychargeacteur = [];
      this.idarrayacteur = [];
      this.arrayacteurtemp = [];



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



      this.soususerForm = this.fbuser.group({
        acteur2: ['',
            [
              Validators.required,
            ]
        ],
        chargeacteur2: ['',
            [
              Validators.required,
            ]
        ],

      });




      this.sousetapeForm = this.fb.group({

          // Initialisation des champs
          phase: ['',
              [
                  Validators.required,
                  Validators.maxLength(250),

              ]
          ],
          tache: ['',
              [
                  Validators.required,
                  Validators.maxLength(250),

              ]
          ],
          entitee: ['',
              [
                  Validators.required,
                  Validators.maxLength(250),

              ]
          ],
          datedebutauto: ['',
              [
                Validators.required,
                Validators.maxLength(250),
              ]
          ],
          datedebutforce: ['',
              [
                Validators.required,
                Validators.maxLength(250),
              ]
          ],
          datefin: ['',
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
      });



      // Permet de mettre à jour le tableau des sousetape en allant piocher dans la BDD
      this.id = this.route.snapshot.paramMap.get('id');
      this.etatProjet.getFormulaireContrat(this.id).subscribe((data: string[]) => {
          this.lignechiffrageprojets = data;
          // tslint:disable-next-line: max-line-length



          //if (this.lignechiffrageprojets && this.lignechiffrageprojets[0]
          //  && this.lignechiffrageprojets[0].fk_etat_id !== (9 || undefined)) {
        //    this.router.navigate(['/resumeprojetadmin/', this.id]);
        //  }
          console.log(this.lignechiffrageprojets);
      });

      //this.percentacteurarray = [];





  }


  userutil(){

    console.log("Voici la charge associée", this.soususerForm.value.chargeacteur2);
    console.log("Voici l'acteur associé", this.soususerForm.value.acteur2);
    //this.percentacteurarray.push(this.soususerForm.value.chargeacteur2);
    this.acteurclean = this.soususerForm.value.acteur2
    this.acteurclean = this.acteurclean.substring(this.acteurclean.indexOf(":") + 1);

    console.log("Voici l'acteur popé", this.acteurclean);
    this.arrayacteur.push(this.acteurclean);
    this.arrayacteurtemp.push(this.acteurclean);
    console.log("tavleau arrau temp", this.arrayacteurtemp);
    this.arraychargeacteur.push(this.soususerForm.value.chargeacteur2);

    //On viens recuperer l'ID utilisateur et le login_utilisateur par rapport  l'array utilisateur (qui contient toutes les infos utilisateurs)
    for (this.index9 = 0; this.index9 < this.arrayacteurtemp.length; this.index9++) {
      for (this.index8 = 0; this.index8 < this.utilisateurs.length; this.index8++) {
        if (this.arrayacteurtemp[this.index9] == this.utilisateurs[this.index8].login_utilisateur) {
          this.idarrayacteur.push(this.utilisateurs[this.index8].id_utilisateur);
          this.set_listcharge.setChargeTotal(this.utilisateurs[this.index8].id_utilisateur, 0, "janvier", "2021").subscribe((data1002: string[]) => {
            console.log("ON AJOUTE LA LIGNE : ", data1002);

          });
          this.set_listcharge.setChargeTotal(this.utilisateurs[this.index8].id_utilisateur, 0, "janvier", "2022").subscribe((data10023: string[]) => {
            console.log("ON AJOUTE LA LIGNE : ", data10023);

          });
          console.log("La liste des ID acteurs", this.idarrayacteur);
        }

      }

    }
    this.arrayacteurtemp = [];




  }





  formulaire() {

    //this.submitted = true;




    //On renitialize le tableau qui contient le nombre de jours par mois (en excluant les weeks-ends)
    this.tableaumoispercent = [];
    this.tableaumoisjours = [];
    this.tableaumoisjours2 = [];
    this.tableaupercentchargemois = [];
    this.arraychargefinal = [];
    this.arraymois = [];
    this.arrayannee = [];
    this.tableaupercentchargemoisacteur = [];
    this.indexcount = [];
    this.FinalArray = [];
    this.indexcountcharge = 0;
    this.indexcountcharge2 = 0;
    this.finalindex2 = 0;
    this.finalindex3 = 0;
    this.finalindex4 = 0;





    // Permet de nous retourner le nombre de jours au total
    console.log("On rentre dans formulaire");
    this.count = 0;
    this.count2 = 0;
    this.dropdt = new Date(this.sousetapeForm.value.datedebutauto);
    this.pickdt = new Date(this.sousetapeForm.value.datefin);
    this.datedebutauto1 = new Date(this.sousetapeForm.value.datedebutauto);
    this.datedebutforce1 = new Date(this.sousetapeForm.value.datedebutforce);
    this.datefin1 = new Date(this.sousetapeForm.value.datefin);
    console.log(this.sousetapeForm.value.datedebutforce);
    console.log(this.sousetapeForm.value.datedebutauto);
    console.log(this.sousetapeForm.value.datefin);


//ON DETERMINE SI IL Y A LA PRESENCE D'UNE DATE FORCEE, SI OUI ON PREND CELLE CI
  if (this.sousetapeForm.value.datedebutforce == '' || this.sousetapeForm.value.datedebutforce == '0000-00-00') {
    this.dropdt = new Date(this.sousetapeForm.value.datedebutauto);
    this.pickdt = new Date(this.sousetapeForm.value.datefin);

    for (this.year = this.dropdt.getFullYear(); this.year <= this.pickdt.getFullYear(); this.year++) {
      this.firstMonth = (this.year == this.dropdt.getFullYear()) ? this.dropdt.getMonth() : 0;
      this.lastMonth = (this.year == this.pickdt.getFullYear()) ? this.pickdt.getMonth() : 11;
      for (this.month = this.firstMonth; this.month <= this.lastMonth; this.month++) {
        this.firstDay = (this.year === this.dropdt.getFullYear() && this.month === this.firstMonth) ? this.dropdt.getDate() : 1;
        this.lastDay = (this.year === this.pickdt.getFullYear() && this.month === this.lastMonth) ? this.pickdt.getDate() : 0;
        this.lastDateMonth = (this.lastDay === 0) ? (this.month + 1) : this.month
        this.firstDate = new Date(this.year, this.month, this.firstDay);
        this.lastDate = new Date(this.year, this.lastDateMonth, this.lastDay);
        while (this.firstDate.getTime() <= this.lastDate.getTime()) {
            this.dayOfWeek = this.firstDate.getDay();
            if(!((this.dayOfWeek == 6) || (this.dayOfWeek == 0)))
               this.count++;
            this.firstDate.setDate(this.firstDate.getDate() + 1);
        }

        this.arraymois.push(this.month +1);
        this.arrayannee.push(this.year);
        this.tableaumoisjours.push((this.month +1));
        this.tableaumoisjours2.push(this.count);
        this.count = 0;
    }
}

  }
  else {
    this.dropdt = new Date(this.sousetapeForm.value.datedebutforce);
    this.pickdt = new Date(this.sousetapeForm.value.datefin);
    for (this.year = this.dropdt.getFullYear(); this.year <= this.pickdt.getFullYear(); this.year++) {
      this.firstMonth = (this.year == this.dropdt.getFullYear()) ? this.dropdt.getMonth() : 0;
      this.lastMonth = (this.year == this.pickdt.getFullYear()) ? this.pickdt.getMonth() : 11;
      for (this.month = this.firstMonth; this.month <= this.lastMonth; this.month++) {
        this.firstDay = (this.year === this.dropdt.getFullYear() && this.month === this.firstMonth) ? this.dropdt.getDate() : 1;
        this.lastDay = (this.year === this.pickdt.getFullYear() && this.month === this.lastMonth) ? this.pickdt.getDate() : 0;
        this.lastDateMonth = (this.lastDay === 0) ? (this.month + 1) : this.month
        this.firstDate = new Date(this.year, this.month, this.firstDay);
        this.lastDate = new Date(this.year, this.lastDateMonth, this.lastDay);
        while (this.firstDate.getTime() <= this.lastDate.getTime()) {
            this.dayOfWeek = this.firstDate.getDay();
            if(!((this.dayOfWeek == 6) || (this.dayOfWeek == 0)))
               this.count++;
            this.firstDate.setDate(this.firstDate.getDate() + 1);
        }
        this.arraymois.push(this.month +1);
        this.arrayannee.push(this.year);
        this.tableaumoisjours.push((this.month +1));
        this.tableaumoisjours2.push(this.count);
        this.count = 0;
    }
}

//console.log("Voici le tableau des mois", this.arraymois);
console.log("Voici le tableau de MOISMOIS", this.tableaumoisjours2);


  }
//AFFECTATION D'UN POURCENTAGE A CHAQUE MOIS
this.reducer = (accumulator, currentValue) => accumulator + currentValue;
try {
  this.totalcount = this.tableaumoisjours2.reduce(this.reducer);
} catch(e){
  console.log(e.message);
  alert("Veuillez selectionner une date de début et de fin");
}
console.log("Voici le tableau :", this.tableaumoisjours2);
for (this.indexmois = 0; this.indexmois < this.tableaumoisjours2.length; this.indexmois++) {
  //console.log(this.tableaumoisjours2[this.indexmois]);
  //console.log(this.count2);
  this.percentmois = Math.round((this.tableaumoisjours2[this.indexmois]*100) / this.totalcount);
  //console.log(this.percentmois);
  this.tableaumoispercent.push(this.percentmois);

}
console.log(this.tableaumoispercent);
//AFFECTION DES JOURS DE CHARGES EN FONCTION DU TEMPS DISPONIBLE SUR LE MOIS
this.totaljourscharge = this.sousetapeForm.value.charge;
for (this.indexmois = 0; this.indexmois < this.tableaumoispercent.length; this.indexmois++) {
  this.percentmoischarge = Math.round((this.tableaumoispercent[this.indexmois]/100) * this.totaljourscharge);
  this.tableaupercentchargemois.push(this.percentmoischarge);

}
console.log(this.tableaupercentchargemois);

for (this.index7 = 0; this.index7 < this.arrayacteur.length; this.index7++) {
  for (this.index8 = 0; this.index8 < this.tableaupercentchargemois.length; this.index8++) {
    this.chargemoisacteur = Math.round((this.arraychargeacteur[this.index7]/100)*this.tableaupercentchargemois[this.index8]);
    console.log("Voici la charge par mois par acteur", this.chargemoisacteur)
    this.tableaupercentchargemoisacteur.push(this.chargemoisacteur);

  }

}
console.log("Voici la charge par mois par acteur 2", this.chargemoisacteur);

this.reducer2 = (accumulator, currentValue) => accumulator + currentValue;
try {
  this.totalcount2 = this.tableaupercentchargemoisacteur.reduce(this.reducer2);
} catch (error) {
  alert("Veuillez affecter au moins un utilisateur à cette tâche");
  return;
}
console.log("Voici le total des charges", this.totalcount2);
console.log("Voici le tableau par mois par acteur HJK", this.tableaupercentchargemoisacteur);
this.index2 =0;
  while (this.totalcount2 != this.sousetapeForm.value.charge) {
    if (this.totalcount2 < this.sousetapeForm.value.charge) {
      console.log("Cest inferieur");
      this.tableaupercentchargemoisacteur[this.index2]++;
      this.index2++;
      this.index2++;
      this.totalcount2++;
      console.log("Voici le tableau par mois par acteur INF", this.tableaupercentchargemoisacteur);

    }
    else if (this.totalcount2 > this.sousetapeForm.value.charge){
      console.log("Cest superieur");
      this.tableaupercentchargemoisacteur[this.index2]--;
      this.index2++;
      this.index2++;
      console.log(this.index2);
      this.totalcount2--;
      console.log("Voici le tableau par mois par acteur SUP", this.tableaupercentchargemoisacteur);
    }
    else {
      console.log("C'est bon");
      console.log("Voici le tableau par mois par acteur EGAL", this.tableaupercentchargemoisacteur);
    }
  }
/*if (this.totalcount2 < this.sousetapeForm.value.charge) {
  while (this.totalcount2 < this.sousetapeForm.value.charge) {
    this.index2 = 0;
    this.tableaupercentchargemoisacteur[this.index2] = this.tableaupercentchargemoisacteur[this.index2] + 1;
    this.index2++;
    this.totalcount2++;
  }
}
else if (this.totalcount2 > this.sousetapeForm.value.charge) {
  this.index2 = 0;
  while (this.totalcount2 > this.sousetapeForm.value.charge) {
    //this.index2 = 0
    if (this.tableaupercentchargemoisacteur[this.index2] = 0) {
      this.index2++;
    }
    else {
      console.log("Une modif");
      console.log("Voici le tableau par mois par acteur HJK avant modif", this.tableaupercentchargemoisacteur[this.index2]);
      this.tableaupercentchargemoisacteur[this.index2]--;
      console.log("Voici le tableau par mois par acteur HJK après modif", this.tableaupercentchargemoisacteur);
      this.index2++;
      this.totalcount2 = this.totalcount2 -1;
    }
    //this.tableaupercentchargemoisacteur[this.index2]=this.tableaupercentchargemoisacteur[this.index2] - 1;
    //this.index2++;
    //this.totalcount2 = this.totalcount2 -1;
  }

}*/

//ON TRANSFORME L'ARRAY MOIS DE CHIFFRE EN LETTRE (1 == janvier)
//this.ajouterlignecontrat ();


console.log("LE TABLEAU FINAL", this.tableaupercentchargemoisacteur);

for (this.indexcounter = 0; this.indexcounter < this.idarrayacteur.length; this.indexcounter++) {
  this.indexcountannee = 0;
  for (this.indexcounter2 = 0; this.indexcounter2 < this.arraymois.length; this.indexcounter2++) {
    this.FinalArray.push(this.idarrayacteur[this.indexcounter]);
    this.FinalArray.push(this.arraymois[this.indexcounter2]);
    this.FinalArray.push(this.arrayannee[this.indexcountannee]);
    this.FinalArray.push(this.tableaupercentchargemoisacteur[this.indexcountcharge]);
    console.log("LE PUTAIN DARRAY", this.idarrayacteur);
    this.set_listcharge.setChargeTotal(this.idarrayacteur[this.indexcounter], this.tableaupercentchargemoisacteur[this.indexcountcharge], this.arraymois[this.indexcounter2], this.arrayannee[this.indexcountannee]).subscribe((data1000: string[]) => {
      console.log("ON AJOUTE LA LIGNE : ", data1000);

    });
    //this.set_contratcharge.setLigneUtilisateursContrats(this.ligneIdContrat,this.idarrayacteur[this.indexcounter],this.tableaupercentchargemoisacteur[this.indexcountcharge],this.arraymois[this.indexcounter2],this.arrayannee[this.indexcountannee]).subscribe((data1500: string[]) => {
    //   console.log("voiici ce qui va dans la bse : ", data1500);
       // Redirection
       //this.router.navigate(['/utilisateurs']);
    //});

    this.indexcountcharge++;
    this.indexcountannee++;

  }

}




/*for (this.finalindex = 0; this.finalindex < this.FinalArray.length; this.finalindex = this.finalindex +4) {
  console.log("VOICI LE TABLEAU FINAL");
  console.log(this.FinalArray);
  console.log(this.finalindex);
  this.finalindex2 = this.finalindex +1;
  this.finalindex3 = this.finalindex +2;
  this.finalindex4 = this.finalindex +3;


}*/


//this.arraychargefinal = [];
//this.arrayacteur = [];
this.arraychargeacteur = [];
//this.idarrayacteur = [];
this.ajouterlignecontrat ();
this.percentacteurarray = [];



setTimeout(() => {
  this.refresh();


}, 1500);







  }




  ajouterlignecontrat () {
    this.setset_listcharge.setLigneContrats(this.id, this.sousetapeForm).subscribe((data2000: string[]) => {
      // Déclenche le clic pour les fênetres pop up
      //console.log("Voici le data", data2000);
      //document.getElementById('openModal').click();
      // data2.forEach(element => this.lignechiffrageprojets.push(element)); // remi
      this.ligneIdContrat = data2000;
      console.log("Voici le ligneIdContrat", this.ligneIdContrat);
      for (this.indexcounter3 = 0; this.indexcounter3 < this.idarrayacteur.length; this.indexcounter3++) {
        this.indexcountannee2 = 0;
        for (this.indexcounter4 = 0; this.indexcounter4 < this.arraymois.length; this.indexcounter4++) {
          this.FinalArray.push(this.idarrayacteur[this.indexcounter3]);
          this.FinalArray.push(this.arraymois[this.indexcounter4]);
          this.FinalArray.push(this.arrayannee[this.indexcountannee2]);
          this.FinalArray.push(this.tableaupercentchargemoisacteur[this.indexcountcharge2]);
          console.log("LE PUTAIN DARRAY", this.idarrayacteur);
          this.set_contratcharge.setLigneUtilisateursContrats(this.ligneIdContrat,this.idarrayacteur[this.indexcounter3],this.tableaupercentchargemoisacteur[this.indexcountcharge2],this.arraymois[this.indexcounter4],this.arrayannee[this.indexcountannee2]).subscribe((data1503: string[]) => {
          //   console.log("voiici ce qui va dans la bse : ", data1500);
             // Redirection
             console.log("On ajoute une ligne");
             //this.router.navigate(['/utilisateurs']);
          });

          this.indexcountcharge2++;
          this.indexcountannee2++;

        }

      }
    });

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
    if (etat === 9 || etat === null) {
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
      console.log(index);
      //On vient cherche la liste des utilisateurs qui sont associés à la ligne
      this.set_contratcharge.getLigneUserContrat(this.id3).subscribe((data2556: string[]) => {
        this.lignechiffrageprojetsmodif = data2556;
        console.log("Voici votre utilisateur", this.lignechiffrageprojetsmodif);

      });


      //On verifie si on doit faire une soustraction ou une adition
      //if (this.lignechiffrageprojets[index].valeur_charge >= this.sousetapeForm.get('charge').value) {
      //  this.calcul5 = Number(this.sousetapeForm.get('charge').value) + Number(this.chargecomplets2[this.index5].janvier_charge);
      //}
      //else {
      //  this.calcul5 = Number(this.chargecomplets2[this.index5].janvier_charge) - Number(this.sousetapeForm.get('charge').value);
      //}


      this.sousetapeForm.get('phase').setValue(this.lignechiffrageprojets[index].nom_phase);
      this.sousetapeForm.get('tache').setValue(this.lignechiffrageprojets[index].nom_tache);
      this.sousetapeForm.get('entitee').setValue(this.lignechiffrageprojets[index].nom_entite);
      this.sousetapeForm.get('datedebutauto').setValue(this.lignechiffrageprojets[index].date_debut.slice(0, 10));
      this.sousetapeForm.get('datedebutforce').setValue(this.lignechiffrageprojets[index].date_demarrage.slice(0,10));

      this.sousetapeForm.get('datefin').setValue(this.lignechiffrageprojets[index].date_fin.slice(0, 10));
      this.sousetapeForm.get('charge').setValue(this.lignechiffrageprojets[index].charge_total);
      //this.sousetapeForm.get('tjm').setValue(this.lignechiffrageprojets[index].valeur_tjm);
      //this.sousetapeForm.get('total').setValue(this.lignechiffrageprojets[index].valeur_total);
      //this.sousetapeForm.get('remarques').setValue(this.lignechiffrageprojets[index].remarque);*/


      // CALCUL TOTAL // remi
      // this.calcul = 0;
      // for (this.index = 0; this.index < this.lignechiffrageprojets.length; this.index++) {
      //   this.calcul = this.calcul + this.lignechiffrageprojets[this.index].valeur_total;
      // }
      // this.calcul = this.calcul + this.sousetapeForm.get('total').value;

      this.button1 = document.getElementById("boutonsauvegarder");
      this.button1.disabled = true;

    }

    annulermodif() {
      this.button2 = document.getElementById("boutonsauvegarder");
      this.button2.disabled = false;

      this.sousetapeForm.get('phase').setValue('');
      this.sousetapeForm.get('tache').setValue('');
      this.sousetapeForm.get('entitee').setValue('');
      this.sousetapeForm.get('datedebutauto').setValue('');
      this.sousetapeForm.get('datedebutforce').setValue('');

      this.sousetapeForm.get('datefin').setValue('');
      this.sousetapeForm.get('charge').setValue('');
      this.arrayacteur = [];
      this.arraychargeacteur = [];

    }

    formulairemodif(){
      this.formulaire();
      console.log(this.id3);
      this.set_contratcharge.getLigneUserContrat(this.id3).subscribe((data2559: string[]) => {
        this.lignechiffrageprojets2 = data2559;
        console.log("Voici votre utilisateur", this.lignechiffrageprojets2);
        for (let indexsuprr = 0; indexsuprr < this.lignechiffrageprojets2.length; indexsuprr++) {
          this.etatProjet.DeleteChargeUser(this.lignechiffrageprojets2[indexsuprr].fk_utilisateur_id, this.lignechiffrageprojets2[indexsuprr].mois_charge, this.lignechiffrageprojets2[indexsuprr].annee_charge, this.lignechiffrageprojets2[indexsuprr].valeur_charge).subscribe((data260: string[]) => {
            console.log(data260);
          });

        }
      });
        this.set_contratcharge.DeleteLigneContrats(this.id3).subscribe((data2509: string[]) => {
             console.log("Ce qui retourne la fonction supprimer une ligne", data2509)
              console.log("Voici le ID", this.id3);

           });

        this.button2 = document.getElementById("boutonsauvegarder");
        this.button2.disabled = false;

        this.button3 = document.getElementById("modifierligne");
        this.button3.disabled = true;

        this.button4 = document.getElementById("modifiercancel");
        this.button4.disabled = true;

    }



  sauv() {
    this.deleteEtape(this.id2);
  }

  modifierTotalChriffrage (){
    this.AjouterLigne();
    console.log(this.id3);

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
    //this.submitted = true;

    //console.log("bonsoir je suis : ", this.sousetapeForm);
    //if (this.sousetapeForm.invalid) {
  //        return;
    //}



      // Ajout d'une ligne sous etape dans la BDD
    this.id = this.route.snapshot.paramMap.get('id');
    this.etatProjet.setFormulaireAdmin(this.id, this.sousetapeForm).subscribe((data2: string[]) => {
      // Déclenche le clic pour les fênetres pop up
      console.log(data2);
      document.getElementById('openModal').click();
      // data2.forEach(element => this.lignechiffrageprojets.push(element)); // remi
    });

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

    this.get_listcharge.setChargeTotal(this.sousetapeForm.value.acteur, this.calcul2, this.sousetapeForm.value.mois, this.sousetapeForm.value.annee).subscribe((data220: string[]) => {
      console.log("voiici ce qui va dans la bse : ", data220);
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
    for (this.index5 = 0; this.index5 < this.chargecomplets2.length; this.index5++) {
      //console.log("Le trois")
      if (this.chargecomplets2[this.index5].emploi_login_utilisateur == this.delete_nom_acteur && (this.chargecomplets2[this.index5].annee_charge == this.delete_monannee) && (this.delete_monmois = "janvier" )) {
        this.calcul4 = Number(this.chargecomplets2[this.index5].janvier_charge) - Number(this.delete_macharge);
        console.log("Voici calcul4", this.calcul4);
        this.Autrecalcul = Number(this.chargecomplets2[this.index5].janvier_charge);
        console.log("Voici le total charge :", this.Autrecalcul);
        console.log("Ce que l'on enleve a la charge", this.delete_macharge);
        //this.reloadornot = 1 ;
        //console.log("On n'est bien rentré dans la boucle if de la seconde boucle for: ", this.calcul4);
      }
      else if (this.chargecomplets2[this.index5].emploi_login_utilisateur == this.delete_nom_acteur && (this.chargecomplets2[this.index5].annee_charge == this.delete_monannee) && (this.delete_monmois = "fevrier" )) {
        this.calcul4 = Number(this.chargecomplets2[this.index5].fevrier_charge) - Number(this.delete_macharge);
        //console.log("On n'est bien rentré dans la boucle if de la seconde boucle for: ", this.calcul4);
      }
      else if (this.chargecomplets2[this.index5].emploi_login_utilisateur == this.delete_nom_acteur && (this.chargecomplets2[this.index5].annee_charge == this.delete_monannee) && (this.delete_monmois = "mars" )) {
        this.calcul4 = Number(this.chargecomplets2[this.index5].mars_charge) - Number(this.delete_macharge);
        //console.log("On n'est bien rentré dans la boucle if de la seconde boucle for: ", this.calcul4);
      }
      else if (this.chargecomplets2[this.index5].emploi_login_utilisateur == this.delete_nom_acteur && (this.chargecomplets2[this.index5].annee_charge == this.delete_monannee) && (this.delete_monmois = "avril" )) {
        this.calcul4 = Number(this.chargecomplets2[this.index5].avril_charge) - Number(this.delete_macharge);
        //console.log("On n'est bien rentré dans la boucle if de la seconde boucle for: ", this.calcul4);
      }
      else if (this.chargecomplets2[this.index5].emploi_login_utilisateur == this.delete_nom_acteur && (this.chargecomplets2[this.index5].annee_charge == this.delete_monannee) && (this.delete_monmois = "mai" )) {
        this.calcul4 = Number(this.chargecomplets2[this.index5].mai_charge) - Number(this.delete_macharge);
        //console.log("On n'est bien rentré dans la boucle if de la seconde boucle for: ", this.calcul4);
      }
      else if (this.chargecomplets2[this.index5].emploi_login_utilisateur == this.delete_nom_acteur && (this.chargecomplets2[this.index5].annee_charge == this.delete_monannee) && (this.delete_monmois = "juin" )) {
        this.calcul4 = Number(this.chargecomplets2[this.index5].juin_charge) - Number(this.delete_macharge);
        //console.log("On n'est bien rentré dans la boucle if de la seconde boucle for: ", this.calcul4);
      }
    }
    //console.log("Voici la valeur de index4 après la boucle for :", this.index4);
    this.get_listcharge.setChargeTotal(this.delete_nom_acteur, this.calcul4, this.delete_monmois, this.delete_monannee).subscribe((data221: string[]) => {
          //console.log("voiici ce qui va dans la bse : ", data221);
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

  SupprimerLigne2 (id){
  //this.etatProjet.getFormulaireContrat(this.id).subscribe((data90: string[]) => {
      //this.lignechiffrageprojets2 = data90;
    //  console.log("Voici le tableau de toutes les lignes", this.lignechiffrageprojets2);
    //  this.set_contratcharge.DeleteChargeUser(this.lignechiffrageprojets2).subscribe((data252: string[]) => {

    //  });
  //});
  //CODE QUI FONCTIONNE
  this.set_contratcharge.getLigneUserContrat(this.id2).subscribe((data255: string[]) => {
    this.lignechiffrageprojets2 = data255;
    console.log("Voici votre utilisateur", this.lignechiffrageprojets2);
    for (let indexsuprr = 0; indexsuprr < this.lignechiffrageprojets2.length; indexsuprr++) {
      this.etatProjet.DeleteChargeUser(this.lignechiffrageprojets2[indexsuprr].fk_utilisateur_id, this.lignechiffrageprojets2[indexsuprr].mois_charge, this.lignechiffrageprojets2[indexsuprr].annee_charge, this.lignechiffrageprojets2[indexsuprr].valeur_charge).subscribe((data260: string[]) => {
        console.log(data260);
      });

    }
  });
    this.set_contratcharge.DeleteLigneContrats(id).subscribe((data250: string[]) => {
         console.log("Ce qui retourne la fonction supprimer une ligne", data250)
          console.log("Voici le ID", this.id2);

       });
  }

  archivage(){
    this.etatProjet.setEtatContrat(this.id, 3).subscribe((data696: string[]) => {

    });

  }

  supressioncontrat(){


    this.id = this.route.snapshot.paramMap.get('id');
    this.etatProjet.getFormulaireContrat(this.id).subscribe((data666: string[]) => {
        this.lignechiffrageprojetsdelete = data666;
        for (let indexdeletecontrat = 0; indexdeletecontrat < this.lignechiffrageprojetsdelete.length; indexdeletecontrat++) {
          this.set_contratcharge.getLigneUserContrat(this.lignechiffrageprojetsdelete[indexdeletecontrat].id_ligne).subscribe((data255666: string[]) => {
            this.lignechiffrageprojets2 = data255666;
            console.log("Voici votre utilisateur", this.lignechiffrageprojets2);
            for (let indexsuprr = 0; indexsuprr < this.lignechiffrageprojets2.length; indexsuprr++) {
              this.etatProjet.DeleteChargeUser(this.lignechiffrageprojets2[indexsuprr].fk_utilisateur_id, this.lignechiffrageprojets2[indexsuprr].mois_charge, this.lignechiffrageprojets2[indexsuprr].annee_charge, this.lignechiffrageprojets2[indexsuprr].valeur_charge).subscribe((data260: string[]) => {
                console.log(data260);
              });

            }
          });

        }
    });

    setTimeout(() => {
      this.set_contratcharge.DeleteContrats(this.id).subscribe((data999: string[]) => {
           console.log("Ce qui retourne la fonction supprimer une ligne", data999)
            console.log("Voici le ID", this.id2);

      });


    }, 2000);

    setTimeout(() => {

      this.router.navigate(['/resumeprojetadmin/', this.id]);

    }, 4000);



  }

  vidertable(){
    this.arrayacteur = [];
    this.arrayacteurtemp = [];
    this.arraychargeacteur = [];
    this.idarrayacteur = [];
  }




  refresh(): void {
    window.location.reload();
}

}
