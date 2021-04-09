import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { FormGroup } from '@angular/forms';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ResearchBDDService {
  currentUser: any;

  constructor(private http: HttpClient) {
  }

  // CLIENT

  // Récupère les informations pour la page d'accueil etatprojet (client)
  getEtatProjetClient(iduser: number): Observable<any> {
    console.log(iduser);
    const url: string = '/api/demandes/' + iduser;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère le Résumé du projet pour la page resumeprojet (client)
  getResumeProjetClient(iduser: string, iddemande: string): Observable<any> {
    console.log(iduser, iddemande);
    const url: string = '/api/resumeprojet/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère le Chiffrage du projet pour la page resumeprojet (client)
  getChiffrageClient(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/chiffrageclient/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère les Périmètres du projet pour la page resumeprojet (client)
  getResumePerimetreClient(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/resumeperimetreclient/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Envoie le formulaire pour la création de projet de la page formulaireclient
  setFormulaireClient(formulaireForm: FormGroup, perimetreForm: FormGroup): Observable<any> {
    const url = '/api/formulaireclient';
    const data = { formulaireForm: formulaireForm.value, perimetreForm: perimetreForm.value };

    // console.log(JSON.stringify(data));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }




  // ADMIN

  // Récupère le Résumé du projet pour la page resumeprojetadmin (admin)
  getResumeProjetAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/resumeprojetadmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère le Chiffrage du projet pour la page resumeprojetadmin (admin)
  getChiffrageAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/chiffrageadmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère le Chiffrage du projet pour la page resumeprojetadmin (admin)
  getAllChiffrageAdmin(iduser: string): Observable<any> {
    const url: string = '/api/chiffrageadmin';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère les Périmètres du projet pour la page resumeprojetadmin (admin)
  getResumePerimetreAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/resumeperimetreadmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère les informations pour la page d'accueil etatprojetadmin (admin)
  getEtatProjetAdmin() {
    const url = '/api/demandesadmin';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère la valeur du droit de l'utilisateur qui a créer le projet pour la page resumeprojetadmin (admin)
  getDroitUtilisateurAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/droitutilisateuradmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // (Envoi) Permet de changer l'état d'un projet
  setEtatProjetTraiteAdmin(id: string, etat: number): Observable<any> {
    console.log(id);
    const url = '/api/etat/';
    const data = { IdDemande: id , IdEtat: etat};

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Envoie la valeur total d'un projet lié au coût de l'ensemble du chiffrage dans la page formulaireadmin. on indique l'id du projet
  setValeurTotal(id: string, lecalcul: string): Observable<any> {
    console.log(id);
    const url = '/api/total/';
    const data = { IdDemande: id , calcul : lecalcul};

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Envoie la valeur du total de la charge d'un utilisateur sur un mois (janvier, février, ...)

  setChargeTotal(charge_user: string, total_charge: number, charge_mois: string, charge_annee: string): Observable<any> {
    //console.log(id);
    const url = '/api/charge_total';
    const data = { lecharge_user: charge_user , lecharge_total : total_charge, lecharge_mois : charge_mois, lecharge_annee : charge_annee};
    console.log ("Voici la charge :", charge_user);
    console.log ("Voici la charge :", total_charge);
    console.log ("Voici la charge :", charge_mois);
    console.log ("Voici la charge :", charge_annee);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Envoie la valeur du total de la charge d'un utilisateur sur un mois (janvier, février, ...)

  setChargeTotal2(charge_user: string, total_charge: number, charge_mois: string, charge_annee: string): Observable<any> {
    //console.log(id);
    const url = '/api/charge_total2';
    const data = { lecharge_user: charge_user , lecharge_total : total_charge, lecharge_mois : charge_mois, lecharge_annee : charge_annee};
    console.log ("Voici la charge :", charge_user);
    console.log ("Voici la charge :", total_charge);
    console.log ("Voici la charge :", charge_mois);
    console.log ("Voici la charge :", charge_annee);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }


  //setChargeTotal(charge_user: string, total_charge: string, charge_mois: string): Observable<any> {
    //console.log(id);
    //const url = '/api/charge_total';
    //const data = { lecharge_user: charge_user , lecharge_total : total_charge, lecharge_mois : charge_mois};

    //const httpOptions = {
      //headers: new HttpHeaders({
        //'Content-Type': 'application/json'
      //})
    //};
    //const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    //return observable;
  //}

  // Envoie les informations de l'utilisateur a créer depuis la page creationusers
  setCreationUser(formulaireForm: FormGroup): Observable<any> {
    const url = '/api/creationuser';
    const data = { user: formulaireForm.value };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  //Recuperer la valeur des chargetotal des utilisateurs en fonction des différents mois

  getlistcharge() {
    const url = '/api/home2';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  //Recuperer la valeur des charge en fonction des années
  getlistanneecharge(annee_selector: string): Observable<any> {
    const url: string = '/api/home3/' + annee_selector;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }




  // Récupère les différents utilisateurs existant pour les afficher dans la page utilisateurs (component list-users)
  getUtilisateurs() {
    const url = '/api/listusers';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère les informations d'un utilisateur indiqué en paramètre pour la page utilisateur (component user)
  getUtilisateurInfos(iduser: string) {
    const url = '/api/userinfos/' + iduser;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère le nombre de demandes (nb de projet) par utilisateurs pour la page utilisateurs (component list-users)
  getCountDemandes() {
    const url = '/api/countdemandes';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Envoie l'id de l'utilisateur à supprimer depuis la page utilisateurs (component list-users)
  setDeleteUser(IdUser: string): Observable<any> {
    const url = '/api/deleteuser';
    const data = { idUser: IdUser };

    // console.log(JSON.stringify(data));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Envoie les informations a modifié pour un utilisateur donné (grâce à son id) depuis la page utilisateur (component user)
  setUserInfos(iduser: string, formulaireUser: FormGroup): Observable<any> {
    console.log(iduser);
    const url = '/api/userinfos/update';
    const data = { idUser: iduser, formulaireuser: formulaireUser.value };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Envoie le nouveau mot de passe pour un utilisateur donné (grâce à son id) depuis la page utilisateur (component user)
  setUserInfoPassword(iduser: string, formulaireUser: FormGroup): Observable<any> {
    console.log(iduser);
    const url = '/api/userinfos/updatepassword';
    const data = { idUser: iduser, formulaireuser: formulaireUser.value };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Envoie une ligne de chiffrage complète pour un projet donnée (repéré par son id)
  setFormulaireAdmin(IdDemande: string, sousetapeForm: FormGroup): Observable<any> {
    const url = '/api/formulaireadmin/' + IdDemande;
    const data = { formulaireAdmin: sousetapeForm.value};

    // console.log(JSON.stringify(data));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Récupère le Chiffrage du projet pour la page formulaireadmin (admin)
  getFormulaireAdmin(IdDemande: string): Observable<any> {
    const url: string = '/api/formulaireadmintab/' + IdDemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // (Envoi) Permet de supprimer une ligne de chiffrage répéré par son id et l'id du projet associé.
  setDeleteFormulaire(IdLigne: string, IdDemande: string): Observable<any> {
    const url = '/api/deleteligneform';
    const data = { idLigne: IdLigne, idDemande : IdDemande };

    // console.log(JSON.stringify(data));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // ADMIN ET CLIENT

  // Envoie le Commentaire de chiffrage du client depuis la page resumeprojet (client)
  setCommentaireChiffrage(iddemande: string, formulaireForm: FormGroup): Observable<any> {
    // console.log(formulaireForm.value);
    const url = '/api/commentairechiffrageclient';
    const data = { repChiffrageClient: formulaireForm.value, id: iddemande };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  //On recupere les lignes de notre commentairechiffrageclient// Récupère le Chiffrage du projet pour la page formulaireadmin (admin)
  getFormulaireContrat(IdDemande: string): Observable<any> {
    const url: string = '/api/formulairecontrattab/' + IdDemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  //ON RECUPERE LA TABLE LIGNE CONTRAT UTILISATEUR
  getLigneUserContrat(IdDemande : string): Observable<any> {
    const url: string = '/api/formulairecontratuserligne/' + IdDemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  //ON ENVOIE LES INFOS A LIGNES CHIFFRAGE CONTRAT
  setLigneContrats(IdDemande: string, sousetapeForm: FormGroup): Observable<any> {
    //console.log(id);
    const url = '/api/formulairecontrat/' + IdDemande;
    const data = { formulairecontrat: sousetapeForm.value };
    console.log("Voici le formulaire", sousetapeForm);


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  //ON ENVOIE LES INFOS CONTRAT CHIFFRAGE A LA TABLE LIGNE CHARGE UTILISATEURS
  setLigneUtilisateursContrats(idlignecontrat: string, userID : string, valeurcharge : number, valeurmois : string, valeurannee : string): Observable<any> {
    //console.log(id);
    const url = '/api/formulairecontratcharge/';
    const data = { leidlignecontrat: idlignecontrat, leuserID : userID, levaleurcharge : valeurcharge, levaleurmois : valeurmois, levaleurannee : valeurannee };
    //console.log("Voici le formulaire", sousetapeForm);


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  //ON SUPPRIME UNE LIGNE DU contrat
  //ON ENVOIE LES INFOS CONTRAT CHIFFRAGE A LA TABLE LIGNE CHARGE UTILISATEURS
  DeleteLigneContrats(ligneidcontrat : string): Observable<any> {
    //console.log(id);
    const url = '/api/formulairecontratchargedelete/';
    const data = { leligneidcontrat: ligneidcontrat};
    //console.log("Voici le formulaire", sousetapeForm);


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  //ON SUPPRIME UN CONTRAT
  DeleteContrats(idcontrat : string): Observable<any> {
    //console.log(id);
    const url = '/api/formulairecontratdelete/';
    const data = { leidcontrat: idcontrat};
    //console.log("Voici le formulaire", sousetapeForm);


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  //ON UPDATE LA VALUR SUPPRIMER DE LA LIGNE
  DeleteChargeUser(userid : number, moischarge : string, anneecharge : string, chargesupp : number): Observable<any> {
    //console.log(id);
    const url = '/api/formulairecontratchargeuserdelete/';
    const data = { lauserid: userid, lamoischarge : moischarge, laanneecharge : anneecharge, lachargesupp : chargesupp};
    console.log("Voici le formulaire", userid);
    console.log("Voici le formulaire", moischarge);
    console.log("Voici le formulaire", anneecharge);
    console.log("Voici le formulaire", chargesupp);


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  //Requetes pour le module role
  // Récupère les différents utilisateurs existant pour les afficher dans la page utilisateurs (component list-users)
getRoles() {
  const url = '/api/listroles';
  const observable: Observable<any> =
  this.http.get(url);
  return observable;
}

// Envoie l'id de l'utilisateur à supprimer depuis la page utilisateurs (component list-users)
setDeleteRoles(IdRoles: string): Observable<any> {
  const url = '/api/deleterole';
  const data = { IdRoles: IdRoles };

  console.log(JSON.stringify(data));
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
  return observable;
}

/*// Envoie le formulaire pour la création de projet de la page formulaireclient
setFormulaireContrat(formulaireForm: FormGroup): Observable<any> {
  const url = '/api/formulairecontrat';
  const data = { formulaireForm: formulaireForm.value};

  // console.log(JSON.stringify(data));
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
  return observable;
}*/

// Récupère les informations d'un utilisateur indiqué en paramètre pour la page utilisateur (component user)
getRolesInfos(idroles: string) {
  const url = '/api/rolesinfos/' + idroles;
  console.log(url);
  const observable: Observable<any> =
  this.http.get(url);
  return observable;
}

getRolesAlone(idroles: string) {
  const url = '/api/rolesinfos/' + idroles;
  console.log("url " + url);
  const observable: Observable<any> =
  this.http.get(url);
  return observable;
}

// Envoie les informations a modifié pour un utilisateur donné (grâce à son id) depuis la page utilisateur (component user)
setRolesInfos(idroles: string, formulaireRoles: FormGroup): Observable<any> {
  const url = '/api/rolesinfos/update';
  const data = { idroles: idroles, formulaireRoles: formulaireRoles.value };

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
  return observable;
}

// Envoie les informations de l'utilisateur a créer depuis la page creationusers
  setCreationRole(formulaireForm: FormGroup): Observable<any> {
    const url = '/api/creationrole';
    const data = { user: formulaireForm.value };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  //Pour la creation d'un contrat
  setFormulaireContrat(formulaireForm: FormGroup): Observable<any> {
    const url = '/api/creationContrat';
    const data = { formulaireForm: formulaireForm.value };
    console.log(JSON.stringify(data));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }



  // (Envoi) Permet de changer l'état d'un contrat
  setEtatContrat(id: string, etat: number): Observable<any> {
    console.log(id);
    const url = '/api/etatcontrat/';
    const data = { IdDemande: id , IdEtat: etat};

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Récupère les informations pour la page d'accueil etatprojetadmin (admin)
  getEtatContratAdmin() {
    const url = '/api/contratadmin';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère le Résumé du projet pour la page resumeprojetadmin (admin)
  getResumeContrat(idcontrat: string): Observable<any> {
    const url: string = '/api/resumecontrat/' + idcontrat;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

    // Récupère le Chiffrage du projet pour la page resumeprojetadmin (admin)
    getTacheContrat(idcontrat: string): Observable<any> {
      const url: string = '/api/tachecontrat/' + idcontrat;
      const observable: Observable<any> =
      this.http.get(url);
      return observable;
    }

    // Récupère les informations pour la page d'accueil etatprojet (client)
    getEtatContrat(iduser: number): Observable<any> {
      console.log(iduser);
      const url: string = '/api/contrat/' + iduser;
      const observable: Observable<any> =
      this.http.get(url);
      return observable;
    }



}
