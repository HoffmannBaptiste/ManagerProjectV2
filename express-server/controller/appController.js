'use strict';

var LaCharge = require('../model/appModel.js').LaCharge;
var Chiffrage = require('../model/appModel.js').Chiffrage;
var ContratChiffrage = require('../model/appModel.js').ContratChiffrage;
var ContratChiffrageUser = require('../model/appModel.js').ContratChiffrageUser;
var Demande = require('../model/appModel.js').Demande;
var Perimetre = require('../model/appModel.js').Perimetre;
var Roles = require('../model/appModel.js').Roles;
var Contrat = require('../model/appModel.js').Contrat;
var User = require('../model/appModel.js').User;
var sha512 = require('js-sha512').sha512;
var Role = require('../model/services/role');

// Suppression d'une ligne d'un chiffrage

exports.delete_ligneadmin = function(req, res) {
  Chiffrage.deleteLigneForm(req.body.idLigne, function(err, chiffrage) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
  });

  Chiffrage.afficherChiffrage2(req.body.idDemande, function(err, chiffrage) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(chiffrage); // Renvoie le résultat si aucune erreur
    }
  });
};

// Suppression d'un utilisateur

exports.delete_user = function(req, res) {
  User.deleteUser(req.body.idUser, function(err, chiffrage) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
  });

  User.listUsers(function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      for (let index = 0; index < user.length; index++) {
        const element = user[index].droit_utilisateur;
        if(element == Role.Admin) {
          user[index].droit_utilisateur = 'Administrateur';
        }
        else if(element == Role.User) {
          user[index].droit_utilisateur = 'Client';
        }
        else if(element == Role.Collaborateur) {
          user[index].droit_utilisateur = 'Collaborateur';
        }
      }
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

// Application du chiffrage existant pour l'admin sur la page de chiffrage de projet

exports.post_demandeadmin = function(req, res) {
  var new_chiffrage = new Chiffrage(req.params.IdDemande, req.body.formulaireAdmin);


  Chiffrage.createChiffrage(new_chiffrage, function(err, chiffrage) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      Chiffrage.afficherChiffrage(chiffrage, function(err, chiffrage2) {
        if (err) {
          res.send(err); // Renvoie l'erreur que la bdd a généré
        }
        else {
          res.json(chiffrage2); // Renvoie le résultat si aucune erreur
        }
      });
    }
  });
};

// Formulaire d'application du chiffrage d'un projet par l'admin

exports.get_demandeadmin = function(req, res) {
  Chiffrage.afficherChiffrage2(req.params.IdDemande, function(err, chiffrage) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(chiffrage); // Renvoie le résultat si aucune erreur
    }
  });
};

// Authentification des utilisateurs

exports.userlogin = function(req, res) {

  User.userlogin(req.body.username, req.body.password, function(err, user) {



    if (err) {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }
    else if(!user) {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }
    else {
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};


// Page d'état des projets contenant les projets de tous les utilisateurs

exports.list_demandes = function(req, res) {
  Demande.getDemandes(function(err, demandes) {

    if (err)
      res.send(err); // Renvoie l'erreur que la bdd a généré

    res.json(demandes); // Renvoie le résultat si aucune erreur
  });
};

// Page d'état des projets pour les clients à leurs arrivés sur la page d'accueil

exports.list_demandes_users = function(req, res) {
  const currentUser = req.user;
  const id = parseInt(req.params.IdUtilisateur);
  // only allow current client to see his different requests
  if (id !== currentUser.sub) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  Demande.getDemandeUser(req.params.IdUtilisateur, function(err, demande) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }

    res.json(demande); // Renvoie le résultat si aucune erreur
  });
};

// Page qui résume un projet pour l'admin en fonction de l'identifiant utilisateur et de la demande

exports.resumeprojetadmin = function(req, res) {
  Demande.getDemandeAdmin(req.params.IdDemande, function(err, resume) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    } else if(!resume) {

      res.status(400).json({ message: 'ERROR' });
    }
    else {

      res.json(resume); // Renvoie le résultat si aucune erreur
    }
  });
};

