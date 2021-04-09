'use strict';
module.exports = function(app, path) {
  var todoList = require('../controller/appController.js');
  const authorize = require('../model/services/authorize.js');
  const Role = require('../model/services/role.js');

    // Contenu au niveau de l'administrateur

    // Page d'état des projets contenant les projets de tous les utilisateurs

    app.get('/api/demandesadmin', authorize(Role.Admin), todoList.list_demandes);

    // Page qui résume un projet pour l'admin en fonction de l'identifiant utilisateur et de la demande

    app.get('/api/resumeprojetadmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.resumeprojetadmin);

    // Tableau du chiffrage pour l'admin sur la page de résumé de projet

    app.get('/api/chiffrageadmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.chiffrageadmin);

    app.get('/api/home', authorize(Role.Admin));

    app.get('/api/home2', authorize(Role.Admin), todoList.get_listcharge);

    app.get('/api/home3/:annee_selector', authorize(Role.Admin), todoList.get_listanneecharge);

    app.post('/api/charge_total', authorize(Role.Admin), todoList.post_chargetotal);

    app.post('/api/charge_total2', authorize(Role.Admin), todoList.post_chargetotal2);

    // Résumé des périmètres indiqués lors de la création d'un projet sur la page de résumé de projet

    app.get('/api/resumeperimetreadmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.resumeperimetreadmin);

    // On sélectionne le droit de l'utilisateur qui a créé le projet au niveau de la page résumé de projet pour l'admin

    app.get('/api/droitutilisateuradmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.droitutilisateurresume);

    // Contenu au niveau du client

    // Page d'état des projets pour les clients à leurs arrivés sur la page d'accueil

    app.get('/api/demandes/:IdUtilisateur', authorize(), todoList.list_demandes_users);

    // Page qui résume un projet en fonction de l'identifiant utilisateur et de la demande

    app.get('/api/resumeprojet/:IdUtilisateur/:IdDemande', authorize(), todoList.resumeprojet);

    // Tableau du chiffrage pour le client sur la page de résumé de projet

    app.get('/api/chiffrageclient/:IdUtilisateur/:IdDemande', authorize(), todoList.chiffrageclient);

    // Résumé des périmètres indiqués lors de la création d'un projet sur la page de résumé de projet

    app.get('/api/resumeperimetreclient/:IdUtilisateur/:IdDemande', authorize(), todoList.resumeperimetreclient);

    // Changement d'état d'un projet si le projet a été chiffré par l'administrateur

    app.post('/api/etat', authorize(), todoList.post_changementetat);

    // Obtention du coût total d'un projet

    app.post('/api/total', authorize(), todoList.post_valeurtotal);

    // Commentaire posté par le client si il n'est pas satisfait du chiffrage appliqué par l'admin

    app.post('/api/commentairechiffrageclient', authorize(), todoList.post_acceptation);

    // Formulaire de demande de projet

    app.post('/api/formulaireclient', authorize(), todoList.post_demandeclient);

    // Application du chiffrage existant pour l'admin sur la page de chiffrage de projet

    app.post('/api/formulaireadmin/:IdDemande', authorize(Role.Admin), todoList.post_demandeadmin);

    // Formulaire d'application du chiffrage d'un projet par l'admin

    app.get('/api/formulaireadmintab/:IdDemande', authorize(Role.Admin), todoList.get_demandeadmin);

    //Contrat
    //Formulaire de la page commentairechiffrageclient
    app.post('/api/formulairecontrat/:IdDemande', authorize(Role.Admin), todoList.post_demandecontrat);

    app.post('/api/formulairecontratcharge/', authorize(Role.Admin), todoList.post_demandeusercontrat);

    app.post('/api/etatcontrat/', authorize(Role.Admin), todoList.post_changementetatContrat);

    app.post('/api/formulairecontratchargedelete/', authorize(Role.Admin), todoList.post_deletedemandecontrat);

    //SUPPRESSION D'UN CONTRAT
    app.post('/api/formulairecontratdelete/', authorize(Role.Admin), todoList.post_deletecontrat);

    app.post('/api/formulairecontratchargeuserdelete/', authorize(Role.Admin), todoList.post_deleteligneusercontrat);


    //
    // Formulaire application du contrat

    app.get('/api/formulairecontrattab/:IdDemande', authorize(Role.Admin), todoList.get_demandecontrat);

    app.get('/api/formulairecontratuserligne/:IdDemande', authorize(Role.Admin), todoList.get_demandecontratuser);





    '/api/formulairecontratuserchargeligne/'
    // Formulaire de création d'un utilisateur


    app.post('/api/creationuser', authorize(Role.Admin), todoList.post_creationuser);

    // Liste des utilisateurs présent sur l'application, disponible uniquement pour l'admin

    app.get('/api/listusers',  authorize(Role.Admin), todoList.get_userslist);

    // Informations d'un utilisateur spécifique

    app.get('/api/userinfos/:IdUtilisateur', authorize(), todoList.get_userinfos);

    // Mise à jour des informations d'un utilisateur

    app.post('/api/userinfos/update', authorize(), todoList.post_userinfos);

    app.post('/api/userinfos/updatepassword', authorize(), todoList.post_userinfoPassword);

    // Compteur des demandes de projet en fonction des utilisateurs

    app.get('/api/countdemandes',  authorize(Role.Admin), todoList.get_countdemandes);

    // Authentification des utilisateurs

    app.post('/api/users/authenticate', todoList.userlogin);

    // Suppression d'une ligne d'un chiffrage

    app.post('/api/deleteligneform', authorize(Role.Admin), todoList.delete_ligneadmin);

    // Suppression d'un utilisateur

    app.post('/api/deleteuser', authorize(Role.Admin), todoList.delete_user);

    // Routes pour le module roles
    // Informations d'un utilisateur spécifique

    app.get('/api/rolesinfos/:idroles', authorize(), todoList.get_rolesalone);
    // Suppression d'un role

    app.post('/api/deleterole', authorize(Role.Admin), todoList.delete_role);

    // Mise à jour des informations d'un role

    app.post('/api/rolesinfos/update', authorize(), todoList.post_rolesinfos);

    // Liste des roles présent sur l'application, disponible uniquement pour l'admin

    app.get('/api/listroles',  authorize(Role.Admin), todoList.get_roleslist);

    // Creation d'un role

    app.post('/api/creationrole', authorize(Role.Admin), todoList.post_creationrole);

    //Envoie d'une page de contrat
    app.post('/api/creationContrat/', authorize(Role.Admin), todoList.post_creationcontrat);

    // liste des contrat

    app.get('/api/contratadmin', authorize(Role.Admin), todoList.list_contrat);

    // liste des contrat

    app.get('/api/contratadmin', authorize(Role.Admin), todoList.list_contrat);

    // Page qui résume un contrat

    app.get('/api/resumecontrat/:IdContrat', authorize(), todoList.resumecontrat);
    // Page qui résume un contrat

    app.get('/api/tachecontrat/:IdContrat', authorize(), todoList.get_tachecontrat);
    // Page d'état des projets pour les clients à leurs arrivés sur la page d'accueil

    app.get('/api/contrat/:IdUtilisateur', authorize(), todoList.list_contrat_users);
};
