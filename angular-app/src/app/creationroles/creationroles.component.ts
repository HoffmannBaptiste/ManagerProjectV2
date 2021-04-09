import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResearchBDDService } from '../services/research-bdd.service';

@Component({
  selector: 'app-creationroles',
  templateUrl: './creationroles.component.html',
  styleUrls: ['./creationroles.component.css']
})
export class CreationrolesComponent implements OnInit {
  formulaireForm: FormGroup;
  regexNom: RegExp = /(?!.*[\- ]{2,})^[a-zA-Z\- ]{3,30}$/;
  regexCout: RegExp = /(?!.*[\- ]{2,})^[0-9]{1,3}$/;
  submitted = false;

  // test = false;
  constructor(private router: Router, private fb: FormBuilder, private fctbdd: ResearchBDDService) { }

  ngOnInit() {
    this.formulaireForm = this.fb.group({  // Crée une instance de FormGroup
      cout: ['',
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(this.regexCout)
        ]
      ],
      role: ['',
      [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.regexNom)
        ]
      ]
    });
  }

  get f() { return this.formulaireForm.controls; }


  valider() {
    this.submitted = true;

    if (this.formulaireForm.invalid) {
        return;
    }
    console.log('creation');
    this.fctbdd.setCreationRole(this.formulaireForm).subscribe((data: string[]) => {
      // Redirection
      this.router.navigate(['/creationroles']);
    });
  }

  retour() {
    this.router.navigate(['/etatprojetadmin']);
  }

}
