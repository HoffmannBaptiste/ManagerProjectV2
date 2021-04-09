'user strict';
var sql = require('./dbsql.js');
const config = require('./services/config.json');
const jwt = require('jsonwebtoken');
var sha512 = require('js-sha512').sha512;

var Demande = function(Demande) {
    // this.nom_client = Demande.usernameclient;
    this.nom_demande = Demande.nomprojet;
    this.nom_demandeur = Demande.demandeur;
    this.description = Demande.description;
    this.date_demande = Demande.datedemande;
    this.code_NOP = Demande.codenop;
    this.fonction = Demande.fonction;
    this.reference_client = Demande.referenceclient;
    this.validation_chiffrage = null;
    this.reference_interne = Demande.referenceinterne;
    this.fk_utilisateur_id = Demande.idutilisateur;
};

var User = function(User) {
    this.nom_utilisateur = User.nom;
    this.prenom_utilisateur = User.prenom;
    this.login_utilisateur = User.login;
    this.mdp_utilisateur = User.mdp;
    this.droit_utilisateur = User.droit;
    this.nom_entreprise = User.entreprise;
};
var Roles = function(Roles) {
    this.cout_role = Roles.cout;
    this.nom_role = Roles.role;
};

var LaCharge = function(LaCharge) {
    this.fk_utilisateur_id = LaCharge.lecharge_user;
    this.janvier_charge = LaCharge.lecharge_total;
    this.fevrier_charge = LaCharge.lecharge_total;
    this.mars_charge = LaCharge.lecharge_total;
    this.avril_charge = LaCharge.lecharge_total;
    this.mai_charge = LaCharge.lecharge_total;
    this.juin_charge = LaCharge.lecharge_total;
    this.juillet_charge = LaCharge.lecharge_total;
    this.aout_charge = LaCharge.lecharge_total;
    this.septembre_charge = LaCharge.lecharge_total;
    this.octobre_charge = LaCharge.lecharge_total;
    this.novembre_charge = LaCharge.lecharge_total;
    this.decembre_charge = LaCharge.lecharge_total;
    this.annee_charge = LaCharge.lecharge_annee;
};

var ContratChiffrage = function(IdDemande, ContratChiffrage){
  this.fk_contrat_id = IdDemande;
  this.nom_phase = ContratChiffrage.phase;
  this.nom_tache = ContratChiffrage.tache;
  this.nom_entite = ContratChiffrage.entitee;
  this.date_debut = ContratChiffrage.datedebutauto;
  this.date_demarrage = ContratChiffrage.datedebutforce;
  this.date_fin = ContratChiffrage.datefin;
  this.charge_total = ContratChiffrage.charge;

}

var ContratChiffrageUser = function(ContratChiffrageUser){
  this.fk_ligne_id = ContratChiffrageUser.leidlignecontrat;
  this.fk_utilisateur_id = ContratChiffrage.leuserID;
  this.valeur_charge = ContratChiffrage.levaleurcharge;
  this.mois_charge = ContratChiffrage.levaleurmois;
  this.annee_charge = ContratChiffrage.levaleurannee;

}

var Chiffrage = function(IdDemande, Chiffrage) {
  this.fk_demande_id = IdDemande;
  this.remarque = Chiffrage.remarques;
  this.nom_acteur = Chiffrage.acteur;
  this.mois_chiffrage = Chiffrage.mois;
  this.annee_chiffrage = Chiffrage.annee;
  this.valeur_charge = Chiffrage.charge;
  this.nom_grade = Chiffrage.grade;
  this.valeur_tjm = Chiffrage.tjm;
  this.valeur_total = Chiffrage.total;
  this.nom_sous_etape = Chiffrage.sousetape;
  this.nom_etape = Chiffrage.etape;
};

var Contrat = function(Contrat) {
  this.nom_contrat = Contrat.nomcontrat;
  this.description = Contrat.description;
  this.nom_entreprise = Contrat.nomentreprise;
  this.nom_demandeur = Contrat.nomdemandeur;
  this.code_nop = Contrat.codenop;
  this.reference_client = Contrat.referenceclient;
  this.reference_interne = Contrat.referenceinterne;
  this.fk_utilisateur_id = Contrat.idutilisateur;
  this.fk_etat_id = Contrat.IdEtat;
};

Demande.getDemandes = function (result) {
    sql.query("SELECT Demandes.id_demande,Demandes.nom_demande,Etats.nom_etat,Utilisateurs.nom_entreprise,Demandes.nom_demandeur,Demandes.date_demande,Demandes.date_chiffrage,Demandes.date_demarrage,Demandes.date_livraison from Demandes INNER JOIN Etats ON Demandes.fk_etat_id = Etats.id_etat RIGHT JOIN Utilisateurs ON Demandes.fk_utilisateur_id=Utilisateurs.id_utilisateur WHERE Demandes.nom_demande!='NULL'", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('les demandes en fonction de l\'user : ', res);

             result(null, res);
            }
        });
};

