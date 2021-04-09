import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResearchBDDService } from '../services/research-bdd.service';

@Component({
  selector: 'app-creationusers',
  templateUrl: './creationusers.component.html',
  styleUrls: ['./creationusers.component.css']
})
export class CreationusersComponent implements OnInit {
  formulaireForm: FormGroup;
  regexEmail: RegExp = (/^([\w-\.]+)@((?:[\w-]+\.)+)([a-zA-Z]{2,3}$)/i);
  // regexNom: RegExp = /(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,50}$/;
  regexNom: RegExp = /(?!.*[\- ]{2,})^[a-zA-Z\- ]{3,30}$/;
  passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  submitted = false;

  // test = false;
  constructor(private router: Router, private fb: FormBuilder, private fctbdd: ResearchBDDService) { }

  ngOnInit() {
    this.formulaireForm = this.fb.group({  // Crée une instance de FormGroup
      login: ['',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.regexEmail)
          // Validators.pattern('^[a-zA-Z\s]*$')
        ]
      ],
      nom: ['',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.regexNom)
        ]
      ],
      prenom: ['',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.regexNom)
        ]
      ],
      mdp: ['',
      [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.passwordRegex)
        ]
      ],
      droit: ['', [Validators.required]],
      entreprise: ['',
        [
        Validators.required,
        Validators.maxLength(50)
        ]
      ]
    });
  }

  get f() { return this.formulaireForm.controls; }

  // changement() {
  //   if (this.formulaireForm.get('droit').value === 'Client') {
  //     this.test = true;
  //   } else {
  //     this.test = false;
  //   }
  // }

  valider() {
    this.submitted = true;

    if (this.formulaireForm.invalid) {
        return;
    }
    console.log('creation');
    this.fctbdd.setCreationUser(this.formulaireForm).subscribe((data: string[]) => {
      console.log(data);
      // Redirection
      this.router.navigate(['/utilisateurs']);
    });
  }

  retour() {
    this.router.navigate(['/etatprojetadmin']);
  }

}
