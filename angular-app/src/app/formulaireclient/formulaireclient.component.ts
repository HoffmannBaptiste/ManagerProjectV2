import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ResearchBDDService } from '../services/research-bdd.service';

@Component({
  selector: 'app-formulaireclient',
  templateUrl: './formulaireclient.component.html',
  styleUrls: ['./formulaireclient.component.css']
})

export class FormulaireclientComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private DemandeClientService: ResearchBDDService,
    private UserInfo: AuthenticationService
  ) { }

  title = 'ProjetM1-Capgemini';
  cheminImage: any = '../assets/image/capgemini.png';
  formulaireForm: FormGroup;
  perimetreForm: FormGroup;
  datetest: Date = new Date();
  index = 1;
  userinfo = this.UserInfo.currentUserValue;
  submitted = false;
  error = '';
  regexNom: RegExp = /^[^0-9\.\,\"\'\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+$/;

  ngOnInit() {

    console.log(this.userinfo);

    this.formulaireForm = this.fb.group({  // Crée une instance de FormGroup
      nomprojet: ['',
        [
          Validators.required,
          Validators.maxLength(50)
          // Validators.pattern('^[a-zA-Z\s]*$')
        ]
      ],
      demandeur: ['',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.regexNom)
          // Validators.pattern('^[a-zA-Z\s]*$')
        ]
      ],
      description: ['', Validators.required],
      datedemande: Date,
      codenop: [''],
      fonction: [''],
      referenceclient: [''],
      // usernameclient: [],
      referenceinterne : [''],
      idutilisateur: []
    });

    this.perimetreForm = this.fb.group({

      application: [],
      btordo: [],
      bdd: [],
      unix: [],
      windows: [],
      reseau: [],
      sap: [],
      stockage: [],
      autre: [],

    });

  }

  get f() { return this.formulaireForm.controls; }


  formulaire() {

    this.formulaireForm.get('datedemande').setValue(this.datePipe.transform(this.datetest, 'yyyy-MM-dd'));
    // Remplie automatiquement la date lors de l'envoie du formulaire au format souhaité
    console.log('Données du formulaire...', this.formulaireForm.value);
    this.formulaireForm.get('idutilisateur').setValue(this.userinfo.id_utilisateur);

    this.submitted = true;


    if (this.formulaireForm.invalid) {
        return;
    }

    if (this.formulaireForm.get('codenop').value === '' ) {
      this.formulaireForm.get('codenop').setValue('Non renseigné');
    }

    if (this.formulaireForm.get('fonction').value === '' ) {
      this.formulaireForm.get('fonction').setValue('Non renseignée');
    }

    if (this.formulaireForm.get('referenceclient').value === '' ) {
      this.formulaireForm.get('referenceclient').setValue('Non renseignée');
    }

    if (this.formulaireForm.get('referenceinterne').value === '' ) {
      this.formulaireForm.get('referenceinterne').setValue('Non renseignée');
    }

        // A la place de retourner True ou False on retourne le chiffre
    // de 1 à 9 dans l'ordi pour chaque valeur de perimetreForm
    if (this.perimetreForm.get('application').value === true) {
      this.perimetreForm.get('application').setValue(this.index); this.index++;
    } else {
      this.perimetreForm.get('application').setValue(null);
      this.index++;
    }
    if (this.perimetreForm.get('btordo').value === true) {
      this.perimetreForm.get('btordo').setValue(this.index); this.index++;
    } else {
      this.perimetreForm.get('btordo').setValue(null);
      this.index++;
    }
    if (this.perimetreForm.get('bdd').value === true) {
      this.perimetreForm.get('bdd').setValue(this.index); this.index++;
    } else {
      this.perimetreForm.get('bdd').setValue(null);
      this.index++;
    }
    if (this.perimetreForm.get('unix').value === true) {
      this.perimetreForm.get('unix').setValue(this.index); this.index++;
    } else {
      this.perimetreForm.get('unix').setValue(null);
      this.index++;
    }
    if (this.perimetreForm.get('windows').value === true) {
      this.perimetreForm.get('windows').setValue(this.index); this.index++;
    } else {
      this.perimetreForm.get('windows').setValue(null);
      this.index++;
    }
    if (this.perimetreForm.get('reseau').value === true) {
      this.perimetreForm.get('reseau').setValue(this.index); this.index++;
    } else {
      this.perimetreForm.get('reseau').setValue(null);
      this.index++;
    }
    if (this.perimetreForm.get('sap').value === true) {
      this.perimetreForm.get('sap').setValue(this.index); this.index++;
    } else {
      this.perimetreForm.get('sap').setValue(null);
      this.index++;
    }
    if (this.perimetreForm.get('stockage').value === true) {
      this.perimetreForm.get('stockage').setValue(this.index); this.index++;
    } else {
      this.perimetreForm.get('stockage').setValue(null);
      this.index++;
    }
    if (this.perimetreForm.get('autre').value === true) {
      this.perimetreForm.get('autre').setValue(this.index); this.index++;
    } else {
      this.perimetreForm.get('autre').setValue(null);
      this.index++;
    }

    this.DemandeClientService.setFormulaireClient(this.formulaireForm, this.perimetreForm)
    .subscribe(
      data => {
        console.log('repereformulaireclient');
        console.log(data);
        if (this.userinfo.droit_utilisateur === 2) {
          this.router.navigate(['/resumeprojetadmin/' + data]);
        } else {
          this.router.navigate(['/resumeprojet/' + this.userinfo.id_utilisateur + '/' + data]);
        }
       },
      error => {
          this.error = error;
      });
    console.log('Données du formulaire...', this.perimetreForm.value);
    this.index = 1;
  }


  // perimetre() {

  //   // A la place de retourner True ou False on retourne le chiffre
  //   // de 1 à 9 dans l'ordi pour chaque valeur de perimetreForm
  //   if (this.perimetreForm.get('application').value == true) {
  //     this.perimetreForm.controls['application'].setValue(this.index); this.index++;
  //   } else {
  //     this.perimetreForm.controls['application'].setValue(null);
  //     this.index++;
  //   }
  //   if (this.perimetreForm.get('btordo').value == true) {
  //     this.perimetreForm.controls['btordo'].setValue(this.index); this.index++;
  //   } else {
  //     this.perimetreForm.controls['btordo'].setValue(null);
  //     this.index++;
  //   }
  //   if (this.perimetreForm.get('bdd').value == true) {
  //     this.perimetreForm.controls['bdd'].setValue(this.index); this.index++;
  //   } else {
  //     this.perimetreForm.controls['bdd'].setValue(null);
  //     this.index++;
  //   }
  //   if (this.perimetreForm.get('unix').value == true) {
  //     this.perimetreForm.controls['unix'].setValue(this.index); this.index++;
  //   } else {
  //     this.perimetreForm.controls['unix'].setValue(null);
  //     this.index++;
  //   }
  //   if (this.perimetreForm.get('windows').value == true) {
  //     this.perimetreForm.controls['windows'].setValue(this.index); this.index++;
  //   } else {
  //     this.perimetreForm.controls['windows'].setValue(null);
  //     this.index++;
  //   }
  //   if (this.perimetreForm.get('reseau').value == true) {
  //     this.perimetreForm.controls['reseau'].setValue(this.index); this.index++;
  //   } else {
  //     this.perimetreForm.controls['reseau'].setValue(null);
  //     this.index++;
  //   }
  //   if (this.perimetreForm.get('sap').value == true) {
  //     this.perimetreForm.controls['sap'].setValue(this.index); this.index++;
  //   } else {
  //     this.perimetreForm.controls['sap'].setValue(null);
  //     this.index++;
  //   }
  //   if (this.perimetreForm.get('stockage').value == true) {
  //     this.perimetreForm.controls['stockage'].setValue(this.index); this.index++;
  //   } else {
  //     this.perimetreForm.controls['stockage'].setValue(null);
  //     this.index++;
  //   }
  //   if (this.perimetreForm.get('autre').value == true) {
  //     this.perimetreForm.controls['autre'].setValue(this.index); this.index++;
  //   } else {
  //     this.perimetreForm.controls['autre'].setValue(null);
  //     this.index++;
  //   }

  //   this.DemandeClientService.setFormulaireClient(this.formulaireForm, this.perimetreForm);
  //   this.index = 1;

  //   console.log('Données du formulaire...', this.perimetreForm.value);
  //   // this.router.navigate(['/etatprojet']);

  // }



}
