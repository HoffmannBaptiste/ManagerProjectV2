import { Component, OnInit } from '@angular/core';
import { ResearchBDDService } from '../services/research-bdd.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {
  roles: any[];

  constructor(private fctbdd: ResearchBDDService) { }

  ngOnInit() {
    this.fctbdd.getRoles().subscribe((data: string[]) => {
      this.roles = data;
      console.log(this.roles);
    });
  }

  // Permet de supprimer un role
  deleteRole(idroles) {
    console.log(idroles);

    // On utilise la fontion setDeleteUser contenu dans research-bdd.service.ts
    this.fctbdd.setDeleteRoles(idroles).subscribe((data: string[]) => {
      this.roles = data;
      console.log(this.roles);
    });
  }

}
