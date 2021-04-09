import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResearchBDDService } from '../services/research-bdd.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: any;
  idroles: string;
  nom: string;
  cout: string;
  currentUser: any;
  formulaireRole: FormGroup;
  regexNom: RegExp = /(?!.*[\- ]{2,})^[a-zA-Z\- ]{3,30}$/;
  regexCout: RegExp = /(?!.*[\- ]{2,})^[0-9]{1,3}$/;
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
    this.idroles = this.route.snapshot.paramMap.get('idroles');
    this.fctbdd.getRolesAlone(this.idroles).subscribe((data: string[]) => {
      this.roles = data[0];
      this.nom = this.roles.nom_role;
      this.cout = this.roles.cout_role;
    });

    this.formulaireRole = this.fb.group({  // Crée une instance de FormGroup
      nom: ['',
        [
          Validators.maxLength(30),
          Validators.pattern(this.regexNom)
        ]
      ],
      cout: ['', 
      [
          Validators.maxLength(3),
          Validators.pattern(this.regexCout)
      ]
    ],
    });
  }

  get f() { return this.formulaireRole.controls; }

  update() {
    this.submitted = true;

    if (this.formulaireRole.invalid) {
        return;
    }

    if (this.formulaireRole.get('nom').value === '' ) {
      this.formulaireRole.get('nom').setValue(this.nom);
      
    }
    if (this.formulaireRole.get('cout').value === '' ) {
      this.formulaireRole.get('cout').setValue(this.cout);
    }
    this.idroles = this.route.snapshot.paramMap.get('idroles');
    this.fctbdd.setRolesInfos(this.idroles, this.formulaireRole).subscribe((data: string[]) => {
      console.log(data);
      document.getElementById('openModal').click();
    });
  }
  roleslist() {
    this.router.navigate(['/roles']);
  }

}