// On sélectionne le droit de l'utilisateur qui a créé le projet au niveau de la page résumé de projet pour l'admin

exports.droitutilisateurresume = function(req, res) {
  Demande.getDroitUtilisateur(req.params.IdDemande, function(err, droit) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }

    res.json(droit); // Renvoie le résultat si aucune erreur
  });
}

// Tableau du chiffrage pour l'admin sur la page de résumé de projet

exports.chiffrageadmin = function(req, res) {
  Demande.getChiffrageAdmin(req.params.IdDemande, function(err, etapes) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }

    // tab['data'].push(etapes);
    res.json(etapes); // Renvoie le résultat si aucune erreur
  });
}

exports.Allchiffrageadmin = function(req, res) {
  Demande.getAllChiffrageAdmin(function(err, etapes) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }

    // tab['data'].push(etapes);
    res.json(etapes); // Renvoie le résultat si aucune erreur
  });
}


// Résumé des périmètres indiqués lors de la création d'un projet sur la page de résumé de projet

exports.resumeperimetreadmin = function(req, res) {
  Demande.getPerimetresAdmin(req.params.IdDemande, function(err, perimetres) {

    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }

    res.json(perimetres); // Renvoie le résultat si aucune erreur
  });
}

// Formulaire de création d'un utilisateur

exports.post_creationuser = function(req, res) {
  req.body.user.mdp = sha512(req.body.user.mdp);
  if(req.body.user.droit == 'Admin') {
    req.body.user.droit = Role.Admin;
  } else if (req.body.user.droit == 'Collaborateur'){
    req.body.user.droit = Role.Collaborateur;
  }
  else {
    req.body.user.droit = Role.User;
  }
  var new_user = new User(req.body.user);
  console.log("Dans le req", req.body.user);
  console.log("Dans le req", new_user);

  User.createUser(new_user, function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

// Liste des utilisateurs présent sur l'application, disponible uniquement pour l'admin

exports.get_userslist = function(req, res) {
  User.listUsers(function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      for (let index = 0; index < user.length; index++) {
        const element = user[index].droit_utilisateur;
        if(element == Role.Admin) {
          user[index].droit_utilisateur = 'Administrateur';
        }
        else if(element == Role.User) {
          user[index].droit_utilisateur = 'Client';
        }
        else if(element == Role.Collaborateur) {
          user[index].droit_utilisateur = 'Collaborateur';
        }
      }
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

//Get de toutes la table cha
exports.get_listcharge = function(req, res) {
  LaCharge.home2(function(err, charge) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(charge); // Renvoie le résultat si aucune erreur
    }
  });
};

exports.get_listanneecharge = function(req, res) {
  LaCharge.home3(req.body.annee_selector,function(err, chargeannee) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(chargeannee); // Renvoie le résultat si aucune erreur
    }
  });
};




// Informations d'un utilisateur spécifique

