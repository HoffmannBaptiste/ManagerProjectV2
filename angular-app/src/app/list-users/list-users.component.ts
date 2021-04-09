import { Component, OnInit } from '@angular/core';
import { ResearchBDDService } from '../services/research-bdd.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  utilisateurs: any[];
  nombredemandes: any[];

  constructor(private fctbdd: ResearchBDDService) { }

  ngOnInit() {
    this.fctbdd.getUtilisateurs().subscribe((data: string[]) => {
      this.utilisateurs = data;
      console.log(this.utilisateurs);
      // for (const iterator of this.utilisateurs) {
      //   console.log(Object.keys(iterator).map(key => iterator[key]));
      // }
    });

    this.fctbdd.getCountDemandes().subscribe((data: string[]) => {
      this.nombredemandes = data;
    });
  }

  // Permet de supprimer un utilisateur
  deleteEtape(iduser) {
    console.log(iduser);

    // On utilise la fontion setDeleteUser contenu dans research-bdd.service.ts
    this.fctbdd.setDeleteUser(iduser).subscribe((data: string[]) => {
      this.utilisateurs = data;
      console.log(this.utilisateurs);
    });
  }

}
