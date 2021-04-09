-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mar 31 Mars 2020 à 16:28
-- Version du serveur :  5.5.64-MariaDB
-- Version de PHP :  5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `retest`
--

-- --------------------------------------------------------

--
-- Structure de la table `avancements`
--

DROP TABLE IF EXISTS `Avancements`;
CREATE TABLE IF NOT EXISTS `Avancements` (
  `id_avancement` int(11) NOT NULL AUTO_INCREMENT,
  `nom_avancement` varchar(32) NOT NULL,
  PRIMARY KEY (`id_avancement`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `avancements`
--

INSERT INTO `Avancements` (`id_avancement`, `nom_avancement`) VALUES
(1, 'En cours'),
(2, 'A faire'),
(3, 'Fini');

-- --------------------------------------------------------

--
-- Structure de la table `demandes`
--

DROP TABLE IF EXISTS `Demandes`;
CREATE TABLE IF NOT EXISTS `Demandes` (
  `id_demande` int(11) NOT NULL AUTO_INCREMENT,
  `nom_demande` varchar(250) NOT NULL,
  `nom_demandeur` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `date_demande` date NOT NULL,
  `date_chiffrage` date DEFAULT NULL,
  `date_demarrage` date DEFAULT NULL,
  `date_livraison` date DEFAULT NULL,
  `code_nop` varchar(32) NOT NULL,
  `fonction` varchar(32) NOT NULL,
  `reference_client` varchar(32) DEFAULT NULL,
  `validation_chiffrage` varchar(32) DEFAULT NULL,
  `remarque_validation` text DEFAULT NULL,
  `reference_interne` varchar(32) NOT NULL,
  `Total` double DEFAULT NULL,
  `fk_utilisateur_id` int(11) NOT NULL,
  `fk_etat_id` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_demande`),
  KEY `fk_utilisateur_id` (`fk_utilisateur_id`),
  KEY `fk_etat_id` (`fk_etat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `demandes`
--

INSERT INTO `Demandes` (`id_demande`, `nom_demande`, `nom_demandeur`, `description`, `date_demande`, `date_chiffrage`, `date_demarrage`, `date_livraison`, `code_nop`, `fonction`, `reference_client`, `validation_chiffrage`, `remarque_validation`, `reference_interne`, `Total`, `fk_utilisateur_id`, `fk_etat_id`) VALUES
(85, 'GT DATA - chiffrage accepté avec réserve', 'Stéphane JUBEAU', 'construction de l\'architecture d\'hébergement de l\'application Abus de Marché de Reuters :\r\n\r\napplication 3-Tiers : AS, BDD, ETL\r\n3 environnements : Dev, Homol et Production\r\n\r\n- AS : 4 VM RHEL + Oracle JDK\r\n- ETL : 3 VM RHEL + Oracle JRE\r\n- BDD : 2 LPAR avec BDD Oracle\r\n- publication application Citrix\r\n\r\nCriticité Application : a définir suite retrait de la redondance\r\nPCA/PRA : à definir suite retrait de la redondance\r\n5 utilisateurs\r\nenviron 4 To de stockage', '2020-02-29', '2020-03-31', NULL, NULL, 'A DEFINIR', 'CDP', 'F45', 'Chiffrage accepté', '', 'X24', 670, 2, 3),
(86, 'GT DATA - chiffrage refusé', 'Stéphane JUBEAU', 'construction de l\'architecture d\'hébergement de l\'application Abus de Marché de Reuters :\r\n\r\napplication 3-Tiers : AS, BDD, ETL\r\n3 environnements : Dev, Homol et Production\r\n\r\n- AS : 4 VM RHEL + Oracle JDK\r\n- ETL : 3 VM RHEL + Oracle JRE\r\n- BDD : 2 LPAR avec BDD Oracle\r\n- publication application Citrix\r\n\r\nCriticité Application : a définir suite retrait de la redondance\r\nPCA/PRA : à definir suite retrait de la redondance\r\n5 utilisateurs\r\nenviron 4 To de stockage', '2020-02-29', '2020-03-31', NULL, NULL, 'A DEFINIR', 'CDP', 'F45', 'Chiffrage accepté', '', 'X24', 670, 2, 3);

-- --------------------------------------------------------

--
-- Structure de la table `Demandes_Perimetres`
--

DROP TABLE IF EXISTS `Demandes_Perimetres`;
CREATE TABLE IF NOT EXISTS `Demandes_Perimetres` (
  `fk_demande_id` int(11) DEFAULT NULL,
  `fk_perimetre_id` int(11) DEFAULT NULL,
  KEY `Demandes_Perimetres_ibfk_1` (`fk_demande_id`),
  KEY `Demandes_Perimetres_ibfk_2` (`fk_perimetre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `etats`
--

DROP TABLE IF EXISTS `Etats`;
CREATE TABLE IF NOT EXISTS `Etats` (
  `id_etat` int(11) NOT NULL AUTO_INCREMENT,
  `nom_etat` varchar(32) NOT NULL,
  PRIMARY KEY (`id_etat`),
  UNIQUE KEY `nom_etat` (`nom_etat`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `etats`
--

INSERT INTO `Etats` (`id_etat`, `nom_etat`) VALUES
(4, 'Chiffrage Accepté'),
(3, 'Demande Chiffrée'),
(1, 'Demande transmise'),
(7, 'Projet Annulé'),
(5, 'Projet en cours'),
(6, 'Projet livré'),
(2, 'Traitement en cours'),
(8, 'Contrat en attente'),
(9, 'Contrat en cours'),
(10, 'Contrat archive');

-- --------------------------------------------------------

--
-- Structure de la table `Ligne_Chiffrages`
--

DROP TABLE IF EXISTS `Ligne_Chiffrages`;
CREATE TABLE IF NOT EXISTS `Ligne_Chiffrages` (
  `id_ligne` int(11) NOT NULL AUTO_INCREMENT,
  `fk_demande_id` int(11) NOT NULL,
  `nom_etape` varchar(250) NOT NULL,
  `nom_sous_etape` varchar(250) NOT NULL,
  `nom_acteur` varchar(250) NOT NULL,
  `nom_grade` varchar(250) NOT NULL,
  `valeur_charge` double NOT NULL,
  `valeur_tjm` double NOT NULL,
  `valeur_total` double NOT NULL,
  `mois_chiffrage` varchar(250) NOT NULL,
  `annee_chiffrage` varchar(250) NOT NULL,
  `remarque` text DEFAULT NULL,
  `fk_avancement_id` int(11) NOT NULL DEFAULT 2,
  PRIMARY KEY (`id_ligne`),
  KEY `fk_demande_id` (`fk_demande_id`),
  KEY `fk_avancement_id` (`fk_avancement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=803 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Ligne_Chiffrages`
--

INSERT INTO `Ligne_Chiffrages` (`id_ligne`, `fk_demande_id`, `nom_etape`, `nom_sous_etape`, `nom_acteur`, `nom_grade`, `valeur_charge`, `valeur_tjm`, `valeur_total`, `remarque`, `fk_avancement_id`) VALUES
(795, 85, 'PRE REQUIS', 'NOMMAGE SRV+BDD', 'COVEA FI', 'B2', 1, 20, 20, NULL, 2),
(796, 85, 'PRE REQUIS', 'CONFIG VM', 'COVEA FI', 'B2', 1, 50, 50, NULL, 2),
(797, 85, 'PRE REQUIS', 'LICENCE OS ET BDD', 'COVEA FI', 'B2', 1, 200, 200, NULL, 2),
(798, 85, 'PREPARATION', 'Etude, chiffrage, validation des pré requis', 'DBA', 'B2', 2, 200, 400, NULL, 2),
(799, 86, 'PRE REQUIS', 'NOMMAGE SRV+BDD', 'COVEA FI', 'B2', 1, 20, 20, NULL, 2),
(800, 86, 'PRE REQUIS', 'CONFIG VM', 'COVEA FI', 'B2', 1, 50, 50, NULL, 2),
(801, 86, 'PRE REQUIS', 'LICENCE OS ET BDD', 'COVEA FI', 'B2', 1, 200, 200, NULL, 2),
(802, 86, 'PREPARATION', 'Etude, chiffrage, validation des pré requis', 'DBA', 'B2', 2, 200, 400, NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `perimetres`
--

DROP TABLE IF EXISTS `Perimetres`;
CREATE TABLE IF NOT EXISTS `Perimetres` (
  `id_perimetre` int(11) NOT NULL AUTO_INCREMENT,
  `nom_perimetre` varchar(32) NOT NULL,
  PRIMARY KEY (`id_perimetre`),
  UNIQUE KEY `nom_perimetre` (`nom_perimetre`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `perimetres`
--

INSERT INTO `Perimetres` (`id_perimetre`, `nom_perimetre`) VALUES
(1, 'Application'),
(9, 'AUTRE'),
(3, 'BDD'),
(2, 'BT/Ordo'),
(6, 'RESEAU'),
(7, 'SAP'),
(8, 'STOCKAGE'),
(4, 'UNIX'),
(5, 'WINDOWS');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE IF NOT EXISTS `Roles` (
  `id_role` int(11) NOT NULL AUTO_INCREMENT,
  `nom_role` varchar(250) NOT NULL,
  `cout_role` int(9) NOT NULL,
  PRIMARY KEY (`id_role`),
  UNIQUE KEY `nom_role` (`nom_role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `Roles` (`id_role`, `nom_role`, `cout_role`) VALUES
(1, 'testcent', 100),
(2, 'testtroiscent', 300),
(3, 'testcinqcent', 500);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `Utilisateurs`;
CREATE TABLE IF NOT EXISTS `Utilisateurs` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_utilisateur` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `prenom_utilisateur` varchar(250) NOT NULL,
  `login_utilisateur` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `nom_entreprise` varchar(32) NOT NULL,
  `mdp_utilisateur` varchar(128) NOT NULL,
  `droit_utilisateur` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `login_utilisateur` (`login_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `Utilisateurs` (`id_utilisateur`, `nom_utilisateur`, `prenom_utilisateur`, `login_utilisateur`, `nom_entreprise`, `mdp_utilisateur`, `droit_utilisateur`) VALUES
(1, 'Al-Sawah', 'Ahmed', 'Admin@capgemini.com', 'Cap Gemini', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 2),
(2, 'Jamme', 'Thomas', 'Client@capgemini.com', 'TRI', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 1),
(36, 'Morane', 'Bob', 'Maurane.Bob@capgemini.com', 'Capgemini', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 3);

---
---Structure table utilisateur charge
---


--
-- Structure de la table `Contrat`
--
DROP TABLE IF EXISTS `Contrats`;
CREATE TABLE IF NOT EXISTS `Contrats` (
  `id_contrat` int(11) NOT NULL AUTO_INCREMENT,
  `nom_contrat` varchar(250) NOT NULL,
  `nom_demandeur` varchar(250) NOT NULL,
  `nom_entreprise` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `code_nop` varchar(32) NOT NULL,
  `reference_client` varchar(32) DEFAULT NULL,
  `reference_interne` varchar(32) DEFAULT NULL,
  `fk_etat_id` int(11) DEFAULT 9,
  `fk_utilisateur_id` int(11) NOT NULL,
  KEY `fk_etat_id` (`fk_etat_id`),
  KEY `fk_utilisateur_id` (`fk_utilisateur_id`),
  PRIMARY KEY (`id_contrat`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
--
-- Déchargement des données de la table `Contrat`
--
INSERT INTO `Contrats` (`id_contrat`, `nom_contrat`, `nom_demandeur`, `nom_entreprise`,`description`,`fk_utilisateur_id`,`fk_etat_id`) VALUES
(1, 'maintenance', 'bob', 'Chanel', 'description_maintenance',1,9),
(2, 'déploiement', 'Alice', 'Chanel', 'description_déploiement',1,9),
(3, 'déploiement', 'AliceBob', 'Chanel', 'description_déploiement',1,10);
--
-- Structure de la table `Ligne_Contrats`
--
DROP TABLE IF EXISTS `Ligne_Contrats`;
CREATE TABLE IF NOT EXISTS `Ligne_Contrats` (
  `id_ligne` int(11) NOT NULL AUTO_INCREMENT,
  `fk_contrat_id` int(11) NOT NULL,
  `nom_phase` varchar(250) NOT NULL,
  `nom_tache` varchar(250) NOT NULL,
  `nom_entite` varchar(250) NOT NULL,
  `date_debut` date DEFAULT NULL,
  `date_demarrage` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `charge_total` int(11),
  PRIMARY KEY (`id_ligne`),
  KEY `fk_contrat_id` (`fk_contrat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
--
-- Déchargement des données de la table `Ligne_Contrats`
--
INSERT INTO `Ligne_Contrats` (`id_ligne`, `fk_contrat_id`, `nom_phase`, `nom_tache`, `nom_entite`, `date_debut`, `date_demarrage`, `date_fin`, `charge_total`) VALUES
(20, 1, 'PRE REQUIS', 'NOMMAGE SRV+BDD', 'COVEA FI',NOW(),NOW(),NOW(),3),
(25, 2, 'PRE REQUIS', 'CONFIG VM', 'COVEA FI',NOW(),NOW(),NOW(),5);

--
-- Structure de la table `ligne_Contrats_Utilisateurs`
--
DROP TABLE IF EXISTS `ligne_Contrats_Utilisateurs`;
CREATE TABLE IF NOT EXISTS `ligne_Contrats_Utilisateurs` (
  `fk_ligne_id` int(11) DEFAULT NULL,
  `fk_utilisateur_id` int(11) DEFAULT NULL,
  `fk_roles_id` int(11) DEFAULT NULL,
  `valeur_charge` double NOT NULL,
  `mois_charge` varchar(250) NOT NULL,
  `annee_charge` varchar(250) NOT NULL,
  KEY `Ligne_Contrats_Utilisateurs_ibfk_1` (`fk_ligne_id`),
  KEY `Ligne_Contrats_Utilisateurs_ibfk_2` (`fk_utilisateur_id`),
  KEY `Ligne_Contrats_Utilisateurs_ibfk_3` (`fk_roles_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Structure de la table `UtilisateursCharge`
--
DROP TABLE IF EXISTS `UtilisateursCharge`;
CREATE TABLE IF NOT EXISTS `UtilisateursCharge` (
  `id_utilisateurcharge` int(11) NOT NULL AUTO_INCREMENT,
  `fk_utilisateur_id` int(11) NOT NULL,
  `janvier_charge` int (11) NOT NULL DEFAULT 0,
  `fevrier_charge` int (11) NOT NULL DEFAULT 0,
  `mars_charge` int (11) NOT NULL DEFAULT 0,
  `avril_charge` int (11) NOT NULL DEFAULT 0,
  `mai_charge` int (11) NOT NULL DEFAULT 0,
  `juin_charge` int (11) NOT NULL DEFAULT 0,
  `juillet_charge` int (11) NOT NULL DEFAULT 0,
  `aout_charge` int (11) NOT NULL DEFAULT 0,
  `septembre_charge` int (11) NOT NULL DEFAULT 0,
  `octobre_charge` int (11) NOT NULL DEFAULT 0,
  `novembre_charge` int (11) NOT NULL DEFAULT 0,
  `decembre_charge` int (11) NOT NULL DEFAULT 0,
  `annee_charge` varchar(100) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_utilisateurcharge`),
  KEY `fk_utilisateur_id` (`fk_utilisateur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `UtilisateursCharge`
--
INSERT INTO `UtilisateursCharge` (`id_utilisateurcharge`, `fk_utilisateur_id`, `janvier_charge`, `fevrier_charge`, `mars_charge`, `avril_charge`, `mai_charge`, `juin_charge`, `juillet_charge`, `aout_charge`, `septembre_charge`, `octobre_charge`, `novembre_charge`, `decembre_charge`, `annee_charge`) VALUES
(1, 1, 10, 12, 16, 21, 5, 8, 2, 23, 27, 16, 19, 21, '2021'),
(2, 2, 11, 12, 21, 21, 23, 12, 5, 9, 16, 21, 22, 18, '2021');

---INSERT INTO `UtilisateursCharge` (`fk_utilisateur_id`, `janvier_charge`, `annee_charge`) VALUES (1, 1, '2021'), (1, 1, '2021');
--
-- Contraintes pour les tables déchargées
--
--
-- Contraintes pour la table `Ligne_Contrats`
--
ALTER TABLE `Ligne_Contrats`
  ADD CONSTRAINT `Ligne_Contrats_ibfk_1` FOREIGN KEY (`fk_contrat_id`) REFERENCES `Contrats` (`id_contrat`) ON DELETE CASCADE ON UPDATE CASCADE;

 --
-- Contraintes pour la table `ligne_Contrats_Utilisateurs`
--
ALTER TABLE `ligne_Contrats_Utilisateurs`
  ADD CONSTRAINT `Ligne_Contrats_Utilisateurs_ibfk_1` FOREIGN KEY (`fk_ligne_id`) REFERENCES `Ligne_Contrats` (`id_ligne`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Ligne_Contrats_Utilisateurs_ibfk_2` FOREIGN KEY (`fk_utilisateur_id`) REFERENCES `Utilisateurs` (`id_utilisateur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Ligne_Contrats_Utilisateurs_ibfk_3` FOREIGN KEY (`fk_roles_id`) REFERENCES `Roles` (`id_role`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Contraintes pour la table `demandes`
--
ALTER TABLE `Demandes`
  ADD CONSTRAINT `Demandes_ibfk_1` FOREIGN KEY (`fk_utilisateur_id`) REFERENCES `Utilisateurs` (`id_utilisateur`),
  ADD CONSTRAINT `Demandes_ibfk_2` FOREIGN KEY (`fk_etat_id`) REFERENCES `Etats` (`id_etat`);

--
-- Contraintes pour la table `Demandes_Perimetres`
--
ALTER TABLE `Demandes_Perimetres`
  ADD CONSTRAINT `Demandes_Perimetres_ibfk_1` FOREIGN KEY (`fk_demande_id`) REFERENCES `Demandes` (`id_demande`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Demandes_Perimetres_ibfk_2` FOREIGN KEY (`fk_perimetre_id`) REFERENCES `Perimetres` (`id_perimetre`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Ligne_Chiffrages`
--
ALTER TABLE `Ligne_Chiffrages`
  ADD CONSTRAINT `Ligne_Chiffrages_ibfk_1` FOREIGN KEY (`fk_demande_id`) REFERENCES `Demandes` (`id_demande`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Ligne_Chiffrages_ibfk_2` FOREIGN KEY (`fk_avancement_id`) REFERENCES `Avancements` (`id_avancement`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `UtilisateursCharge`
--

ALTER TABLE `UtilisateursCharge`
  ADD CONSTRAINT `UtilisateursCharge_ibfk_1` FOREIGN KEY (`fk_utilisateur_id`) REFERENCES `Utilisateurs` (`id_utilisateur`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Contraintes pour la table `Contrats`
--
ALTER TABLE `Contrats`
  ADD CONSTRAINT `Contrats_ibfk_1` FOREIGN KEY (`fk_utilisateur_id`) REFERENCES `Utilisateurs` (`id_utilisateur`),
  ADD CONSTRAINT `Contrats_ibfk_2` FOREIGN KEY (`fk_etat_id`) REFERENCES `Etats` (`id_etat`);


INSERT INTO `ligne_Contrats_Utilisateurs` (`fk_ligne_id`, `fk_utilisateur_id`, `valeur_charge`) VALUES ('20', '1', '20'), ('20', '2', '30');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