exports.get_userinfos = function(req, res) {
  const currentUser = req.user;
  const id = parseInt(req.params.IdUtilisateur);

  // only allow current client to see his different requests
  if (id !== currentUser.sub && currentUser.role == Role.User) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  User.selectUser(req.params.IdUtilisateur, function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    } else if(!user) {

      res.status(400).json({ message: 'ERROR' });
    }
    else {
      for (let index = 0; index < user.length; index++) {
        const element = user[index].droit_utilisateur;
        if(element == Role.Admin) {
          user[index].droit_utilisateur = 'Administrateur';
        }
        else if(element == Role.User) {
          user[index].droit_utilisateur = 'Client';
        }
        else if(element == Role.Collaborateur) {
          user[index].droit_utilisateur = 'Collaborateur';
        }
      }
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

// Mise à jour des informations d'un utilisateur

exports.post_userinfos = function(req, res) {
  const currentUser = req.user;
  const iduser = parseInt(req.body.idUser);
  const nom_entreprise = req.body.formulaireuser.nomentreprise;
  const nom = req.body.formulaireuser.nom;
  const prenom = req.body.formulaireuser.prenom;
  // const password = sha512(req.body.formulaireuser.password);
  let droit_utilisateur = req.body.formulaireuser.droitutilisateur;

  // only allow current client to see his different requests
  if (iduser !== currentUser.sub && currentUser.role == Role.User) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if(droit_utilisateur == 'Administrateur') {
    droit_utilisateur = Role.Admin;
  } else {
    droit_utilisateur = Role.User;
  }

  User.updateUserInfos(nom_entreprise, nom, prenom, droit_utilisateur, iduser, function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

exports.post_userinfoPassword = function(req, res) {
  const currentUser = req.user;
  const iduser = parseInt(req.body.idUser);
  const password = sha512(req.body.formulaireuser.password);

  // only allow current client to see his different requests
  if (iduser !== currentUser.sub && currentUser.role == Role.User) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  User.updateUserinfoPassword(password, iduser, function(err, user) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(user);
    }
  });
};

// Compteur des demandes de projet en fonction des utilisateurs

exports.get_countdemandes = function(req, res) {
  User.countDemandes(function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

// Page qui résume un projet en fonction de l'identifiant utilisateur et de la demande

exports.resumeprojet = function(req, res) {
  const currentUser = req.user;

  Demande.getDemandeClient(req.params.IdDemande, req.params.IdUtilisateur, function(err, resume) {
    if (err) {
      res.status(400).json({ message: err });
    } else if(!resume) {
      res.status(400).json({ message: 'ERROR' });
    }
    else {
      res.json(resume); // Renvoie le résultat si aucune erreur
    }
  });
};

// Tableau du chiffrage pour le client sur la page de résumé de projet

exports.chiffrageclient = function(req, res) {
  Demande.getChiffrageAdmin(req.params.IdDemande, function(err, etapes) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    // tab['data'].push(etapes);
    res.json(etapes); // Renvoie le résultat si aucune erreur
  });
}

// Résumé des périmètres indiqués lors de la création d'un projet sur la page de résumé de projet

exports.resumeperimetreclient = function(req, res) {
  Demande.getPerimetresAdmin(req.params.IdDemande, function(err, perimetres) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(perimetres); // Renvoie le résultat si aucune erreur
  });
}

// Formulaire de demande de projet

exports.post_demandeclient = function(req, res) {
  var new_demande = new Demande(req.body.formulaireForm);

  var perim = [];
  var perimuse = [];

  perim = Object.values(req.body.perimetreForm);
  for (let index = 0; index < perim.length; index++) {
    if(perim[index] != null) {
      perimuse.push(perim[index]);
    }
  }

  //handles null error
  if(!new_demande.nom_demande
    || !new_demande.nom_demandeur
    || !new_demande.description
    || !new_demande.date_demande
    || !new_demande.fk_utilisateur_id
  ){
    res.status(400).send({ message: 'Veuillez renseigner tous les champs saisis' });
  } else {
    Demande.createDemande(new_demande, perimuse, function(err, demande) {

      if (err) {
        res.send(err); // Renvoie l'erreur que la bdd a généré
      }
      // Demande.createPerimetre(demande);
      res.json(demande); // Renvoie le résultat si aucune erreur
    });
  }
}

// Changement d'état d'un projet si le projet a été chiffré par l'administrateur

exports.post_changementetat = function(req, res) {

  Demande.changementEtat(req.body.IdDemande, req.body.IdEtat, function(err, etat) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(etat); // Renvoie le résultat si aucune erreur
  });

  switch (req.body.IdEtat) {
    case 3:
      var datechiffrage = new Date();
      Demande.dateChiffrage(req.body.IdDemande, datechiffrage, function(err, date) {
        if (err) {
          res.send(err); // Renvoie l'erreur que la bdd a généré
        }
      });
      break;

    default:
      break;
  }
}

// Obtention du coût total d'un projet

exports.post_valeurtotal = function(req, res) {

  Demande.valeurtotal(req.body.IdDemande, req.body.calcul, function(err, valeur) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(valeur);
  });
}

