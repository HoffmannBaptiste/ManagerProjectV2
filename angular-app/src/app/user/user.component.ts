import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResearchBDDService } from '../services/research-bdd.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  formulaireUser: FormGroup;
  formulaireUserPassword: FormGroup;
  utilisateur: any;
  iduser: string;
  nomentreprise: string;
  droitutilisateur: string;
  nom: string;
  prenom: string;
  currentUser: any;
  // regexNom: RegExp = /(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,50}$/;
  regexNom: RegExp = /(?!.*[\- ]{2,})^[a-zA-Z\- ]{3,30}$/;
  passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fctbdd: ResearchBDDService,
    private user: AuthenticationService
    ) {
    this.currentUser = this.user.currentUserValue;
   }

  ngOnInit() {
    this.iduser = this.route.snapshot.paramMap.get('iduser');

    this.fctbdd.getUtilisateurInfos(this.iduser).subscribe((data: string[]) => {
      this.utilisateur = data[0];
      this.nomentreprise = this.utilisateur.nom_entreprise;
      this.droitutilisateur = this.utilisateur.droit_utilisateur;
      this.nom = this.utilisateur.nom_utilisateur;
      this.prenom = this.utilisateur.prenom_utilisateur;
    });

    this.formulaireUser = this.fb.group({  // Crée une instance de FormGroup
      nom: ['',
        [
          Validators.maxLength(50),
          Validators.pattern(this.regexNom)
        ]
      ],
    prenom: ['',
      [
        Validators.maxLength(50),
        Validators.pattern(this.regexNom)
      ]
    ],

      droitutilisateur: [''],

      nomentreprise: ['',
      [
      Validators.maxLength(50)
      ]
    ]
    });

    this.formulaireUserPassword = this.fb.group({  // Crée une instance de FormGroup
      password: ['',
      [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.passwordRegex)
        ]
      ],
    });
  }

  get f() { return this.formulaireUser.controls; }
  get f2() { return this.formulaireUserPassword.controls; }

  update() {
    this.submitted = true;

    if (this.formulaireUser.invalid) {
        return;
    }

    if (this.formulaireUser.get('nom').value === '' ) {
      this.formulaireUser.get('nom').setValue(this.nom);
    }
    if (this.formulaireUser.get('prenom').value === '' ) {
      this.formulaireUser.get('prenom').setValue(this.prenom);
    }
    if (this.formulaireUser.get('nomentreprise').value === '' ) {
      this.formulaireUser.get('nomentreprise').setValue(this.nomentreprise);
    }
    this.fctbdd.setUserInfos(this.iduser, this.formulaireUser).subscribe((data: string[]) => {
      console.log(this.formulaireUser);
      document.getElementById('openModal').click();
    });
  }

  updatePassword() {
    this.submitted = true;

    if (this.formulaireUserPassword.invalid) {
      return;
    }

    this.fctbdd.setUserInfoPassword(this.iduser, this.formulaireUserPassword).subscribe((data: string[]) => {
      console.log(data);
      document.getElementById('openModal2').click();
    });
  }

  userlist() {
    this.router.navigate(['/utilisateurs']);
  }

}