Demande.getDemandeUser = function (IdUtilisateur, result) {
  sql.query("SELECT * from Demandes INNER JOIN  Etats ON Demandes.fk_etat_id = Etats.id_etat WHERE Demandes.fk_utilisateur_id = ?", IdUtilisateur, function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
            console.log('les demandes en fonction de l\'user : ', res);

           result(null, res);
          }
      });
};

Chiffrage.createChiffrage = function (newChiffrage, result) {
  sql.query("INSERT INTO Ligne_Chiffrages SET ?", newChiffrage,function (err, res) {
      // console.log(newChiffrage);
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        // console.log(res.insertId);
        result(null, res.insertId);
      }
  });
};

Chiffrage.afficherChiffrage = function (IdChiffrage, result) {
  sql.query("SELECT `id_ligne`,`nom_etape`,`nom_sous_etape`,`nom_acteur`,`mois_chiffrage`,`annee_chiffrage`,`nom_grade`,`valeur_charge`,`valeur_tjm`,`valeur_total`,`remarque` FROM `Ligne_Chiffrages` WHERE `id_ligne` = ?", IdChiffrage,function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              console.log('chiffrage d\'une etape : ', res);
              result(null, res);
          }
      });
};

Chiffrage.afficherChiffrage2 = function (IdDemande, result) {
  sql.query("SELECT Ligne_Chiffrages.*, ROUND(Ligne_Chiffrages.valeur_total, 2) AS valeur_round, Demandes.fk_etat_id FROM `Ligne_Chiffrages` INNER JOIN Demandes ON fk_demande_id = Demandes.id_demande WHERE `fk_demande_id` = ?", IdDemande,function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              console.log('chiffrage d\'une etape : ', res);
              result(null, res);
          }
      });
};

Chiffrage.deleteLigneForm = function (IdLigne, result) {
  sql.query("DELETE FROM `Ligne_Chiffrages` WHERE `id_ligne` = ?", IdLigne,function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              console.log('chiffrage d\'une etape : ', res);
              result(null, res);
          }
      });
};

Chiffrage.afficherNomEtapes = function (result) {
  sql.query("SELECT DISTINCT `nom_etape` FROM `Ligne_Chiffrages`",function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('Nom etapes : ', res);
              result(null, res);
          }
      });
};

Chiffrage.afficherNomSE = function (result) {
  sql.query("SELECT DISTINCT `nom_sous_etape` FROM `Ligne_Chiffrages`",function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('Nom sous etapes : ', res);
              result(null, res);
          }
      });
};

Chiffrage.afficherNomActeur = function (result) {
  sql.query("SELECT DISTINCT `nom_acteur` FROM `Ligne_Chiffrages`",function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('Noms acteurs : ', res);
              result(null, res);
          }
      });
};

Chiffrage.afficherMoisChiffrage = function (result) {
  sql.query("SELECT DISTINCT `mois_chiffrage` FROM `Ligne_Chiffrages`",function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('Noms acteurs : ', res);
              result(null, res);
          }
      });
};

Chiffrage.afficherNomGrade = function (result) {
  sql.query("SELECT DISTINCT `nom_grade` FROM `Ligne_Chiffrages`",function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('Noms grades : ', res);
              result(null, res);
          }
      });
};

User.userlogin = function (login_utilisateur, mdp_utilisateur, result) {
    // console.log(sha512(mdp_utilisateur));
    mdp_utilisateur = sha512(mdp_utilisateur);
    console.log(login_utilisateur + " " + mdp_utilisateur);
    sql.query("SELECT id_utilisateur, login_utilisateur, droit_utilisateur, nom_entreprise from Utilisateurs WHERE login_utilisateur = ? AND mdp_utilisateur = ?", [login_utilisateur, mdp_utilisateur], function (err, res) {
            if(err) {
              console.log("error: ", err);
              result(null, err);
            }
            else if(!res.length) {
              console.log("res is null");
              res = false;
              result(null, res);
            }
            else{
              console.log('affichage requete : ', res);
              const token = jwt.sign({ sub: res[0].id_utilisateur, role: res[0].droit_utilisateur }, config.secret);

              res[0].token = token;

              console.log('affichage requete : ', res);

              result(null, res[0]);
            }
        });
};