exports.post_chargetotal = function(req, res) {

  LaCharge.chargetotal(req.body.lecharge_user, req.body.lecharge_total, req.body.lecharge_mois, req.body.lecharge_annee, function(err, lecharge) {
    console.log("Voici les differents champs envoyés :");
    console.log(req.body.lecharge_user);
    console.log(req.body.lecharge_total);
    console.log(req.body.lecharge_mois);
    console.log(req.body.lecharge_annee);

    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(lecharge);
    console.log(lecharge);
  });
}

exports.post_chargetotal2 = function(req, res) {

  LaCharge.chargetotal2(req.body.lecharge_user, req.body.lecharge_total, req.body.lecharge_mois, req.body.lecharge_annee, function(err, lecharge) {
    console.log("Voici les differents champs envoyés :");
    console.log(req.body.lecharge_user);
    console.log(req.body.lecharge_total);
    console.log(req.body.lecharge_mois);
    console.log(req.body.lecharge_annee);

    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(lecharge);
    console.log(lecharge);
  });
}

// Commentaire posté par le client si il n'est pas satisfait du chiffrage appliqué par l'admin

exports.post_acceptation = function(req, res) {
  const idDemande = req.body.id;
  const commentaire = req.body.repChiffrageClient.commentaire;
  const etatprojet = req.body.repChiffrageClient.etatProjet;
  const validationChiffrage = req.body.repChiffrageClient.validationChiffrage;
  Demande.acceptation(idDemande, commentaire, etatprojet, validationChiffrage,function(err, etat) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(etat);
  });
}

//Recuperation lignes Contrat
exports.get_demandecontrat = function(req, res) {
  ContratChiffrage.afficherChiffrageContrat(req.params.IdDemande, function(err, chiffragecontrat) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(chiffragecontrat); // Renvoie le résultat si aucune erreur
    }
  });
};

//Recuperation du user de la Suppression
exports.get_demandecontratuser = function(req, res) {
  ContratChiffrageUser.afficherChiffrageContratUser(req.params.IdDemande, function(err, chiffragecontratuser) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(chiffragecontratuser); // Renvoie le résultat si aucune erreur
    }
  });
};





//Envoie de la ligne CONTRAT

exports.post_demandecontrat = function(req, res) {
var new_chiffrage_contrat = new ContratChiffrage(req.params.IdDemande, req.body.formulairecontrat);
console.log("VOICI LA LIGNE DE contrat qui est envoyee", req.body.formulairecontrat);
console.log("VOICI LA LIGNE DE CHIFFRAGE QUI EST ENVOYEE", new_chiffrage_contrat);
  ContratChiffrage.postChiffrageContrat(new_chiffrage_contrat, function(err, lecontrat) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(lecontrat);
  });
}

//ENVOI DE LA LIGNE CONTRAT CHARGE UTILISATEUR VERS LA TABLE LIGNE CHIFFRAGE CHARGE User
exports.post_demandeusercontrat = function(req, res) {

  ContratChiffrageUser.postChiffrageUserContrat(req.body.leidlignecontrat, req.body.leuserID, req.body.levaleurcharge, req.body.levaleurmois, req.body.levaleurannee, function(err, leusercharge) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(leusercharge);
  });
}

//ON SUPPRIME UNE LIGNE CHIFFRAGE DU CONTRAT
exports.post_deletedemandecontrat = function(req, res) {

  ContratChiffrage.DeleteLigneContrat(req.body.leligneidcontrat, function(err, lelignecharge) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(lelignecharge);
  });
}

//ON SUPPRIME UN CONTRAT
exports.post_deletecontrat = function(req, res) {

  Contrat.DeleteContrat(req.body.leidcontrat, function(err, lecontratcharge) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(lecontratcharge);
  });
}

//On vient supprimer la la charge de la ligne supprimée
//ON SUPPRIME UNE LIGNE CHIFFRAGE DU CONTRAT
exports.post_deleteligneusercontrat = function(req, res) {

  LaCharge.DeleteLigneUserContrat(req.body.lauserid, req.body.lamoischarge, req.body.laanneecharge, req.body.lachargesupp, function(err, leligneusercharge) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(leligneusercharge);
  });
}

