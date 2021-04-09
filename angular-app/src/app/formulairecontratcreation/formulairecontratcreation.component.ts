import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ResearchBDDService } from '../services/research-bdd.service';

@Component({
  selector: 'app-formulaireccontratcreation',
  templateUrl: './formulairecontratcreation.component.html',
  styleUrls: ['./formulairecontratcreation.component.css']
})

export class FormulairecontratcreationComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fctbdd: ResearchBDDService,
    private UserInfo: AuthenticationService
  ) { }

  title = 'ProjetM1-Capgemini';
  cheminImage: any = '../assets/image/capgemini.png';
  formulaireForm: FormGroup;
  index = 1;
  userinfo = this.UserInfo.currentUserValue;
  submitted = false;
  error = '';
  regexNom: RegExp = /^[^0-9\.\,\"\'\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+$/;

  ngOnInit() {

    console.log(this.userinfo);
    this.formulaireForm = this.fb.group({  // Crée une instance de FormGroup
      nomcontrat: ['',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      description: ['',
      [
        Validators.required,
        Validators.maxLength(50)
      ]
    ],
      nomentreprise: ['',
      [
        Validators.required,
        Validators.maxLength(50)
      ]
    ],
      nomdemandeur: ['',
      [
        Validators.required,
        Validators.maxLength(50)
      ]
    ],
      codenop: [''],
      referenceclient: [''],
      referenceinterne : [''],
      idutilisateur: []
    });
  }

  get f() { return this.formulaireForm.controls; }


  formulaire() {
    this.formulaireForm.get('idutilisateur').setValue(this.userinfo.id_utilisateur);

    this.submitted = true;


    if (this.formulaireForm.invalid) {
        return;
    }

    if (this.formulaireForm.get('codenop').value === '' ) {
      this.formulaireForm.get('codenop').setValue('Non renseigné');
    }

    if (this.formulaireForm.get('referenceclient').value === '' ) {
      this.formulaireForm.get('referenceclient').setValue('Non renseignée');
    }

    if (this.formulaireForm.get('referenceinterne').value === '' ) {
      this.formulaireForm.get('referenceinterne').setValue('Non renseignée');
    }

    console.log('Données du formulaire fin...', this.formulaireForm.value);
    this.fctbdd.setFormulaireContrat(this.formulaireForm).subscribe((data: string[]) => {
      // Redirection
      this.router.navigate(['/etatcontratadmin']);
    });
  }

}