User.createUser = function (user, result) {
  sql.query("INSERT INTO Utilisateurs SET ?", user,function (err, res) {
      // console.log(newChiffrage);
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        console.log(res.insertId);
        result(null, res.insertId);
      }
  });
};

User.listUsers = function (result) {
  sql.query("SELECT id_utilisateur, nom_utilisateur, login_utilisateur, nom_entreprise, droit_utilisateur FROM `Utilisateurs`",function (err, res) {
          console.log("voici l'erreur :", err);
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
            console.log("voici la resultat : ", res);
          }
      });
};

User.deleteUser = function (IdUser, result) {
  sql.query("DELETE FROM `Utilisateurs` WHERE `id_utilisateur` = ?", IdUser,function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              console.log('Suppression de l\'utilisateur : ', res);
              result(null, res);
          }
      });
};

User.countDemandes = function (result) {
  sql.query("SELECT Utilisateurs.id_utilisateur, Utilisateurs.nom_utilisateur, Utilisateurs.login_utilisateur,Utilisateurs.nom_entreprise, Utilisateurs.droit_utilisateur, COUNT(Demandes.fk_utilisateur_id) AS nombre_demandes FROM `Utilisateurs` INNER JOIN Demandes ON Utilisateurs.id_utilisateur = Demandes.fk_utilisateur_id GROUP BY Demandes.fk_utilisateur_id",function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
          }
      });
};

User.selectUser = function (IdUser, result) {
  sql.query("SELECT id_utilisateur, nom_utilisateur, login_utilisateur, prenom_utilisateur, nom_entreprise, droit_utilisateur FROM `Utilisateurs` WHERE `id_utilisateur` = ?", IdUser, function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else if(!res.length) {
            console.log("error: ", res);
            res = false;
            result(null, res);
          }
          else{
            result(null, res);
          }
      });
};

User.updateUserInfos = function (nom_entreprise, nom, prenom, droit_utilisateur, iduser, result) {
  sql.query("UPDATE Utilisateurs SET nom_entreprise = ?, nom_utilisateur = ?, prenom_utilisateur = ?, droit_utilisateur = ? WHERE `id_utilisateur` = ?", [nom_entreprise, nom, prenom, droit_utilisateur, iduser], function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
          }
      });
};

User.updateUserinfoPassword = function (password, iduser, result) {
  sql.query("UPDATE Utilisateurs SET mdp_utilisateur = ? WHERE `id_utilisateur` = ?", [password, iduser], function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
          }
      });
};


// Données de la demande côté client
Demande.getEtapesFromDemande = function (IdUser, IdDemande, result) {
    sql.query("SELECT * FROM Ligne_Chiffrages INNER JOIN Demandes ON `fk_demande_id` = `id_demande` WHERE `fk_utilisateur_id` = ? AND `fk_demande_id` = ?", [IdUser, IdDemande], function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('etapes en fonction de la demande : ', res);
                result(null, res);
            }
        });
};

Demande.getResumeDemandeFromDemande = function (IdUser, IdDemande, result) { // départager la partie perim et demande
    sql.query("SELECT Demandes.nom_demande,Demandes.date_demande,Demandes.date_chiffrage,Demandes.date_demarrage,Demandes.date_livraison,Demandes.description, Demandes.code_nop, Demandes.fonction, Demandes.reference_client, Demandes.reference_interne ,Etats.nom_etat,Utilisateurs.nom_utilisateur FROM Demandes LEFT JOIN Etats on fk_etat_id=Etats.id_etat RIGHT JOIN Utilisateurs on fk_utilisateur_id=Utilisateurs.id_utilisateur WHERE Utilisateurs.id_utilisateur = ? AND Demandes.id_demande= ?", [IdUser, IdDemande],function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('etapes en fonction de la demande : ', res);
                result(null, res);
            }
        });
};

Demande.getPerimetresFromDemande = function (IdDemande, result) { // départager la partie perim et demande
  sql.query("SELECT nom_perimetre FROM `Demandes_Perimetres` INNER JOIN Perimetres ON fk_perimetre_id = id_perimetre WHERE fk_demande_id = ?", IdDemande,function (err, res) {

          if(err) {
              // console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('perimetres en fonction de la demande : ', res);
              result(null, res);
          }
      });
};


// Données de la demande côté admin
Demande.getChiffrageAdmin = function (IdDemande, result) {
  sql.query("SELECT * FROM Ligne_Chiffrages INNER JOIN Demandes ON `fk_demande_id` = `id_demande` WHERE `fk_demande_id` = ?", IdDemande, function (err, res) {

          if(err) {
              // console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('etapes en fonction de la demande : ', res);
              result(null, res);
          }
      });
};