// Requêtes pour le module role
exports.get_roleslist = function(req, res) {
  Roles.listRoles(function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      for (let index = 0; index < user.length; index++) {
        const element = user[index].droit_utilisateur;
      }
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

// Suppression d'un utilisateur

exports.delete_role = function(req, res) {
  Roles.deleteRole(req.body.IdRoles, function(err, chiffrage) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
  });

  Roles.listRoles(function(err, role) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      for (let index = 0; index < role.length; index++) {
        const element = role[index].droit_utilisateur;
      }
      res.json(role); // Renvoie le résultat si aucune erreur
    }
  });
};

// Informations d'un utilisateur spécifique

exports.get_rolesalone = function(req, res) {
  const currentUser = req.user;
  const id = parseInt(req.params.idroles);
  if (id !== currentUser.sub && currentUser.role == Role.User) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  Roles.get_rolesalone(req.params.idroles, function(err, roles) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    } else if(!roles) {
      res.status(400).json({ message: 'ERROR' });
    }
    else {
      res.json(roles); // Renvoie le résultat si aucune erreur
    }
  });
};


// Mise à jour des informations d'un utilisateur
exports.post_rolesinfos = function(req, res) {
  const idroles = parseInt(req.body.idroles);
  const nom = req.body.formulaireRoles.nom;
  const cout = req.body.formulaireRoles.cout;

  Roles.updateRolesInfos(nom, cout, idroles, function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

// Formulaire de création d'un role

exports.post_creationrole = function(req, res) {
  /*req.body.user.mdp = sha512(req.body.user.mdp);
  if(req.body.user.droit == 'Admin') {
    req.body.user.droit = Role.Admin;
  } else {
    req.body.user.droit = Role.User;
  }*/
  var new_role = new Roles(req.body.user);
  console.log("Dans le req", req.body.user );
  console.log("Dans le req", new_role );
  Roles.createRole(new_role, function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

//Creation d'un contrat
exports.post_creationcontrat = function(req, res) {
  var new_contrat = new Contrat(req.body.formulaireForm);
  console.log('req.body.formulaireForm: '+ req.body.formulaireForm);
  Contrat.createContrat(new_contrat, function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

exports.list_contrat = function(req, res) {
  Contrat.getContrat(function(err, contrat) {

    if (err)
      res.send(err); // Renvoie l'erreur que la bdd a généré

    res.json(contrat); // Renvoie le résultat si aucune erreur
  });
};

// Changement d'état d'un contrat

exports.post_changementetatContrat = function(req, res) {

  Contrat.etatchangement(req.body.IdDemande, req.body.IdEtat, function(err, etat) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(etat); // Renvoie le résultat si aucune erreur
  });

}


exports.list_contrat = function(req, res) {
  Contrat.getContrat(function(err, contrat) {

    if (err)
      res.send(err); // Renvoie l'erreur que la bdd a généré

    res.json(contrat); // Renvoie le résultat si aucune erreur
  });
};

// Page qui résume un projet pour l'admin en fonction de l'identifiant utilisateur et de la demande

exports.resumecontrat = function(req, res) {
  Contrat.getContratAlone(req.params.IdContrat, function(err, resume) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    } else if(!resume) {

      res.status(400).json({ message: 'ERROR' });
    }
    else {

      res.json(resume); // Renvoie le résultat si aucune erreur
    }
  });
};

// Formulaire d'affiche des taches d'un contrat

exports.get_tachecontrat = function(req, res) {
  Contrat.afficherContrat(req.params.IdContrat, function(err, tache) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(tache); // Renvoie le résultat si aucune erreur
    }
  });
};

// Page d'état des contrat pour les collaborateur à leurs arrivés sur la page d'accueil

exports.list_contrat_users = function(req, res) {
  const currentUser = req.user;
  const id = parseInt(req.params.IdUtilisateur);
  // only allow current client to see his different requests
  if (id !== currentUser.sub) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  Contrat.getcontratUser(req.params.IdUtilisateur, function(err, demande) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }

    res.json(demande); // Renvoie le résultat si aucune erreur
  });
};