Demande.getAllChiffrageAdmin = function (result) {
  sql.query("SELECT * FROM Ligne_Chiffrages", function (err, res) {

          if(err) {
              // console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('etapes en fonction de la demande : ', res);
              result(null, res);
          }
      });
};

Demande.getDemandeAdmin = function (IdDemande, result) { // départager la partie perim et demande
  console.log(IdDemande);
  sql.query("SELECT Demandes.nom_demande, Demandes.nom_demandeur, Demandes.date_demande,Demandes.date_chiffrage,Demandes.date_demarrage,Demandes.date_livraison,Demandes.description, Demandes.code_nop, Demandes.fonction, Demandes.reference_client, Demandes.reference_interne, Demandes.fk_etat_id, Demandes.Total, Demandes.validation_chiffrage, Demandes.remarque_validation, Etats.nom_etat,Utilisateurs.nom_utilisateur, Utilisateurs.login_utilisateur FROM Demandes LEFT JOIN Etats on fk_etat_id=Etats.id_etat RIGHT JOIN Utilisateurs on fk_utilisateur_id=Utilisateurs.id_utilisateur WHERE Demandes.id_demande= ?", IdDemande,function (err, res) {

          if(err) {
            // console.log("error: ", err);
            result(null, err);
          }
          else if(!res.length) {
            console.log("error: ", res);
            res = false;
            result(null, res);
          }
          else{
            console.log('la demande : ', res);
            result(null, res);
          }
      });
};

Demande.getDroitUtilisateur = function (IdDemande, result) { // départager la partie perim et demande
  console.log(IdDemande);
  sql.query("SELECT `droit_utilisateur` FROM `Utilisateurs` INNER JOIN Demandes ON id_utilisateur = Demandes.fk_utilisateur_id Where Demandes.id_demande = ?", IdDemande,function (err, res) {

          if(err) {
            // console.log("error: ", err);
            result(null, err);
          }
          else{
            console.log('la demande : ', res);
            result(null, res);
          }
      });
};

Demande.getDemandeClient = function (IdDemande, IdUtilisateur, result) { // départager la partie perim et demande
  sql.query("SELECT Demandes.nom_demande, Demandes.nom_demandeur, Demandes.date_demande,Demandes.date_chiffrage,Demandes.date_demarrage,Demandes.date_livraison,Demandes.description, Demandes.code_nop, Demandes.fonction, Demandes.reference_client, Demandes.reference_interne, Demandes.fk_etat_id, Demandes.Total, Demandes.validation_chiffrage, Demandes.remarque_validation, Etats.nom_etat,Utilisateurs.nom_utilisateur, Utilisateurs.login_utilisateur FROM Demandes LEFT JOIN Etats on fk_etat_id=Etats.id_etat RIGHT JOIN Utilisateurs on fk_utilisateur_id=Utilisateurs.id_utilisateur WHERE Demandes.id_demande= ? AND Utilisateurs.id_utilisateur = ?", [IdDemande, IdUtilisateur], function (err, res) {

          if(err) {
            // console.log("error: ", err);
            result(null, err);
          }
          else if(!res.length) {
            console.log("error: ", res);
            res = false;
            result(null, res);
          }
          else{
            console.log('la demande : ', res);
            result(null, res);
          }
      });
};

Demande.getPerimetresAdmin = function (IdDemande, result) { // départager la partie perim et demande
sql.query("SELECT nom_perimetre FROM `Demandes_Perimetres` INNER JOIN Perimetres ON fk_perimetre_id = id_perimetre WHERE fk_demande_id = ?", IdDemande,function (err, res) {

        if(err) {
            // console.log("error: ", err);
            result(null, err);
        }
        else{
            // console.log('perimetres en fonction de la demande : ', res);
            result(null, res);
        }
    });
};

Demande.createDemande = function (newDemande, newPerimetre, result) {
    sql.query("INSERT INTO Demandes SET ?", newDemande,function (err, res) {
        console.log(newDemande);
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            // console.log(res.insertId);
            result(null, res.insertId);
            var demandeid = res.insertId;
            newPerimetre.forEach(element => {
                sql.query("INSERT INTO Demandes_Perimetres (fk_demande_id, fk_perimetre_id) VALUES (?, ?)", [demandeid, element]);
            });
        }
    });
};

Demande.changementEtat = function (IdDemande, IdEtat, result) {
  sql.query("UPDATE Demandes SET fk_etat_id = ? WHERE id_demande = ?", [IdEtat, IdDemande],function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};

Demande.valeurtotal = function (IdDemande, calcul, result) {
  sql.query("UPDATE Demandes SET Total = ? WHERE id_demande = ?", [calcul, IdDemande],function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};


Demande.acceptation = function (IdDemande, commentaire, etatprojet, validationChiffrage, result) {
  sql.query("UPDATE Demandes SET remarque_validation = ?, fk_etat_id = ?, validation_chiffrage = ? WHERE id_demande = ?", [commentaire, etatprojet, validationChiffrage, IdDemande], function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};

Demande.dateChiffrage = function (IdDemande, datechiffrage, result) {
  sql.query("UPDATE Demandes SET date_chiffrage = ? WHERE id_demande = ?", [datechiffrage, IdDemande],function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};

LaCharge.home2 = function (result) {
  sql.query("SELECT * FROM `UtilisateursCharge`",function (err, res) {
          if(err) {
            result(null, err);
          }
          else{
            //console.log("erreur : ", res);
            result(null, res);

          }
      });
};


LaCharge.home3 = function (selection_annee_charge, result) {
  sql.query("SELECT fk_utilisateur_id FROM `UtilisateursCharge` WHERE annee_charge = ?",[selection_annee_charge],function (err, res) {
          if(err) {
            result(null, err);
          }
          else{
            //console.log("erreur : ", res);
            result(null, res);

          }
      });
};

//LaCharge.chargetotal = function (lecharge_user, lecharge_total, lecharge_mois, result) {
//  sql.query("UPDATE UtilisateursCharge SET emploi_valeur_charge = ?, lecharge_mois = ? WHERE fk_utilisateur_id = ?", [lecharge_total, lecharge_mois, lecharge_user],function (err, res) {
//      if(err) {
//          console.log("error: ", err);
//          sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, emploi_valeur_charge = ?, emploi_mois_chiffrage = ?",[lecharge_user, lecharge_total, lecharge_mois]);
//          result(null, res);
//      }
//      else{
//          // //console.log(res.insertId);
//          result(null, res);
//      }
//  });
//};

//LaCharge.chargetotal = function (lecharge_user, lecharge_total, lecharge_mois, lecharge_annee, result) {
//  console.log(this.lecharge_user);
//  console.log(this.lecharge_total);
//  console.log(this.lecharge_mois);
//  console.log(this.lecharge_annee);
//  console.log(lecharge_user);
//  console.log(lecharge_total);
//  console.log(lecharge_mois);
//  console.log(lecharge_annee);

//}
//LaCharge.chargetotal = function (lecharge_user, lecharge_total, lecharge_mois, lecharge_annee, result) {
//  sql.query("UPDATE UtilisateursCharge SET janvier_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee,function (err, res) {
//    console.log("Voici l'erreur : ", err);
//    console.log("Voici le resultat", res);
//}
//LaCharge.chargetotal = function (lecharge_user, lecharge_total, lecharge_mois, lecharge_annee, result) {
//  sql.query("UPDATE UtilisateursCharge SET janvier_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
//    console.log("Votre resultat est :  ", res);
//  });
//}



//LaCharge.chargetotal = function (lecharge_user, lecharge_total, lecharge_mois, lecharge_annee, result) {
 //sql.query("SELECT fk_utilisateur_id = ?, annee_charge = ?, janvier_charge = ? FROM `UtilisateursCharge`",[lecharge_user, lecharge_annee, lecharge_total],function (err, res) {
  // result(null, res);
   //console.log("voici ton resultat", res);
 //});
//}
//LA BONNE CHARGE TOTALE
LaCharge.chargetotal2 = function (lecharge_user, lecharge_total, lecharge_mois, lecharge_annee, result) {
  console.log(lecharge_user);
  console.log(lecharge_total);
  console.log(lecharge_mois);
  console.log(lecharge_annee);
  if (lecharge_mois == "janvier" || lecharge_mois == 1) {
    sql.query("UPDATE UtilisateursCharge SET janvier_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
      console.log("Voici le resultat", res);
      if (res.affectedRows !== 1) {
        sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, janvier_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
        result(null, res);
      }
      else {
        result(null, err);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
 else if (lecharge_mois == "fevrier" || lecharge_mois == 2) {
   sql.query("UPDATE UtilisateursCharge SET fevrier_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, fevrier_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "mars" || lecharge_mois == 3) {
   sql.query("UPDATE UtilisateursCharge SET mars_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, mars_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "avril" || lecharge_mois == 4) {
   sql.query("UPDATE UtilisateursCharge SET avril_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, avril_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "mai" || lecharge_mois == 5) {
   sql.query("UPDATE UtilisateursCharge SET mai_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, mai_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "juin" || lecharge_mois == 6) {
   sql.query("UPDATE UtilisateursCharge SET juin_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, juin_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "juillet" || lecharge_mois == 7) {
   sql.query("UPDATE UtilisateursCharge SET juillet_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, juillet_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
      //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "aout" || lecharge_mois == 8) {
   sql.query("UPDATE UtilisateursCharge SET aout_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, aout_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "septembre" || lecharge_mois == 9) {
   sql.query("UPDATE UtilisateursCharge SET septembre_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, septembre_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "octobre" || lecharge_mois == 10) {
   sql.query("UPDATE UtilisateursCharge SET octobre_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, octobre_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "novembre" || lecharge_mois == 11) {
   sql.query("UPDATE UtilisateursCharge SET novembre_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, novembre_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "decembre" || lecharge_mois == 12) {
   sql.query("UPDATE UtilisateursCharge SET decembre_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, decembre_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
}








//LA BONNE CHARGE TOTALE
LaCharge.chargetotal = function (lecharge_user, lecharge_total, lecharge_mois, lecharge_annee, result) {
  console.log(lecharge_user);
  console.log(lecharge_total);
  console.log(lecharge_mois);
  console.log(lecharge_annee);
  if (lecharge_mois == "janvier" || lecharge_mois == 1) {
    sql.query("UPDATE UtilisateursCharge SET janvier_charge = janvier_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
      console.log("Voici le resultat", res);
      if (res.affectedRows !== 1) {
        sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, janvier_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
        result(null, res);
      }
      else {
        result(null, err);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
 else if (lecharge_mois == "fevrier" || lecharge_mois == 2) {
   sql.query("UPDATE UtilisateursCharge SET fevrier_charge = fevrier_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, fevrier_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "mars" || lecharge_mois == 3) {
   sql.query("UPDATE UtilisateursCharge SET mars_charge = mars_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, mars_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "avril" || lecharge_mois == 4) {
   sql.query("UPDATE UtilisateursCharge SET avril_charge = avril_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, avril_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "mai" || lecharge_mois == 5) {
   sql.query("UPDATE UtilisateursCharge SET mai_charge = mai_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, mai_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "juin" || lecharge_mois == 6) {
   sql.query("UPDATE UtilisateursCharge SET juin_charge = juin_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, juin_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "juillet" || lecharge_mois == 7) {
   sql.query("UPDATE UtilisateursCharge SET juillet_charge =juillet_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, juillet_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
      //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "aout" || lecharge_mois == 8) {
   sql.query("UPDATE UtilisateursCharge SET aout_charge =aout_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, aout_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "septembre" || lecharge_mois == 9) {
   sql.query("UPDATE UtilisateursCharge SET septembre_charge =septembre_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, septembre_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "octobre" || lecharge_mois == 10) {
   sql.query("UPDATE UtilisateursCharge SET octobre_charge =octobre_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, octobre_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "novembre" || lecharge_mois == 11) {
   sql.query("UPDATE UtilisateursCharge SET novembre_charge =novembre_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, novembre_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
 else if (lecharge_mois == "decembre" || lecharge_mois == 12) {
   sql.query("UPDATE UtilisateursCharge SET decembre_charge =decembre_charge+? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_user, lecharge_annee],function (err, res) {
     if (res.affectedRows !== 1) {
       sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, decembre_charge = ?, annee_charge = ?",[lecharge_user, lecharge_total, lecharge_annee]);
       result(null, res);
     }
     else {
       result(null, err);
       //console.log("Il est déja dans la base de donnée");
     }
   });

 }
}



//LaCharge.chargetotal = function (lecharge_user, lecharge_total, lecharge_mois, lecharge_annee, result) {
//  if(lecharge_total == 20) {
//    sql.query("UPDATE UtilisateursCharge SET janvier_charge = ? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lecharge_total, lecharge_mois, lecharge_user],function (err, res) {
//      if(err) {
//        sql.query("INSERT INTO UtilisateursCharge SET fk_utilisateur_id = ?, emploi_valeur_charge = ?, emploi_mois_chiffrage = ?",[lecharge_user, lecharge_total, lecharge_mois]);
//        result(null, res);
//        console.log("le test est passé");
//      }
//      else {
//        result(null, res);
//      }
//    });
//  }
//  else {
//    console.log("Nulos CEST PAS BON");
//  }
//}
//ON VIENT RECUPERER LES LIGNES DE CHIFFRAGES DU CONTRAT
ContratChiffrage.afficherChiffrageContrat = function (IdDemande, result) {
  sql.query("SELECT Ligne_Contrats.*, Contrats.fk_etat_id FROM `Ligne_Contrats` INNER JOIN Contrats ON fk_contrat_id = Contrats.id_contrat WHERE `fk_contrat_id` = ?", IdDemande,function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              console.log('chiffrage d\'une etape : ', res);
              result(null, res);
          }
      });
};

//AFFICHAGE DE LA CHARGE User
ContratChiffrageUser.afficherChiffrageContratUser = function (IdDemande, result) {
  sql.query("SELECT * FROM `ligne_Contrats_Utilisateurs` WHERE fk_ligne_id = ?", IdDemande,function (err, res) {
      // console.log(newChiffrage);
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        // console.log(res.insertId);
        result(null, res);
      }
  });
};


//Envoi d'une ligne de chiffragecontrat vers la table contrat chiffrage



//
ContratChiffrage.postChiffrageContrat = function (newChiffrageContrat, result) {
  sql.query("INSERT INTO Ligne_Contrats SET ?", newChiffrageContrat,function (err, res) {
      // console.log(newChiffrage);
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        // console.log(res.insertId);
        result(null, res.insertId);
      }
  });
};

ContratChiffrageUser.postChiffrageUserContrat = function (leidlignecontrat, leuserID, levaleurcharge, levaleurmois, levaleurannee, result) {
  sql.query("INSERT INTO ligne_Contrats_Utilisateurs SET fk_ligne_id = ?, fk_utilisateur_id = ?, valeur_charge = ?, mois_charge = ?, annee_charge = ?", [leidlignecontrat, leuserID, levaleurcharge, levaleurmois, levaleurannee], function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};

//SUPPRESSION D'UNE LIGNE Contrat
ContratChiffrage.DeleteLigneContrat = function (leligneidcontrat, result) {
  sql.query("DELETE FROM Ligne_Contrats WHERE id_ligne = ?", [leligneidcontrat], function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};

//SUPPRESSION D'UN CONTRAT
//SUPPRESSION D'UNE LIGNE Contrat
Contrat.DeleteContrat = function (leidcontrat, result) {
  sql.query("DELETE FROM Contrats WHERE id_contrat = ?", [leidcontrat], function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};


// MISE A JOUR D'UNE CHARGE SUPPRIME
LaCharge.DeleteLigneUserContrat = function (lauserid, lamoischarge, laanneecharge, lachargesupp, result) {
  if (lamoischarge == "janvier" || lamoischarge == 1) {
    sql.query("UPDATE UtilisateursCharge SET janvier_charge = janvier_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
  else if (lamoischarge == "fevrier" || lamoischarge == 2) {
    sql.query("UPDATE UtilisateursCharge SET fevrier_charge = fevrier_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
  else if (lamoischarge == "mars" || lamoischarge == 3) {
    sql.query("UPDATE UtilisateursCharge SET mars_charge = mars_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
  else if (lamoischarge == "avril" || lamoischarge == 4) {
    sql.query("UPDATE UtilisateursCharge SET avril_charge = avril_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
  else if (lamoischarge == "mai" || lamoischarge == 5) {
    sql.query("UPDATE UtilisateursCharge SET mai_charge = mai_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
  else if (lamoischarge == "juin" || lamoischarge == 6) {
    sql.query("UPDATE UtilisateursCharge SET juin_charge = juin_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
  else if (lamoischarge == "juillet" || lamoischarge == 7) {
    sql.query("UPDATE UtilisateursCharge SET juillet_charge = juillet_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
  else if (lamoischarge == "aout" || lamoischarge == 8) {
    sql.query("UPDATE UtilisateursCharge SET aout_charge = aout_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
  else if (lamoischarge == "septembre" || lamoischarge == 9) {
    sql.query("UPDATE UtilisateursCharge SET septembre_charge = septembre_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
  else if (lamoischarge == "octobre" || lamoischarge == 10) {
    sql.query("UPDATE UtilisateursCharge SET octobre_charge = octobre_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
  if (lamoischarge == "novembre" || lamoischarge == 11) {
    sql.query("UPDATE UtilisateursCharge SET novembre_charge = novembre_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
  if (lamoischarge == "decembre" || lamoischarge == 12) {
    sql.query("UPDATE UtilisateursCharge SET decembre_charge = decembre_charge-? WHERE fk_utilisateur_id = ? AND annee_charge = ? ",[lachargesupp, lauserid, laanneecharge],function (err, res) {
      if (err) {
        result(err, null);
      }
      else {
        result(null, res);
        //console.log("Il est déja dans la base de donnée");
      }
    });
  }
}

// Requetes pour le module role
Roles.updateRolesInfos = function ( nom, cout, idroles, result) {
  console.log('requete bdd update!');
  sql.query("UPDATE Roles SET nom_role = ?, cout_role = ? WHERE `id_role` = ?", [nom, cout, idroles], function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
          }
      });
};

Roles.get_rolesalone = function (IdRoles, result) {
  sql.query("SELECT nom_role, cout_role FROM `Roles` WHERE `id_role` = ?",IdRoles, function (err, res) {
          if(err) {
            result(null, err);
          }
          else if(!res.length) {
            res = false;
            result(null, res);
          }
          else{
            result(null, res);
            console.log(res);
          }
      });
};

Roles.deleteRole = function (IdRoles, result) {
  console.log("id: ",IdRoles);
  sql.query("DELETE FROM `Roles` WHERE `id_role` = ?",IdRoles,function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              console.log('Suppression du role : ', res);
              result(null, res);
          }
      });
};

Roles.listRoles = function (result) {
  sql.query("SELECT id_role, nom_role, cout_role FROM `Roles`",function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
          }
      });
};
Roles.createRole = function (user, result) {
  sql.query("INSERT INTO Roles SET ?", user,function (err, res) {
      // console.log(newChiffrage);
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        console.log(res.insertId);
        result(null, res.insertId);
      }
  });
};

//Requete creation d'un contrat
Contrat.createContrat = function (new_contrat, result) {
  sql.query("INSERT INTO Contrats SET ?", new_contrat,function (err, res) {
      console.log(new_contrat);
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          result(null, res.insertId);
      }
  });
};

//Requete recuperation liste des contrats
Contrat.getContrat = function (result) {
  sql.query("SELECT Contrats.id_contrat,Contrats.nom_contrat,Contrats.nom_entreprise,Contrats.nom_demandeur,Contrats.fk_etat_id from Contrats", function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
            console.log('les contrats en fonction de l\'user : ', res);

           result(null, res);
          }
      });
};

//Archivage d'un contrat // Changement etat d'un contrat
Contrat.etatchangement = function (IdDemande, IdEtat, result) {
  sql.query("UPDATE Contrats SET fk_etat_id = ? WHERE id_contrat = ?", [IdEtat, IdDemande],function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};

//Requete recuperation liste des contrats
Contrat.getContrat = function (result) {
  sql.query("SELECT Contrats.id_contrat,Contrats.nom_contrat,Contrats.nom_entreprise,Contrats.nom_demandeur from Contrats", function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
            console.log('les contrats en fonction de l\'user : ', res);

           result(null, res);
          }
      });
};


//Requete recuperation liste d'un contrats
Contrat.getContratAlone = function (IdContrat, result) {
  sql.query("SELECT `nom_contrat`,`nom_demandeur`,`nom_entreprise`,`description`,`code_nop`,`reference_client`,`reference_interne` FROM Contrats WHERE `id_contrat`= ?",IdContrat, function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
            console.log('les contrats en fonction de l\'user : ', res);

           result(null, res);
          }
      });
};

Contrat.afficherContrat = function (IdContrat, result) {
  sql.query("SELECT `id_ligne`,`nom_phase`,`nom_tache`,`nom_entite`,`date_debut`,`date_demarrage`,`date_fin`,`charge_total`,concat(GROUP_CONCAT(u.nom_utilisateur,'[',lcu.valeur_charge,']' SEPARATOR ' || ')) as collaborateur from Ligne_Contrats lc  INNER join ligne_Contrats_Utilisateurs lcu on lc.id_ligne = lcu.fk_ligne_id Left join Utilisateurs u on u.id_utilisateur=lcu.fk_utilisateur_id where lc.fk_contrat_id=? GROUP BY `id_ligne`,`nom_phase`,`nom_tache`,`nom_entite`,`date_debut`,`date_demarrage`,`date_fin`,`charge_total`", IdContrat,function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              console.log('chiffrage d\'une etape : ', res);
              result(null, res);
          }
      });
};

Contrat.getContratUser = function (IdUtilisateur, result) {
  sql.query("SELECT DISTINCT Contrats.id_contrat,Contrats.nom_contrat,Contrats.nom_entreprise,Contrats.nom_demandeur from Contrats Inner join ligne_contrats on contrats.`id_contrat`=ligne_contrats.fk_contrat_id LEFT JOIN ligne_contrats_utilisateurs ON ligne_contrats.id_ligne=ligne_contrats_utilisateurs.fk_ligne_id where `ligne_contrats_utilisateurs`.`fk_utilisateur_id`=? ", IdUtilisateur, function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
            console.log('les demandes en fonction de l\'user : ', res);

           result(null, res);
          }
      });
};



module.exports= {
    Demande,
    User,
    Chiffrage,
    LaCharge,
    ContratChiffrage,
    Roles,
    Contrat,
    ContratChiffrageUser
}
