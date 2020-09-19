/*
 Navicat Premium Data Transfer

 Source Server         : mpako
 Source Server Type    : MariaDB
 Source Server Version : 100410
 Source Host           : localhost:3306
 Source Schema         : ngds

 Target Server Type    : MariaDB
 Target Server Version : 100410
 File Encoding         : 65001

 Date: 19/09/2020 15:29:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for agent
-- ----------------------------
DROP TABLE IF EXISTS `agent`;
CREATE TABLE `agent`  (
  `id_agent` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `prenom` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `matricule` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_fonction` int(11) NOT NULL,
  `sexe` enum('feminin','masculin') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `login` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_site` int(11) NULL DEFAULT NULL,
  `peutTaxer` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'false',
  `peutApurer` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'false',
  `peutEncoder` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'false',
  `peutOrdonnancer` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'false',
  `peutAdministrer` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'false',
  `peutFaireRapport` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'false',
  `peutImprimer` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'false',
  `peutSite` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'false',
  `peutStock` enum('true','false') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT 'false',
  `active` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'true',
  `slug` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `date_creation` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id_agent`) USING BTREE,
  INDEX `id_fonction`(`id_fonction`) USING BTREE,
  INDEX `id_site`(`id_site`) USING BTREE,
  CONSTRAINT `agent_ibfk_1` FOREIGN KEY (`id_fonction`) REFERENCES `fonction` (`id_fonction`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `agent_ibfk_2` FOREIGN KEY (`id_site`) REFERENCES `site` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of agent
-- ----------------------------
INSERT INTO `agent` VALUES (18, 'MALONDA', 'Merdi', '90031', 1, 'masculin', 'merdi-90031', '$2a$12$XIgmBGSRNwVVcV.3P4GADetPyLFcNE97UVz3Q1gBVyauDhCwVKYDa', 41, 'false', 'false', 'false', 'false', 'false', 'false', 'true', 'true', 'true', 'true', 'merdi-malonda-90031', '2020-09-06 02:11:36');
INSERT INTO `agent` VALUES (19, 'EKILA', 'nono', '90032', 1, 'masculin', 'merdi-90032', '$2a$12$Z9dHg4dkKKsrfseCHMOvQepzBVWkFDIfgmtRCbTmuIUm.vp5OlpaC', 41, 'false', 'false', 'false', 'false', 'false', 'false', 'true', 'true', 'true', 'false', 'merdi-malonda-90032', '2020-09-08 07:23:36');

-- ----------------------------
-- Table structure for arrete
-- ----------------------------
DROP TABLE IF EXISTS `arrete`;
CREATE TABLE `arrete`  (
  `id_arrete` int(11) NOT NULL AUTO_INCREMENT,
  `fonction` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `signataire` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `id_exercice` int(11) NOT NULL,
  `id_taxe` int(11) NOT NULL,
  `unite_delai` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `numero_arrete` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `date` date NOT NULL,
  `date_finale_paiement` date NOT NULL,
  `delai` int(11) NOT NULL,
  `libelle` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_arrete`) USING BTREE,
  INDEX `fk_tblarrete_tblexercice1_idx`(`id_exercice`) USING BTREE,
  INDEX `fk_tblarrete_tbltaxe1_idx`(`id_taxe`) USING BTREE,
  CONSTRAINT `fk_tblarrete_tblexercice1` FOREIGN KEY (`id_exercice`) REFERENCES `exercice` (`id_exercice`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tblarrete_tbltaxe1` FOREIGN KEY (`id_taxe`) REFERENCES `taxe` (`id_taxe`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of arrete
-- ----------------------------
INSERT INTO `arrete` VALUES (1, 'CHEFs DE SERVICE URBAIN DE TRANSPORT', 'MASSANGU YOLOLA CHARLES', 1, 1, 'JOURS', '021', '2015-01-26', '2015-12-31', 7, 'ARRETE URBAIN NÂ° 021/BUR-MAIRE/VILLE/L\'SHI/2014 du 22/02/2014 PORTANT FIXATION DU TAUX ET DES TAXES SUR :STATIONNEMENT DANS LA VILLE DE LUBUMBASHI');
INSERT INTO `arrete` VALUES (2, 'LE CHEF DE SERVICE URBAIN DE IPMEA', 'NÂ° 13/0013 du 23 fÃ©vrier 2013', 1, 2, 'jours', '011', '2015-01-30', '2015-12-31', 7, 'ARRETE URBAIN NÂ° 008/BUR-MAIRE/VILLE/L\'SHI/2015 DUB 17/02/2015 PORTANT PERCEPTION ET FIXATION DES TAUX DE PRODUITS DE VENTE DES FICHES DE RECENSEMENT DES PME DANS LA VILLE DE LUBUMBASHI');
INSERT INTO `arrete` VALUES (3, 'LE CHEF DE SERCVICE URBAIN DE TRANSPORT', 'MASANGU YOLOLA CHARLES', 1, 3, 'JOURS', 'Ord loi nÂ° 13/001 du 13 juillet 2011', '2015-02-19', '2015-12-31', 7, 'ARRETE URBAIN NÃ‚Â° 011/BUR-MAIRE/VILLE/L\'SHI/2015 DU 19/02/2015 PORTANT FIXATION DU TAUX DE LA TAXE SUR L\'AUTORISATION ANNUELLE DE TRANSPORT URBAIN DANS LA VILLE DE LUBUMBASHI');
INSERT INTO `arrete` VALUES (4, 'LE CHEF DE SERVICE URBAIN DE TRANSPORT', 'MASSANGU YOLOLA', 1, 13, 'JOURS', 'ORD LOI 0013/001 DU 22 FEVRIER 2015', '2015-01-01', '2015-12-31', 7, 'ARRETE URBAIN NÂ° 012/BUR-MAIRE/VILLE/LSHI/2015 DU 19/02/2015 PORTANT FIXATION DE LA TAXE SUR LA NUMEROTATION DE MOYEN DE TRANSPORT EN COMMUN DANS LA VILLE DE LUBUMBASHI');
INSERT INTO `arrete` VALUES (5, 'LE CHEF DE SERVICE URBAIN DE L\'IPMEA', '.........', 1, 14, 'JOURS', '017/BUR-MAIRE/VILLE/L\'SHI/2015', '2015-02-17', '2015-12-31', 7, 'ARRETE URBAIN NÂ° 017/BUR-MAIRE/VILLE/L\'SHI/2015 DU 17/02/2015 PORTANT FIXATION DES TAUX DE LA TAXE SPECIFIQUE RELATIVE AU RECENSEMENT ANNUEL DES PETITES ET MOYENNES INDUSTRIES DANS LA VILLE DE LUBUMBASHI');
INSERT INTO `arrete` VALUES (6, 'ORDONNATEUR DE LA NOTE', 'MUKUNA KALOMBO', 1, 15, 'Jours', '14102/AEC/TECG', '2016-01-01', '2016-06-30', 7, 'TEST3');
INSERT INTO `arrete` VALUES (7, 'CHEF DE SERVICE', 'MUKOLO MUNA', 1, 16, 'Jours', 'Ord loi nÂ° 13/001 du 13 janvier 2020', '2019-10-03', '2019-10-11', 7, 'Ord loi nÂ° 13/001 du 13 juillet 2011');
INSERT INTO `arrete` VALUES (8, 'PREMIER MINISTRE', 'ILUNGA ILKAMBA', 1, 7, 'Jours', 'Ordonnance Loi nÂ° 3520/A', '2018-07-04', '2019-12-31', 7, 'LibellÃ©');
INSERT INTO `arrete` VALUES (9, 'CHEF DE DIVISION', '.', 1, 17, 'Jour', 'Ordonnance Loi 452/B', '2019-02-05', '2020-12-31', 7, 'LIBELLE');

-- ----------------------------
-- Table structure for article_budgetaire
-- ----------------------------
DROP TABLE IF EXISTS `article_budgetaire`;
CREATE TABLE `article_budgetaire`  (
  `id_article_budgetaire` int(11) NOT NULL AUTO_INCREMENT,
  `id_type_objet` int(11) NOT NULL,
  `designation` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_article_budgetaire`) USING BTREE,
  INDEX `fk_tblArticleBudgetaire_tblTypeObjet2`(`id_type_objet`) USING BTREE,
  CONSTRAINT `fk_tblArticleBudgetaire_tblTypeObjet2` FOREIGN KEY (`id_type_objet`) REFERENCES `type_objet` (`id_type_objet`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_budgetaire
-- ----------------------------
INSERT INTO `article_budgetaire` VALUES (1, 1, 'VOITURE', '');
INSERT INTO `article_budgetaire` VALUES (2, 1, 'JEEP', '');
INSERT INTO `article_budgetaire` VALUES (3, 1, 'MINI-BUS', '');
INSERT INTO `article_budgetaire` VALUES (4, 1, 'PICK-UP', '');
INSERT INTO `article_budgetaire` VALUES (5, 1, 'CAMIONNETTE', '');
INSERT INTO `article_budgetaire` VALUES (6, 1, 'BUS (+36 personnes)', '');
INSERT INTO `article_budgetaire` VALUES (7, 1, 'CAMION 5-9T', '');
INSERT INTO `article_budgetaire` VALUES (8, 1, 'BUS (+50 PERSONNES)', '');
INSERT INTO `article_budgetaire` VALUES (9, 1, 'CAMION 10 - 19 T', '');
INSERT INTO `article_budgetaire` VALUES (10, 1, 'POIDS LOURD', '');
INSERT INTO `article_budgetaire` VALUES (11, 1, 'ENGINS LOURDS DE GENIE CIVIL', '');
INSERT INTO `article_budgetaire` VALUES (12, 3, 'ENTREPRISE', '');
INSERT INTO `article_budgetaire` VALUES (13, 1, 'Jeep\'', '');
INSERT INTO `article_budgetaire` VALUES (14, 1, 'VOITURE TAXI', '');
INSERT INTO `article_budgetaire` VALUES (15, 1, 'AUTO CAMIONNETTE', '');
INSERT INTO `article_budgetaire` VALUES (16, 1, 'AUTO PICK-UP', '');
INSERT INTO `article_budgetaire` VALUES (17, 1, 'AUTO MINIBUS EXPLOITANT', '');
INSERT INTO `article_budgetaire` VALUES (18, 1, 'AUTO CAMION 5-9T', '');
INSERT INTO `article_budgetaire` VALUES (19, 1, 'AUTO CAMION 10-19T', '');
INSERT INTO `article_budgetaire` VALUES (20, 1, 'AUTO BUS', '');
INSERT INTO `article_budgetaire` VALUES (21, 1, 'AUTO MOTO', '');
INSERT INTO `article_budgetaire` VALUES (22, 1, 'NUMEROTATATION MINI-BUS', '');
INSERT INTO `article_budgetaire` VALUES (23, 1, 'NUMEROTATION VOITURE TAXI', '');
INSERT INTO `article_budgetaire` VALUES (24, 1, 'NUMEROTATION MOTO', '');
INSERT INTO `article_budgetaire` VALUES (25, 3, 'ASSOCIATION cat A.', '');
INSERT INTO `article_budgetaire` VALUES (26, 3, 'ASSOCIATION Cat B', '');
INSERT INTO `article_budgetaire` VALUES (27, 3, 'CONFEDERATIONS Cat A', '');
INSERT INTO `article_budgetaire` VALUES (28, 3, 'CONFEDERATIONS Cat B', '');
INSERT INTO `article_budgetaire` VALUES (29, 3, 'FEDERATIONS Cat. A', '');
INSERT INTO `article_budgetaire` VALUES (30, 3, 'FEDERATIONS Cat. B', '');
INSERT INTO `article_budgetaire` VALUES (31, 3, 'CORPORATIONS Cat. A', '');
INSERT INTO `article_budgetaire` VALUES (32, 3, 'CORPORATIONS Cat. B', '');
INSERT INTO `article_budgetaire` VALUES (33, 3, 'COOPERATIVES Cat. A', '');
INSERT INTO `article_budgetaire` VALUES (34, 3, 'COOPERATIVES Cat. B', '');
INSERT INTO `article_budgetaire` VALUES (35, 3, 'Mson,Centre,Garage,Atelier et ONG Cat. A', '');
INSERT INTO `article_budgetaire` VALUES (36, 3, 'Mson,Centre,Garage,Atelier et ONG Cat. B', '');
INSERT INTO `article_budgetaire` VALUES (37, 3, 'Bur,Sec Pub, service d\'encadrement Cat. A', '');
INSERT INTO `article_budgetaire` VALUES (38, 3, 'Bur,Sec Pub, service d\'encadrement Cat. B', '');
INSERT INTO `article_budgetaire` VALUES (39, 3, 'SERVICES PUBLICITAIRES Cat. A', '');
INSERT INTO `article_budgetaire` VALUES (40, 3, 'SERVICES PUBLICITAIRES Cat. B', '');
INSERT INTO `article_budgetaire` VALUES (41, 3, 'LOISIRS ET DIVERTISSEMENTS', '');
INSERT INTO `article_budgetaire` VALUES (42, 3, 'REGIME DE LA PATENTE', '');
INSERT INTO `article_budgetaire` VALUES (43, 3, 'RECENSEMENT  PERSONNE MORALE', '');
INSERT INTO `article_budgetaire` VALUES (44, 3, 'RECENSEMENT  PERSONNE PHYSIQUE', '');
INSERT INTO `article_budgetaire` VALUES (45, 3, 'PMI CATEGORIE A1', '');
INSERT INTO `article_budgetaire` VALUES (46, 3, 'PMI CATEGORIE A2', '');
INSERT INTO `article_budgetaire` VALUES (47, 3, 'PMI CATEGORIE B1', '');
INSERT INTO `article_budgetaire` VALUES (48, 3, 'PMI CATEGORIE B2', '');
INSERT INTO `article_budgetaire` VALUES (49, 3, 'PMI CATEGORIE C1', '');
INSERT INTO `article_budgetaire` VALUES (50, 3, 'PMI CATEGORIE C2', '');
INSERT INTO `article_budgetaire` VALUES (51, 3, 'PMI CATEGORIE D', '');
INSERT INTO `article_budgetaire` VALUES (52, 3, 'ARTICLE B1', '');
INSERT INTO `article_budgetaire` VALUES (53, 3, 'ARTICLE B2', '');
INSERT INTO `article_budgetaire` VALUES (54, 2, 'PERSONNE A1', '');
INSERT INTO `article_budgetaire` VALUES (55, 4, 'PATENTE CATEGORIE B', '');
INSERT INTO `article_budgetaire` VALUES (56, 4, 'PATENTE CATEGORIE A', '');
INSERT INTO `article_budgetaire` VALUES (57, 4, 'PATENTE CATEGORIE C', 'PATENTE COMMERCIALE');
INSERT INTO `article_budgetaire` VALUES (58, 4, 'PATENTE CATEOGIRE D', '');

-- ----------------------------
-- Table structure for attestation
-- ----------------------------
DROP TABLE IF EXISTS `attestation`;
CREATE TABLE `attestation`  (
  `id_attestation` int(11) NOT NULL AUTO_INCREMENT,
  `date_attestation` date NULL DEFAULT NULL,
  `numero_bordereau` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_taxation` int(11) NOT NULL,
  `montant` int(11) NULL DEFAULT NULL,
  `montant_penalite` int(11) NULL DEFAULT NULL,
  `montant_global` int(11) NULL DEFAULT NULL,
  `avis` enum('favorable','defavorable') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'favorable',
  `active` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'true',
  `id_agent` int(11) NOT NULL,
  `id_site` int(11) NOT NULL,
  `date_creation` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id_attestation`) USING BTREE,
  INDEX `id_agent`(`id_agent`) USING BTREE,
  INDEX `id_site`(`id_site`) USING BTREE,
  INDEX `attestation_ibfk_1`(`id_taxation`) USING BTREE,
  CONSTRAINT `attestation_ibfk_1` FOREIGN KEY (`id_taxation`) REFERENCES `taxation` (`id_taxation`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `attestation_ibfk_2` FOREIGN KEY (`id_agent`) REFERENCES `agent` (`id_agent`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `attestation_ibfk_3` FOREIGN KEY (`id_site`) REFERENCES `site` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attestation
-- ----------------------------
INSERT INTO `attestation` VALUES (14, '2020-09-01', 'zzazaz', 55, 25000, NULL, 27500, 'favorable', 'true', 18, 41, '2020-09-18 16:54:42');
INSERT INTO `attestation` VALUES (15, '2020-08-31', 'azazazaz', 55, 25000, 2500, 27500, 'favorable', 'true', 18, 41, '2020-09-18 17:05:31');
INSERT INTO `attestation` VALUES (16, '2020-08-31', 'azazazaz', 55, 25000, 2500, 27500, 'favorable', 'true', 18, 41, '2020-09-18 17:06:18');

-- ----------------------------
-- Table structure for banque
-- ----------------------------
DROP TABLE IF EXISTS `banque`;
CREATE TABLE `banque`  (
  `id_banque` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_banque` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `active` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'true',
  PRIMARY KEY (`id_banque`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banque
-- ----------------------------
INSERT INTO `banque` VALUES (1, 'FIBANK', 'true');
INSERT INTO `banque` VALUES (2, 'SFIBANK', 'true');
INSERT INTO `banque` VALUES (3, 'FIBANK', 'true');
INSERT INTO `banque` VALUES (4, 'FIBANK', 'true');
INSERT INTO `banque` VALUES (5, 'PROCEDIT', 'true');

-- ----------------------------
-- Table structure for categorie
-- ----------------------------
DROP TABLE IF EXISTS `categorie`;
CREATE TABLE `categorie`  (
  `id_categorie` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_categorie`) USING BTREE,
  UNIQUE INDEX `designation_UNIQUE`(`designation`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categorie
-- ----------------------------
INSERT INTO `categorie` VALUES (1, 'SOCIETE', NULL);
INSERT INTO `categorie` VALUES (2, 'PRIVE', NULL);
INSERT INTO `categorie` VALUES (3, 'COMMERCIALE', NULL);
INSERT INTO `categorie` VALUES (4, 'ARTISANALE', NULL);

-- ----------------------------
-- Table structure for categorie_detail_tarif
-- ----------------------------
DROP TABLE IF EXISTS `categorie_detail_tarif`;
CREATE TABLE `categorie_detail_tarif`  (
  `idCategorie` int(11) NOT NULL AUTO_INCREMENT,
  `id_compte` int(11) NOT NULL,
  `designation` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idCategorie`) USING BTREE,
  INDEX `fk_tblcategorie_detail_tarif_tblcompte1_idx`(`id_compte`) USING BTREE,
  CONSTRAINT `fk_tblcategorie_detail_tarif_tblcompte1` FOREIGN KEY (`id_compte`) REFERENCES `compte` (`id_compte`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categorie_detail_tarif
-- ----------------------------

-- ----------------------------
-- Table structure for commune
-- ----------------------------
DROP TABLE IF EXISTS `commune`;
CREATE TABLE `commune`  (
  `id_commune` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_commune` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_district` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id_commune`) USING BTREE,
  INDEX `id_district`(`id_district`) USING BTREE,
  CONSTRAINT `commune_ibfk_1` FOREIGN KEY (`id_district`) REFERENCES `district` (`id_district`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of commune
-- ----------------------------
INSERT INTO `commune` VALUES (1, 'Bandalungwa', 1);
INSERT INTO `commune` VALUES (2, 'Barumbu', 2);
INSERT INTO `commune` VALUES (3, 'Bumbu', 1);
INSERT INTO `commune` VALUES (4, 'Gombe', 2);
INSERT INTO `commune` VALUES (5, 'Masina', 4);
INSERT INTO `commune` VALUES (6, 'Matete', 3);
INSERT INTO `commune` VALUES (7, 'Ndjili', 4);
INSERT INTO `commune` VALUES (8, 'Kimbanseke', 4);
INSERT INTO `commune` VALUES (9, 'Maluku', 4);
INSERT INTO `commune` VALUES (10, 'Nsele', 4);
INSERT INTO `commune` VALUES (11, 'Kasa Vubu', 1);
INSERT INTO `commune` VALUES (12, 'Ngiri-Ngiri', 1);
INSERT INTO `commune` VALUES (13, 'Kalamu', 1);
INSERT INTO `commune` VALUES (14, 'Ngaliema', 2);
INSERT INTO `commune` VALUES (15, 'Kinshasa', 2);
INSERT INTO `commune` VALUES (16, 'Lingwala', 2);
INSERT INTO `commune` VALUES (17, 'Mont-Ngafula', 2);
INSERT INTO `commune` VALUES (18, 'Selembao', 1);
INSERT INTO `commune` VALUES (19, 'Kintambo', 2);
INSERT INTO `commune` VALUES (20, 'Limete', 3);
INSERT INTO `commune` VALUES (21, 'Lemba', 3);
INSERT INTO `commune` VALUES (22, 'Makala', 1);
INSERT INTO `commune` VALUES (23, 'Ngaba', 3);
INSERT INTO `commune` VALUES (24, 'Kisenso', 3);
INSERT INTO `commune` VALUES (32, 'test', 2);
INSERT INTO `commune` VALUES (33, 'test', 1);
INSERT INTO `commune` VALUES (34, 'test 2', 1);
INSERT INTO `commune` VALUES (35, 'test 2', 1);

-- ----------------------------
-- Table structure for compte
-- ----------------------------
DROP TABLE IF EXISTS `compte`;
CREATE TABLE `compte`  (
  `id_compte` int(11) NOT NULL AUTO_INCREMENT,
  `num_compte` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `id_banque` int(11) NOT NULL,
  `devise` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id_compte`) USING BTREE,
  INDEX `id_banque`(`id_banque`) USING BTREE,
  CONSTRAINT `compte_ibfk_1` FOREIGN KEY (`id_banque`) REFERENCES `banque` (`id_banque`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of compte
-- ----------------------------
INSERT INTO `compte` VALUES (1, '330 0072 7702-53 CDF', 1, 'CDF');
INSERT INTO `compte` VALUES (2, '330 0072 7701-56 USD', 2, 'USD');
INSERT INTO `compte` VALUES (3, '43100727703-48 CDF', 3, 'CDF');
INSERT INTO `compte` VALUES (4, '43100727704-45', 4, 'USD');
INSERT INTO `compte` VALUES (5, 'XXXX-XXXXX-0001', 5, 'CDF');

-- ----------------------------
-- Table structure for contribuable
-- ----------------------------
DROP TABLE IF EXISTS `contribuable`;
CREATE TABLE `contribuable`  (
  `id_contribuable` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telephone` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `ville` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `id_district` int(11) NULL DEFAULT NULL,
  `id_commune` int(11) NULL DEFAULT NULL,
  `id_quartier` int(11) NULL DEFAULT NULL,
  `avenue` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `numero` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `date_creation` datetime(0) NULL DEFAULT NULL,
  `active` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'true',
  `id_site` int(11) NULL DEFAULT NULL,
  `id_agent` int(11) NULL DEFAULT NULL,
  `observation` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_contribuable`) USING BTREE,
  INDEX `id_district`(`id_district`) USING BTREE,
  INDEX `id_commune`(`id_commune`) USING BTREE,
  INDEX `id_quartier`(`id_quartier`) USING BTREE,
  INDEX `id_site`(`id_site`) USING BTREE,
  INDEX `id_agent`(`id_agent`) USING BTREE,
  CONSTRAINT `contribuable_ibfk_1` FOREIGN KEY (`id_district`) REFERENCES `district` (`id_district`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `contribuable_ibfk_2` FOREIGN KEY (`id_commune`) REFERENCES `commune` (`id_commune`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `contribuable_ibfk_3` FOREIGN KEY (`id_quartier`) REFERENCES `quartier` (`id_quartier`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `contribuable_ibfk_4` FOREIGN KEY (`id_site`) REFERENCES `site` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `contribuable_ibfk_5` FOREIGN KEY (`id_agent`) REFERENCES `agent` (`id_agent`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contribuable
-- ----------------------------
INSERT INTO `contribuable` VALUES (22, 'EKMU Nono', '+243852058798', 'Kinshasa', 2, 14, 146, 'kadima', '8', '2020-09-15 14:58:17', 'true', 41, 18, '');
INSERT INTO `contribuable` VALUES (23, 'nsoki akanda jp', '+243', 'Kinshasa', 3, 6, 342, 'songo', '48', '2020-09-15 19:13:24', 'true', 41, 18, '');

-- ----------------------------
-- Table structure for detail_tarif
-- ----------------------------
DROP TABLE IF EXISTS `detail_tarif`;
CREATE TABLE `detail_tarif`  (
  `id_detail` int(11) NOT NULL AUTO_INCREMENT,
  `id_categorie_tarif` int(11) NOT NULL,
  `designation` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_detail`) USING BTREE,
  INDEX `fk_tbldetail_tarif_tblcategorie_detail_tarif1_idx`(`id_categorie_tarif`) USING BTREE,
  CONSTRAINT `fk_tbldetail_tarif_tblcategorie_detail_tarif1` FOREIGN KEY (`id_categorie_tarif`) REFERENCES `categorie_detail_tarif` (`idCategorie`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detail_tarif
-- ----------------------------

-- ----------------------------
-- Table structure for detail_taxation
-- ----------------------------
DROP TABLE IF EXISTS `detail_taxation`;
CREATE TABLE `detail_taxation`  (
  `id_detail_taxation` int(11) NOT NULL AUTO_INCREMENT,
  `id_taxation` int(11) NOT NULL,
  `id_vehicule` int(11) NOT NULL,
  `montant` double(11, 0) NULL DEFAULT NULL,
  `devise` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_detail_taxation`) USING BTREE,
  INDEX `id_taxation`(`id_taxation`) USING BTREE,
  INDEX `id_vehicule`(`id_vehicule`) USING BTREE,
  CONSTRAINT `detail_taxation_ibfk_1` FOREIGN KEY (`id_taxation`) REFERENCES `taxation` (`id_taxation`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `detail_taxation_ibfk_2` FOREIGN KEY (`id_vehicule`) REFERENCES `vehicule` (`id_vehicule`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detail_taxation
-- ----------------------------
INSERT INTO `detail_taxation` VALUES (19, 55, 16, 25000, 'CDF');
INSERT INTO `detail_taxation` VALUES (22, 58, 16, 25000, 'CDF');
INSERT INTO `detail_taxation` VALUES (23, 59, 17, 95, 'USD');
INSERT INTO `detail_taxation` VALUES (24, 60, 17, 25000, 'CDF');

-- ----------------------------
-- Table structure for district
-- ----------------------------
DROP TABLE IF EXISTS `district`;
CREATE TABLE `district`  (
  `id_district` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_district` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_district`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of district
-- ----------------------------
INSERT INTO `district` VALUES (1, 'Funa');
INSERT INTO `district` VALUES (2, 'Lukunga');
INSERT INTO `district` VALUES (3, 'Mont Amba');
INSERT INTO `district` VALUES (4, 'Tshangu');
INSERT INTO `district` VALUES (5, 'kambaaaa');
INSERT INTO `district` VALUES (6, 'test');

-- ----------------------------
-- Table structure for document_mvt
-- ----------------------------
DROP TABLE IF EXISTS `document_mvt`;
CREATE TABLE `document_mvt`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_document_taxe` int(11) NOT NULL,
  `id_agent` int(11) NOT NULL,
  `type_mvt` int(11) NOT NULL,
  `date_save` datetime(0) NOT NULL,
  `date_mvt` datetime(0) NOT NULL,
  `qte` int(11) NOT NULL,
  `qte_logique` int(11) NULL DEFAULT NULL,
  `observation` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `date_cancel` datetime(0) NULL DEFAULT NULL,
  `id_agent_cancel` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_tbldocument_mvt_tbltaxe1_idx`(`id_document_taxe`) USING BTREE,
  INDEX `fk_tbldocument_mvt_tblagent1_idx`(`id_agent`) USING BTREE,
  INDEX `fk_tbldocument_mvt_tblagent2_idx`(`id_agent_cancel`) USING BTREE,
  CONSTRAINT `fk_tbldocument_mvt_tblagent1` FOREIGN KEY (`id_agent`) REFERENCES `agent` (`id_agent`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbldocument_mvt_tblagent2` FOREIGN KEY (`id_agent_cancel`) REFERENCES `agent` (`id_agent`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbldocument_mvt_tbltaxe1` FOREIGN KEY (`id_document_taxe`) REFERENCES `taxe` (`id_taxe`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of document_mvt
-- ----------------------------

-- ----------------------------
-- Table structure for exercice
-- ----------------------------
DROP TABLE IF EXISTS `exercice`;
CREATE TABLE `exercice`  (
  `id_exercice` int(11) NOT NULL AUTO_INCREMENT,
  `annee` int(11) NOT NULL,
  `date_creation` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id_exercice`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exercice
-- ----------------------------
INSERT INTO `exercice` VALUES (1, 2020, '2020-09-10 14:02:09');

-- ----------------------------
-- Table structure for fonction
-- ----------------------------
DROP TABLE IF EXISTS `fonction`;
CREATE TABLE `fonction`  (
  `id_fonction` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_fonction` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_fonction`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fonction
-- ----------------------------
INSERT INTO `fonction` VALUES (1, 'administrateur');
INSERT INTO `fonction` VALUES (2, 'taxateur');
INSERT INTO `fonction` VALUES (3, 'inspecteur');
INSERT INTO `fonction` VALUES (4, 'encodeur');
INSERT INTO `fonction` VALUES (5, 'operateur Saisie');
INSERT INTO `fonction` VALUES (6, 'IT assistant');

-- ----------------------------
-- Table structure for logging
-- ----------------------------
DROP TABLE IF EXISTS `logging`;
CREATE TABLE `logging`  (
  `idLogging` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `value` longblob NULL,
  `date` datetime(0) NULL DEFAULT NULL,
  `typeObject` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `operation` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `dateConnexion` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `dateDeConnexion` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idLogging`) USING BTREE,
  INDEX `fk_tblLogging_tblAgent1_idx`(`idUser`) USING BTREE,
  CONSTRAINT `fk_tblLogging_tblAgent1` FOREIGN KEY (`idUser`) REFERENCES `agent` (`id_agent`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 122 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of logging
-- ----------------------------

-- ----------------------------
-- Table structure for quartier
-- ----------------------------
DROP TABLE IF EXISTS `quartier`;
CREATE TABLE `quartier`  (
  `id_quartier` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_quartier` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_commune` int(11) NOT NULL,
  PRIMARY KEY (`id_quartier`) USING BTREE,
  INDEX `id_commune`(`id_commune`) USING BTREE,
  CONSTRAINT `quartier_ibfk_1` FOREIGN KEY (`id_commune`) REFERENCES `commune` (`id_commune`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 615 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of quartier
-- ----------------------------
INSERT INTO `quartier` VALUES (1, 'à préciser', 5);
INSERT INTO `quartier` VALUES (2, 'BISENGO', 1);
INSERT INTO `quartier` VALUES (3, 'TSHIBANGU', 1);
INSERT INTO `quartier` VALUES (4, 'LINGWALA', 1);
INSERT INTO `quartier` VALUES (5, 'MAKELELE', 1);
INSERT INTO `quartier` VALUES (6, 'LUBUDI', 1);
INSERT INTO `quartier` VALUES (7, 'BITSAKU-TSAKU', 2);
INSERT INTO `quartier` VALUES (8, 'FUNA', 4);
INSERT INTO `quartier` VALUES (9, 'KABINDA', 2);
INSERT INTO `quartier` VALUES (10, 'NDOLO', 20);
INSERT INTO `quartier` VALUES (11, 'TSHIMANGA', 2);
INSERT INTO `quartier` VALUES (12, 'KASAI', 3);
INSERT INTO `quartier` VALUES (13, 'KWANGO', 3);
INSERT INTO `quartier` VALUES (14, 'MBANDAKA', 3);
INSERT INTO `quartier` VALUES (15, 'NGBAKA', 3);
INSERT INTO `quartier` VALUES (16, 'MATADI', 3);
INSERT INTO `quartier` VALUES (17, '3 Z', 4);
INSERT INTO `quartier` VALUES (18, 'LEMERA', 4);
INSERT INTO `quartier` VALUES (19, 'CROIX-ROUGE', 4);
INSERT INTO `quartier` VALUES (20, 'DE LA REVOLUTION', 4);
INSERT INTO `quartier` VALUES (21, 'DES CLINIQUES', 4);
INSERT INTO `quartier` VALUES (22, 'GOLF', 4);
INSERT INTO `quartier` VALUES (23, 'REVOLUTION', 4);
INSERT INTO `quartier` VALUES (24, 'KAUKA 1', 4);
INSERT INTO `quartier` VALUES (25, 'KAUKA 2', 13);
INSERT INTO `quartier` VALUES (26, 'KAUKA 3', 13);
INSERT INTO `quartier` VALUES (27, 'KIMBANGU 1', 13);
INSERT INTO `quartier` VALUES (28, 'KIMBANGU 2', 13);
INSERT INTO `quartier` VALUES (29, 'KIMBANGU 3', 13);
INSERT INTO `quartier` VALUES (30, 'MATONGE 1', 13);
INSERT INTO `quartier` VALUES (31, 'MATONGE 2', 13);
INSERT INTO `quartier` VALUES (32, 'MATONGE 3', 13);
INSERT INTO `quartier` VALUES (33, 'IMMO CONGO', 13);
INSERT INTO `quartier` VALUES (34, 'YOLO-NORD 1', 13);
INSERT INTO `quartier` VALUES (35, 'YOLO-NORD 2', 13);
INSERT INTO `quartier` VALUES (36, 'YOLO-NORD 3', 13);
INSERT INTO `quartier` VALUES (37, 'YOLO-SUD 1', 13);
INSERT INTO `quartier` VALUES (38, 'YOLO-SUD 2', 13);
INSERT INTO `quartier` VALUES (39, 'KATANGA', 11);
INSERT INTO `quartier` VALUES (40, 'LODJA', 11);
INSERT INTO `quartier` VALUES (41, 'SALONGO', 11);
INSERT INTO `quartier` VALUES (42, 'ANC.COMBATTANTS', 2);
INSERT INTO `quartier` VALUES (43, 'ASSOSSA', 4);
INSERT INTO `quartier` VALUES (44, 'BAMBOMA', 8);
INSERT INTO `quartier` VALUES (45, 'BAHUMBU', 8);
INSERT INTO `quartier` VALUES (46, 'BOMA', 5);
INSERT INTO `quartier` VALUES (47, 'NGANDU', 8);
INSERT INTO `quartier` VALUES (48, 'KAMBA-MULUMBA', 8);
INSERT INTO `quartier` VALUES (49, 'LUEBO', 8);
INSERT INTO `quartier` VALUES (50, 'MANGANA', 8);
INSERT INTO `quartier` VALUES (51, 'MAVIOKELE', 8);
INSERT INTO `quartier` VALUES (52, 'MIKONDO', 8);
INSERT INTO `quartier` VALUES (53, 'NGAMPANI', 8);
INSERT INTO `quartier` VALUES (54, 'NSANGA', 8);
INSERT INTO `quartier` VALUES (55, 'NSUMABWA', 8);
INSERT INTO `quartier` VALUES (56, 'BOYOMA', 15);
INSERT INTO `quartier` VALUES (57, 'NGILIMA', 15);
INSERT INTO `quartier` VALUES (58, 'MONGALA', 15);
INSERT INTO `quartier` VALUES (59, 'NGBAKA', 4);
INSERT INTO `quartier` VALUES (60, 'PENDE', 15);
INSERT INTO `quartier` VALUES (61, 'SALONGO', 19);
INSERT INTO `quartier` VALUES (62, 'ITIMBIRI', 19);
INSERT INTO `quartier` VALUES (63, 'KILIMANI', 19);
INSERT INTO `quartier` VALUES (64, 'LISALA', 19);
INSERT INTO `quartier` VALUES (65, 'LUBUDI JAMAIQUE', 19);
INSERT INTO `quartier` VALUES (66, 'TSHINKELA', 19);
INSERT INTO `quartier` VALUES (67, '17 MAI', 24);
INSERT INTO `quartier` VALUES (68, 'ANC.COMBATTANTS', 24);
INSERT INTO `quartier` VALUES (69, 'BIKANGA', 24);
INSERT INTO `quartier` VALUES (70, 'DE LA PAIX', 20);
INSERT INTO `quartier` VALUES (71, 'MISSION', 24);
INSERT INTO `quartier` VALUES (72, 'COMMERCIAL', 21);
INSERT INTO `quartier` VALUES (73, 'ECOLE', 21);
INSERT INTO `quartier` VALUES (74, 'KEMI', 21);
INSERT INTO `quartier` VALUES (75, 'KIMPWANZA', 21);
INSERT INTO `quartier` VALUES (76, 'POLO', 21);
INSERT INTO `quartier` VALUES (77, 'SALONGO', 20);
INSERT INTO `quartier` VALUES (78, 'Industriel', 20);
INSERT INTO `quartier` VALUES (79, 'KINGABWA', 20);
INSERT INTO `quartier` VALUES (80, 'GENERAL MASIALA', 20);
INSERT INTO `quartier` VALUES (81, 'MBAMU', 20);
INSERT INTO `quartier` VALUES (82, 'MAYULU', 20);
INSERT INTO `quartier` VALUES (83, 'NDANU', 20);
INSERT INTO `quartier` VALUES (84, 'NZADI', 20);
INSERT INTO `quartier` VALUES (85, 'RESIDENTIEL', 20);
INSERT INTO `quartier` VALUES (86, 'MATEBA', 20);
INSERT INTO `quartier` VALUES (87, '04 OCTOBRE', 16);
INSERT INTO `quartier` VALUES (88, 'CAMP LUFUNGULA', 16);
INSERT INTO `quartier` VALUES (89, 'LA VOIX DU PEUPLE', 16);
INSERT INTO `quartier` VALUES (90, 'LOKOLE', 16);
INSERT INTO `quartier` VALUES (91, 'NGUNDA LOKOMBE', 16);
INSERT INTO `quartier` VALUES (92, 'PAKA DJUMA', 16);
INSERT INTO `quartier` VALUES (93, 'SINGA MOPEPE', 16);
INSERT INTO `quartier` VALUES (94, 'BAGAT', 22);
INSERT INTO `quartier` VALUES (95, 'MAWANGA', 22);
INSERT INTO `quartier` VALUES (96, 'MFIDI', 22);
INSERT INTO `quartier` VALUES (97, 'MIKASI', 22);
INSERT INTO `quartier` VALUES (98, 'MANGENGENGE', 9);
INSERT INTO `quartier` VALUES (99, 'ABATTOIR', 5);
INSERT INTO `quartier` VALUES (100, 'BOBA', 5);
INSERT INTO `quartier` VALUES (101, 'IMBALI', 5);
INSERT INTO `quartier` VALUES (102, 'EFOLOKO', 5);
INSERT INTO `quartier` VALUES (103, 'LUBAMBA', 5);
INSERT INTO `quartier` VALUES (104, 'MAFUTA', 5);
INSERT INTO `quartier` VALUES (105, 'MAPELA', 5);
INSERT INTO `quartier` VALUES (106, 'MFUMU NSUKA', 5);
INSERT INTO `quartier` VALUES (107, 'NZUZI WA MBOMBO', 5);
INSERT INTO `quartier` VALUES (108, 'PELENDE', 5);
INSERT INTO `quartier` VALUES (109, 'SANS-FILS', 5);
INSERT INTO `quartier` VALUES (110, 'TELEVISION', 5);
INSERT INTO `quartier` VALUES (111, 'TOMBA', 6);
INSERT INTO `quartier` VALUES (112, 'LUMUMBA', 6);
INSERT INTO `quartier` VALUES (113, 'LUBEFU', 6);
INSERT INTO `quartier` VALUES (114, 'LUNIONZO', 6);
INSERT INTO `quartier` VALUES (115, 'MBOMB\'IPOKU', 6);
INSERT INTO `quartier` VALUES (116, 'SANKURU', 6);
INSERT INTO `quartier` VALUES (117, 'TOTAKA', 6);
INSERT INTO `quartier` VALUES (118, 'VIVI', 6);
INSERT INTO `quartier` VALUES (119, 'LUKUNGA', 6);
INSERT INTO `quartier` VALUES (120, 'MAMA MOBUTU', 17);
INSERT INTO `quartier` VALUES (121, 'MASANGA MBILA', 17);
INSERT INTO `quartier` VALUES (122, 'MITENDI', 17);
INSERT INTO `quartier` VALUES (123, 'NGANSELE', 17);
INSERT INTO `quartier` VALUES (124, 'NDJILI KILAMBU', 17);
INSERT INTO `quartier` VALUES (125, 'NGOMBE', 17);
INSERT INTO `quartier` VALUES (126, 'PLATEAU', 17);
INSERT INTO `quartier` VALUES (127, 'MAMA YEMO', 17);
INSERT INTO `quartier` VALUES (128, 'QUARTIER 1', 7);
INSERT INTO `quartier` VALUES (129, 'QUARTIER 2', 7);
INSERT INTO `quartier` VALUES (130, 'QUARTIER 3', 7);
INSERT INTO `quartier` VALUES (131, 'QUARTIER 4', 7);
INSERT INTO `quartier` VALUES (132, 'QUARTIER 5', 7);
INSERT INTO `quartier` VALUES (133, 'QUARTIER 6', 7);
INSERT INTO `quartier` VALUES (134, 'QUARTIER 7', 7);
INSERT INTO `quartier` VALUES (135, 'QUARTIER 8', 4);
INSERT INTO `quartier` VALUES (136, 'QUARTIER 9', 7);
INSERT INTO `quartier` VALUES (137, 'QUARTIER 10', 7);
INSERT INTO `quartier` VALUES (138, 'QUARTIER 11', 7);
INSERT INTO `quartier` VALUES (139, 'QUARTIER 12', 7);
INSERT INTO `quartier` VALUES (140, 'QUARTIER 13', 7);
INSERT INTO `quartier` VALUES (141, 'BAOBAB', 23);
INSERT INTO `quartier` VALUES (142, 'BULA', 23);
INSERT INTO `quartier` VALUES (143, 'MATEBA 1', 23);
INSERT INTO `quartier` VALUES (144, 'MPILA', 23);
INSERT INTO `quartier` VALUES (145, 'MUKULU', 23);
INSERT INTO `quartier` VALUES (146, 'OZONE', 14);
INSERT INTO `quartier` VALUES (147, 'ANC.COMBATTANTS', 14);
INSERT INTO `quartier` VALUES (148, 'POMPAGE', 14);
INSERT INTO `quartier` VALUES (149, 'BASOKO', 14);
INSERT INTO `quartier` VALUES (150, 'BUMBA', 14);
INSERT INTO `quartier` VALUES (151, 'DJELO BINZA', 14);
INSERT INTO `quartier` VALUES (152, 'MFINDA', 14);
INSERT INTO `quartier` VALUES (153, 'KIKENDA', 14);
INSERT INTO `quartier` VALUES (154, 'KIMPE', 14);
INSERT INTO `quartier` VALUES (155, 'KINSUKA PECHEUR', 14);
INSERT INTO `quartier` VALUES (156, 'CONGO', 14);
INSERT INTO `quartier` VALUES (157, 'LUBUDI', 14);
INSERT INTO `quartier` VALUES (158, 'LUKUNGA', 14);
INSERT INTO `quartier` VALUES (159, 'MAMA YEMO', 14);
INSERT INTO `quartier` VALUES (160, 'MANENGA', 14);
INSERT INTO `quartier` VALUES (161, 'MUNGANGA', 14);
INSERT INTO `quartier` VALUES (162, 'NGOMBA KINKUSA', 14);
INSERT INTO `quartier` VALUES (163, 'PUNDA', 14);
INSERT INTO `quartier` VALUES (164, '24 NOVEMBRE', 12);
INSERT INTO `quartier` VALUES (165, 'ASSOSSA', 12);
INSERT INTO `quartier` VALUES (166, 'DIOMI', 12);
INSERT INTO `quartier` VALUES (167, 'ELENGESA', 7);
INSERT INTO `quartier` VALUES (168, 'KARTHOUM', 12);
INSERT INTO `quartier` VALUES (169, 'PETIT-PETIT', 12);
INSERT INTO `quartier` VALUES (170, 'KINDOBO', 10);
INSERT INTO `quartier` VALUES (171, 'MIKONGA I', 10);
INSERT INTO `quartier` VALUES (172, 'MPASA 1', 10);
INSERT INTO `quartier` VALUES (173, 'BADIADINGI', 18);
INSERT INTO `quartier` VALUES (174, 'CITE-VERTE', 14);
INSERT INTO `quartier` VALUES (175, 'KALUNGA', 18);
INSERT INTO `quartier` VALUES (176, 'MUANA/TUNU', 18);
INSERT INTO `quartier` VALUES (177, 'MULULU MBAMBO', 18);
INSERT INTO `quartier` VALUES (178, 'NKINGU', 18);
INSERT INTO `quartier` VALUES (179, 'NKULU', 18);
INSERT INTO `quartier` VALUES (180, 'BATETELA', 4);
INSERT INTO `quartier` VALUES (181, 'FAC (HT COMMDT)', 4);
INSERT INTO `quartier` VALUES (182, 'FLEUVE-ILOTS', 4);
INSERT INTO `quartier` VALUES (183, 'MADIMBA II', 15);
INSERT INTO `quartier` VALUES (184, 'AKETI', 15);
INSERT INTO `quartier` VALUES (185, 'DJALO', 15);
INSERT INTO `quartier` VALUES (186, 'KASAI', 2);
INSERT INTO `quartier` VALUES (187, 'LIBULU', 2);
INSERT INTO `quartier` VALUES (188, 'KAPINGA', 2);
INSERT INTO `quartier` VALUES (189, 'MOZINDO', 2);
INSERT INTO `quartier` VALUES (190, 'DU 30 JUIN', 16);
INSERT INTO `quartier` VALUES (191, 'C.N.E.C.I.', 16);
INSERT INTO `quartier` VALUES (192, 'WENZE', 16);
INSERT INTO `quartier` VALUES (193, 'GOLF', 16);
INSERT INTO `quartier` VALUES (194, 'DIANGENDA', 12);
INSERT INTO `quartier` VALUES (195, 'SAIO', 12);
INSERT INTO `quartier` VALUES (196, 'BEAUMARCHAIS', 2);
INSERT INTO `quartier` VALUES (197, 'ADOULA', 1);
INSERT INTO `quartier` VALUES (198, 'KASA VUBU', 1);
INSERT INTO `quartier` VALUES (199, 'LUMUMBA', 1);
INSERT INTO `quartier` VALUES (200, 'MARCHE CENTRAL', 4);
INSERT INTO `quartier` VALUES (201, 'WENZE', 19);
INSERT INTO `quartier` VALUES (202, 'LUKENGO', 19);
INSERT INTO `quartier` VALUES (203, 'MAI-NDOMBE', 3);
INSERT INTO `quartier` VALUES (204, 'LT. MBAKI', 3);
INSERT INTO `quartier` VALUES (205, 'NTOMBA', 3);
INSERT INTO `quartier` VALUES (206, 'MPASA 2', 10);
INSERT INTO `quartier` VALUES (207, 'TALANGAI', 10);
INSERT INTO `quartier` VALUES (208, 'MPASA 3', 10);
INSERT INTO `quartier` VALUES (209, 'KINKOLE BAHUMBU', 10);
INSERT INTO `quartier` VALUES (210, 'KINKOLE PECHEUR', 10);
INSERT INTO `quartier` VALUES (211, 'KINKOLE MIKALA', 10);
INSERT INTO `quartier` VALUES (212, 'DOMAINE PRESID°', 10);
INSERT INTO `quartier` VALUES (213, 'NDJILI BRASSERIE', 10);
INSERT INTO `quartier` VALUES (214, 'DINGI DINGI', 10);
INSERT INTO `quartier` VALUES (215, 'FLEUVE', 10);
INSERT INTO `quartier` VALUES (216, 'BUMA', 10);
INSERT INTO `quartier` VALUES (217, 'PULULU MBAMBU', 18);
INSERT INTO `quartier` VALUES (218, 'LUBUDI', 18);
INSERT INTO `quartier` VALUES (219, 'NKOMBE', 18);
INSERT INTO `quartier` VALUES (220, 'MOLENDE', 18);
INSERT INTO `quartier` VALUES (221, 'MADIATA', 18);
INSERT INTO `quartier` VALUES (222, 'KONDE', 18);
INSERT INTO `quartier` VALUES (223, 'HERADY', 18);
INSERT INTO `quartier` VALUES (224, 'NGAFANI', 18);
INSERT INTO `quartier` VALUES (225, 'LUKENI', 3);
INSERT INTO `quartier` VALUES (226, 'UBANGI', 3);
INSERT INTO `quartier` VALUES (227, 'LOKORO', 3);
INSERT INTO `quartier` VALUES (228, 'KASAI', 3);
INSERT INTO `quartier` VALUES (229, 'DIPIYA', 12);
INSERT INTO `quartier` VALUES (230, 'MONGALA', 12);
INSERT INTO `quartier` VALUES (231, 'MFIMI', 12);
INSERT INTO `quartier` VALUES (232, 'RAILS', 2);
INSERT INTO `quartier` VALUES (233, 'FLAMBEAU', 4);
INSERT INTO `quartier` VALUES (234, 'NGUNDA', 15);
INSERT INTO `quartier` VALUES (235, 'LA VOIX DU PEUPLE', 15);
INSERT INTO `quartier` VALUES (236, 'LUBUDI NGANDA', 19);
INSERT INTO `quartier` VALUES (237, 'REVOLUTION', 24);
INSERT INTO `quartier` VALUES (238, 'DE LA GARE', 4);
INSERT INTO `quartier` VALUES (239, 'NOTRE DAME', 4);
INSERT INTO `quartier` VALUES (240, 'YOLO SUD 3', 13);
INSERT INTO `quartier` VALUES (241, 'CAMP MPINZI', 13);
INSERT INTO `quartier` VALUES (242, 'MARCHE GAMBELA', 11);
INSERT INTO `quartier` VALUES (243, 'LUBUMBASHI', 11);
INSERT INTO `quartier` VALUES (244, 'ONL', 11);
INSERT INTO `quartier` VALUES (245, 'MULIE', 8);
INSERT INTO `quartier` VALUES (246, 'KINGASANI', 14);
INSERT INTO `quartier` VALUES (247, 'DISASI', 8);
INSERT INTO `quartier` VALUES (248, 'KUTU', 21);
INSERT INTO `quartier` VALUES (249, 'MBUALA', 8);
INSERT INTO `quartier` VALUES (250, 'KIKIMI', 8);
INSERT INTO `quartier` VALUES (251, 'MALONDA', 8);
INSERT INTO `quartier` VALUES (252, 'MFUMU NKENTO', 8);
INSERT INTO `quartier` VALUES (253, 'KIMBANGU', 5);
INSERT INTO `quartier` VALUES (254, 'TSHUENGE', 5);
INSERT INTO `quartier` VALUES (255, 'TSHUANGU', 5);
INSERT INTO `quartier` VALUES (256, 'KONGO (CONGO)', 5);
INSERT INTO `quartier` VALUES (257, 'MANDIANGU', 5);
INSERT INTO `quartier` VALUES (258, 'LOKARI', 5);
INSERT INTO `quartier` VALUES (259, 'KASAI', 5);
INSERT INTO `quartier` VALUES (260, 'KIVU', 5);
INSERT INTO `quartier` VALUES (261, 'MATADI', 5);
INSERT INTO `quartier` VALUES (262, 'MATETE EST', 6);
INSERT INTO `quartier` VALUES (263, 'MATETE CENTRE', 6);
INSERT INTO `quartier` VALUES (264, 'MATETE OUEST', 6);
INSERT INTO `quartier` VALUES (265, 'OZONE', 4);
INSERT INTO `quartier` VALUES (266, 'JOLI PARC', 14);
INSERT INTO `quartier` VALUES (267, 'BANGU', 7);
INSERT INTO `quartier` VALUES (268, 'MUSEY', 14);
INSERT INTO `quartier` VALUES (269, 'PIGEON', 14);
INSERT INTO `quartier` VALUES (270, 'IPN', 14);
INSERT INTO `quartier` VALUES (271, 'DELVAUX', 14);
INSERT INTO `quartier` VALUES (272, 'KIMBONDO', 17);
INSERT INTO `quartier` VALUES (273, 'VUNDA MANENGA', 17);
INSERT INTO `quartier` VALUES (274, 'KIMWENZA', 17);
INSERT INTO `quartier` VALUES (275, 'MATADI MAYO', 17);
INSERT INTO `quartier` VALUES (276, 'CPA', 17);
INSERT INTO `quartier` VALUES (277, 'SALONGO', 22);
INSERT INTO `quartier` VALUES (278, 'SELO', 22);
INSERT INTO `quartier` VALUES (279, 'TAMPA', 22);
INSERT INTO `quartier` VALUES (280, 'MABULU 1', 22);
INSERT INTO `quartier` VALUES (281, 'MABULU 2', 22);
INSERT INTO `quartier` VALUES (282, 'UELE', 5);
INSERT INTO `quartier` VALUES (283, 'MOSOSO', 20);
INSERT INTO `quartier` VALUES (284, 'MATEBA 2', 23);
INSERT INTO `quartier` VALUES (285, 'LUYI', 23);
INSERT INTO `quartier` VALUES (286, 'AGRICOLE', 23);
INSERT INTO `quartier` VALUES (287, 'MFUMU VULA', 23);
INSERT INTO `quartier` VALUES (288, 'MOMBELE', 23);
INSERT INTO `quartier` VALUES (289, 'MFUMU VULA', 23);
INSERT INTO `quartier` VALUES (290, 'BAGATA', 23);
INSERT INTO `quartier` VALUES (291, 'BOLIMA', 23);
INSERT INTO `quartier` VALUES (292, 'KISANTU', 23);
INSERT INTO `quartier` VALUES (293, 'KWANGO', 23);
INSERT INTO `quartier` VALUES (294, 'MALALA', 23);
INSERT INTO `quartier` VALUES (295, 'ECHANGEUR', 21);
INSERT INTO `quartier` VALUES (296, 'FOIRE', 21);
INSERT INTO `quartier` VALUES (297, 'MASANO', 21);
INSERT INTO `quartier` VALUES (298, 'MADRANDELE', 21);
INSERT INTO `quartier` VALUES (299, 'GOMBELE', 21);
INSERT INTO `quartier` VALUES (300, 'MOLO', 21);
INSERT INTO `quartier` VALUES (301, 'SALONGO', 21);
INSERT INTO `quartier` VALUES (302, 'LIVULU', 21);
INSERT INTO `quartier` VALUES (303, 'MBANZA LEMBA', 21);
INSERT INTO `quartier` VALUES (304, 'NGANA', 9);
INSERT INTO `quartier` VALUES (305, 'KIKIMI', 9);
INSERT INTO `quartier` VALUES (306, 'YUO', 9);
INSERT INTO `quartier` VALUES (307, 'KINZONO', 9);
INSERT INTO `quartier` VALUES (308, 'YOSO', 9);
INSERT INTO `quartier` VALUES (309, 'MAINDOMBE', 9);
INSERT INTO `quartier` VALUES (310, 'MALUKU CITE', 9);
INSERT INTO `quartier` VALUES (311, 'MONACO', 9);
INSERT INTO `quartier` VALUES (312, 'KIMPOKO', 9);
INSERT INTO `quartier` VALUES (313, 'MENKAO', 9);
INSERT INTO `quartier` VALUES (314, 'KINGAKATI', 9);
INSERT INTO `quartier` VALUES (315, 'DUMI', 9);
INSERT INTO `quartier` VALUES (316, 'MBAKANA', 9);
INSERT INTO `quartier` VALUES (317, 'INGA', 18);
INSERT INTO `quartier` VALUES (318, 'CITE KABINDA I', 15);
INSERT INTO `quartier` VALUES (319, 'BON MARCHE', 2);
INSERT INTO `quartier` VALUES (320, 'SUPER LEMBA', 21);
INSERT INTO `quartier` VALUES (321, 'MONGALA', 3);
INSERT INTO `quartier` VALUES (322, 'DIPIYA', 3);
INSERT INTO `quartier` VALUES (323, 'MFIMI', 3);
INSERT INTO `quartier` VALUES (324, 'PHC (EX PLZ)', 16);
INSERT INTO `quartier` VALUES (325, 'MBUDI', 6);
INSERT INTO `quartier` VALUES (326, 'PUMBU', 17);
INSERT INTO `quartier` VALUES (327, 'MBUDI', 17);
INSERT INTO `quartier` VALUES (328, 'MOMBELE', 20);
INSERT INTO `quartier` VALUES (329, 'KINSAKU', 6);
INSERT INTO `quartier` VALUES (330, 'LOKELE 1', 6);
INSERT INTO `quartier` VALUES (331, 'LOKELE 2', 6);
INSERT INTO `quartier` VALUES (332, 'KITOMESA', 24);
INSERT INTO `quartier` VALUES (333, 'NGAMAZITA', 8);
INSERT INTO `quartier` VALUES (334, 'KUTU', 8);
INSERT INTO `quartier` VALUES (335, 'BANTANDU', 6);
INSERT INTO `quartier` VALUES (336, 'BABYLONNE', 19);
INSERT INTO `quartier` VALUES (337, 'MFIDI', 21);
INSERT INTO `quartier` VALUES (338, 'BIKANGA', 6);
INSERT INTO `quartier` VALUES (339, 'LOKORO', 6);
INSERT INTO `quartier` VALUES (340, 'ANUNGA', 6);
INSERT INTO `quartier` VALUES (341, 'MAI-NDOME', 6);
INSERT INTO `quartier` VALUES (342, 'DEBONHOMME', 6);
INSERT INTO `quartier` VALUES (343, 'NGUFU', 6);
INSERT INTO `quartier` VALUES (344, 'NGILIMA', 6);
INSERT INTO `quartier` VALUES (345, 'MONGO', 6);
INSERT INTO `quartier` VALUES (346, 'MARCHE MATETE', 6);
INSERT INTO `quartier` VALUES (347, 'BATENDE', 6);
INSERT INTO `quartier` VALUES (348, 'MUTOTO', 6);
INSERT INTO `quartier` VALUES (349, 'NGILIMA', 6);
INSERT INTO `quartier` VALUES (350, 'BAHUMBU I', 6);
INSERT INTO `quartier` VALUES (351, 'BAHUMBU II', 6);
INSERT INTO `quartier` VALUES (352, 'MALANDI', 6);
INSERT INTO `quartier` VALUES (353, 'KWENGE', 6);
INSERT INTO `quartier` VALUES (354, 'MPUDI', 6);
INSERT INTO `quartier` VALUES (355, 'KINSIMBU', 6);
INSERT INTO `quartier` VALUES (356, 'FUNA', 15);
INSERT INTO `quartier` VALUES (357, 'MFUMU MVULA', 20);
INSERT INTO `quartier` VALUES (358, 'MARCHE KATO', 2);
INSERT INTO `quartier` VALUES (359, 'FUNA', 20);
INSERT INTO `quartier` VALUES (360, 'MALUEKA', 14);
INSERT INTO `quartier` VALUES (361, 'REGIDESO', 14);
INSERT INTO `quartier` VALUES (362, 'KIMBUALA', 14);
INSERT INTO `quartier` VALUES (363, 'KINDELE', 17);
INSERT INTO `quartier` VALUES (364, 'MOULAERT', 1);
INSERT INTO `quartier` VALUES (365, 'PULULU', 6);
INSERT INTO `quartier` VALUES (366, 'KUNDA', 6);
INSERT INTO `quartier` VALUES (367, '17 MAI', 8);
INSERT INTO `quartier` VALUES (368, 'KASA VUBU', 8);
INSERT INTO `quartier` VALUES (369, 'MOKALI', 8);
INSERT INTO `quartier` VALUES (370, 'BIYELA', 8);
INSERT INTO `quartier` VALUES (371, 'SAKOMBI', 8);
INSERT INTO `quartier` VALUES (372, 'QUARTIER II', 5);
INSERT INTO `quartier` VALUES (373, 'SALONGO', 8);
INSERT INTO `quartier` VALUES (374, 'QUARTIER I', 5);
INSERT INTO `quartier` VALUES (375, 'QUARTIER III', 5);
INSERT INTO `quartier` VALUES (376, 'BANUNU', 6);
INSERT INTO `quartier` VALUES (377, 'BABOMA', 6);
INSERT INTO `quartier` VALUES (378, 'VITAMINE', 6);
INSERT INTO `quartier` VALUES (379, 'VIAZA', 6);
INSERT INTO `quartier` VALUES (380, 'à préciser', 20);
INSERT INTO `quartier` VALUES (381, 'à préciser', 2);
INSERT INTO `quartier` VALUES (382, 'à préciser', 3);
INSERT INTO `quartier` VALUES (383, 'à préciser', 4);
INSERT INTO `quartier` VALUES (384, 'à préciser', 4);
INSERT INTO `quartier` VALUES (385, 'à préciser', 4);
INSERT INTO `quartier` VALUES (386, 'à préciser', 8);
INSERT INTO `quartier` VALUES (387, 'à préciser', 2);
INSERT INTO `quartier` VALUES (388, 'à préciser', 15);
INSERT INTO `quartier` VALUES (389, 'à préciser', 24);
INSERT INTO `quartier` VALUES (390, 'à préciser', 20);
INSERT INTO `quartier` VALUES (391, 'Industriel', 20);
INSERT INTO `quartier` VALUES (392, 'à préciser', 16);
INSERT INTO `quartier` VALUES (393, 'à préciser', 22);
INSERT INTO `quartier` VALUES (394, 'à préciser', 9);
INSERT INTO `quartier` VALUES (395, 'MADIMBA', 5);
INSERT INTO `quartier` VALUES (396, 'à préciser', 22);
INSERT INTO `quartier` VALUES (397, 'à préciser', 17);
INSERT INTO `quartier` VALUES (398, 'à préciser', 8);
INSERT INTO `quartier` VALUES (399, 'à préciser', 20);
INSERT INTO `quartier` VALUES (400, 'à préciser', 2);
INSERT INTO `quartier` VALUES (401, 'à préciser', 12);
INSERT INTO `quartier` VALUES (402, 'à préciser', 10);
INSERT INTO `quartier` VALUES (403, 'à préciser', 17);
INSERT INTO `quartier` VALUES (404, 'à préciser', 18);
INSERT INTO `quartier` VALUES (405, 'à préciser', 18);
INSERT INTO `quartier` VALUES (406, 'à préciser', 18);
INSERT INTO `quartier` VALUES (407, 'à préciser / Katanga', 18);
INSERT INTO `quartier` VALUES (408, 'à préciser / Kapemba', 18);
INSERT INTO `quartier` VALUES (409, 'Industriel', 18);
INSERT INTO `quartier` VALUES (410, 'à préciser', 18);
INSERT INTO `quartier` VALUES (411, 'à préciser / Kolwezi', 18);
INSERT INTO `quartier` VALUES (412, 'à préciser', 15);
INSERT INTO `quartier` VALUES (413, 'NGBAKA', 15);
INSERT INTO `quartier` VALUES (414, 'à préciser', 14);
INSERT INTO `quartier` VALUES (415, 'Lieutenant Colonel KOKOLO(Camp militaire)', 1);
INSERT INTO `quartier` VALUES (416, 'FUNA 2', 2);
INSERT INTO `quartier` VALUES (417, 'COMMERCE', 4);
INSERT INTO `quartier` VALUES (418, 'KAUKA I', 13);
INSERT INTO `quartier` VALUES (419, 'YOLO SUD IV', 13);
INSERT INTO `quartier` VALUES (420, 'BATUMONA', 8);
INSERT INTO `quartier` VALUES (421, 'BIKUKU', 8);
INSERT INTO `quartier` VALUES (422, 'ESANGA', 8);
INSERT INTO `quartier` VALUES (423, 'KABILA', 8);
INSERT INTO `quartier` VALUES (424, 'KAKUDJI', 8);
INSERT INTO `quartier` VALUES (425, 'KAMBOKO', 8);
INSERT INTO `quartier` VALUES (426, 'KAYOLO', 8);
INSERT INTO `quartier` VALUES (427, 'KIMBUNDA', 8);
INSERT INTO `quartier` VALUES (428, 'KISANTU', 8);
INSERT INTO `quartier` VALUES (429, 'MABIMDA', 8);
INSERT INTO `quartier` VALUES (430, 'MAYENGELE', 8);
INSERT INTO `quartier` VALUES (431, 'MBEMBA-FUNDU', 8);
INSERT INTO `quartier` VALUES (432, 'MUNKONKA', 8);
INSERT INTO `quartier` VALUES (433, 'NGAMAYAMA', 8);
INSERT INTO `quartier` VALUES (434, 'NGIESI', 8);
INSERT INTO `quartier` VALUES (435, 'PANDAZILA', 8);
INSERT INTO `quartier` VALUES (436, 'PIERRE FOKOM', 8);
INSERT INTO `quartier` VALUES (437, 'REVOLUTION', 8);
INSERT INTO `quartier` VALUES (438, 'WAY-WAY', 8);
INSERT INTO `quartier` VALUES (439, 'MADIMBA', 4);
INSERT INTO `quartier` VALUES (440, 'LUBUDI-LUKA', 19);
INSERT INTO `quartier` VALUES (441, 'AMBA', 24);
INSERT INTO `quartier` VALUES (442, 'DINGI-DINGI', 24);
INSERT INTO `quartier` VALUES (443, 'KABILA', 24);
INSERT INTO `quartier` VALUES (444, 'KISENSO-GARE', 24);
INSERT INTO `quartier` VALUES (445, 'KUMBU', 24);
INSERT INTO `quartier` VALUES (446, 'LIBERATION', 24);
INSERT INTO `quartier` VALUES (447, 'MBUKU', 24);
INSERT INTO `quartier` VALUES (448, 'MUJINGA', 24);
INSERT INTO `quartier` VALUES (449, 'NGOMBA', 24);
INSERT INTO `quartier` VALUES (450, 'NSOLA', 24);
INSERT INTO `quartier` VALUES (451, 'REGIDESO', 24);
INSERT INTO `quartier` VALUES (452, 'AGRICOLE', 20);
INSERT INTO `quartier` VALUES (453, 'WAMBA', 22);
INSERT INTO `quartier` VALUES (454, 'LEMBA VILLAGE', 22);
INSERT INTO `quartier` VALUES (455, 'KWANGO', 22);
INSERT INTO `quartier` VALUES (456, 'KABILA', 22);
INSERT INTO `quartier` VALUES (457, 'BOLIMA', 22);
INSERT INTO `quartier` VALUES (458, 'KISANTU', 22);
INSERT INTO `quartier` VALUES (459, 'BU', 9);
INSERT INTO `quartier` VALUES (460, 'NGUMA', 9);
INSERT INTO `quartier` VALUES (461, 'MWE', 9);
INSERT INTO `quartier` VALUES (462, 'KINGUNU', 9);
INSERT INTO `quartier` VALUES (463, 'MONGATA', 9);
INSERT INTO `quartier` VALUES (464, 'KIVU', 5);
INSERT INTO `quartier` VALUES (465, 'DONDO', 6);
INSERT INTO `quartier` VALUES (466, 'LOEKA', 6);
INSERT INTO `quartier` VALUES (467, 'MALEMBE', 6);
INSERT INTO `quartier` VALUES (468, 'MAZIBA', 6);
INSERT INTO `quartier` VALUES (469, 'SUMBUKA', 6);
INSERT INTO `quartier` VALUES (470, 'MUSANGU', 17);
INSERT INTO `quartier` VALUES (471, 'CPA-MUSHIE', 17);
INSERT INTO `quartier` VALUES (472, 'KIMBUALA', 17);
INSERT INTO `quartier` VALUES (473, 'MASUMU', 17);
INSERT INTO `quartier` VALUES (474, 'MBUKI', 17);
INSERT INTO `quartier` VALUES (475, 'LUTENDELE', 17);
INSERT INTO `quartier` VALUES (476, 'MATADI-KIBALA', 17);
INSERT INTO `quartier` VALUES (477, 'MAZAMBA', 17);
INSERT INTO `quartier` VALUES (478, 'MAKASI', 7);
INSERT INTO `quartier` VALUES (479, 'BILOMBE', 7);
INSERT INTO `quartier` VALUES (480, 'EQUATEUR', 7);
INSERT INTO `quartier` VALUES (481, 'KATANGA', 7);
INSERT INTO `quartier` VALUES (482, 'KIVU', 7);
INSERT INTO `quartier` VALUES (483, 'KASAI', 7);
INSERT INTO `quartier` VALUES (484, 'ORIENTAL', 7);
INSERT INTO `quartier` VALUES (485, 'UBANGI', 7);
INSERT INTO `quartier` VALUES (486, 'MONGALA', 7);
INSERT INTO `quartier` VALUES (487, 'TSHUAPA', 7);
INSERT INTO `quartier` VALUES (488, 'GOMA', 7);
INSERT INTO `quartier` VALUES (489, 'BANDUNDU', 7);
INSERT INTO `quartier` VALUES (490, 'INGA', 7);
INSERT INTO `quartier` VALUES (491, 'BULAMBEMBA', 23);
INSERT INTO `quartier` VALUES (492, 'MUKULWA', 23);
INSERT INTO `quartier` VALUES (493, 'BANGU', 14);
INSERT INTO `quartier` VALUES (494, 'BADARA', 10);
INSERT INTO `quartier` VALUES (495, '(NGANZI)', 10);
INSERT INTO `quartier` VALUES (496, 'BIBWA I', 10);
INSERT INTO `quartier` VALUES (497, 'BIBWA II', 10);
INSERT INTO `quartier` VALUES (498, 'KIKIMI', 10);
INSERT INTO `quartier` VALUES (499, 'MABA', 10);
INSERT INTO `quartier` VALUES (500, 'MANGENGENGE', 10);
INSERT INTO `quartier` VALUES (501, 'MANGENGENGE', 10);
INSERT INTO `quartier` VALUES (502, 'MIBU', 10);
INSERT INTO `quartier` VALUES (503, 'MIKALA I', 10);
INSERT INTO `quartier` VALUES (504, 'MIKALA II', 10);
INSERT INTO `quartier` VALUES (505, 'MIKONDO', 10);
INSERT INTO `quartier` VALUES (506, 'MUNKE', 10);
INSERT INTO `quartier` VALUES (507, 'NGAMPAMA', 10);
INSERT INTO `quartier` VALUES (508, 'NGINA', 10);
INSERT INTO `quartier` VALUES (509, 'SICOTRA', 10);
INSERT INTO `quartier` VALUES (510, 'LIBERATION', 18);
INSERT INTO `quartier` VALUES (511, 'MBALA', 18);
INSERT INTO `quartier` VALUES (512, 'NDOBE', 18);
INSERT INTO `quartier` VALUES (513, 'LONZO', 14);
INSERT INTO `quartier` VALUES (514, 'MIKONGA II', 10);
INSERT INTO `quartier` VALUES (515, 'JAMAIQUE', 19);
INSERT INTO `quartier` VALUES (516, 'QUARTIER 8', 7);
INSERT INTO `quartier` VALUES (517, 'NGANDA', 19);
INSERT INTO `quartier` VALUES (518, 'BAHUMBU 1', 10);
INSERT INTO `quartier` VALUES (519, 'BAHUMBU 2', 10);
INSERT INTO `quartier` VALUES (520, 'MOBA NSE', 10);
INSERT INTO `quartier` VALUES (521, 'ANCIENS COMBATTANTS', 11);
INSERT INTO `quartier` VALUES (522, 'SALONGO', 11);
INSERT INTO `quartier` VALUES (523, 'KATANGA', 11);
INSERT INTO `quartier` VALUES (524, 'ONL', 11);
INSERT INTO `quartier` VALUES (525, 'ASSOSSA', 11);
INSERT INTO `quartier` VALUES (526, 'LUBUMBASHI', 11);
INSERT INTO `quartier` VALUES (527, 'SALONGO', 11);
INSERT INTO `quartier` VALUES (528, 'PRISON', 18);
INSERT INTO `quartier` VALUES (529, 'CITE-VERTE', 18);
INSERT INTO `quartier` VALUES (530, 'DE LA PAIX', 24);
INSERT INTO `quartier` VALUES (531, 'BOMA', 8);
INSERT INTO `quartier` VALUES (532, 'KINGASANI', 8);
INSERT INTO `quartier` VALUES (533, 'ELENGESA', 12);
INSERT INTO `quartier` VALUES (534, 'SOCOPAO I', 20);
INSERT INTO `quartier` VALUES (535, 'SOCOPAO II', 20);
INSERT INTO `quartier` VALUES (536, 'SOCOPAO III', 20);
INSERT INTO `quartier` VALUES (537, 'INDUSTRIEL', 20);
INSERT INTO `quartier` VALUES (538, 'MBAMU', 20);
INSERT INTO `quartier` VALUES (539, 'KINGABWA', 20);
INSERT INTO `quartier` VALUES (540, 'MFUMU', 20);
INSERT INTO `quartier` VALUES (541, 'MVULA', 20);
INSERT INTO `quartier` VALUES (542, 'NDANU', 20);
INSERT INTO `quartier` VALUES (543, 'NZADI', 20);
INSERT INTO `quartier` VALUES (544, 'SALONGO', 20);
INSERT INTO `quartier` VALUES (545, 'SOCOPAO', 20);
INSERT INTO `quartier` VALUES (546, 'AGRICOLE', 20);
INSERT INTO `quartier` VALUES (547, 'FUNA', 20);
INSERT INTO `quartier` VALUES (548, 'GENERAL MASIALA', 20);
INSERT INTO `quartier` VALUES (549, 'MOMBELE', 20);
INSERT INTO `quartier` VALUES (550, 'MOSOSO', 20);
INSERT INTO `quartier` VALUES (551, 'RESIDENTIEL', 20);
INSERT INTO `quartier` VALUES (552, 'MASANGA MBILA', 17);
INSERT INTO `quartier` VALUES (553, 'MATADI MAYO', 17);
INSERT INTO `quartier` VALUES (554, 'MAMA YEMO', 17);
INSERT INTO `quartier` VALUES (555, 'MAZAMBA', 17);
INSERT INTO `quartier` VALUES (556, 'MAMA MOBUTU', 17);
INSERT INTO `quartier` VALUES (557, 'MUSANGU', 17);
INSERT INTO `quartier` VALUES (558, 'MITENDI', 17);
INSERT INTO `quartier` VALUES (559, 'MAZAL', 17);
INSERT INTO `quartier` VALUES (560, 'MBUDI', 17);
INSERT INTO `quartier` VALUES (561, 'KIMBWALA', 17);
INSERT INTO `quartier` VALUES (562, 'LUTENDELE', 17);
INSERT INTO `quartier` VALUES (563, 'KIMWENZA', 17);
INSERT INTO `quartier` VALUES (564, 'VUNDA MANENGA', 17);
INSERT INTO `quartier` VALUES (565, 'NDJILI KILAMBU', 17);
INSERT INTO `quartier` VALUES (566, 'KINDELE', 17);
INSERT INTO `quartier` VALUES (567, 'NGANSELE', 17);
INSERT INTO `quartier` VALUES (568, 'MBUKI', 17);
INSERT INTO `quartier` VALUES (569, 'PLATEAU', 17);
INSERT INTO `quartier` VALUES (570, 'MATADI KIBALA', 17);
INSERT INTO `quartier` VALUES (571, 'KIMBONDO', 17);
INSERT INTO `quartier` VALUES (572, 'MASUMU', 17);
INSERT INTO `quartier` VALUES (573, 'MATADI MAYO', 17);
INSERT INTO `quartier` VALUES (574, 'CPA MUSHIE', 17);
INSERT INTO `quartier` VALUES (575, 'MALALA', 22);
INSERT INTO `quartier` VALUES (576, 'BAHUMBU', 22);
INSERT INTO `quartier` VALUES (577, 'Matadi Kibala', 17);
INSERT INTO `quartier` VALUES (578, 'KOKOLO', 1);
INSERT INTO `quartier` VALUES (579, 'OZONE', 14);
INSERT INTO `quartier` VALUES (580, 'ANC.COMBATTANTS', 14);
INSERT INTO `quartier` VALUES (581, 'POMPAGE', 14);
INSERT INTO `quartier` VALUES (582, 'BASOKO', 14);
INSERT INTO `quartier` VALUES (583, 'MFINDA', 14);
INSERT INTO `quartier` VALUES (584, 'KIMPE', 14);
INSERT INTO `quartier` VALUES (585, 'KINSUKA PECHEUR', 14);
INSERT INTO `quartier` VALUES (586, 'LUKUNGA', 14);
INSERT INTO `quartier` VALUES (587, 'MAMA YEMO', 14);
INSERT INTO `quartier` VALUES (588, 'MUNGANGA', 14);
INSERT INTO `quartier` VALUES (589, 'CITE-VERTE', 14);
INSERT INTO `quartier` VALUES (590, 'KINGASANI', 14);
INSERT INTO `quartier` VALUES (592, 'MUSEY', 14);
INSERT INTO `quartier` VALUES (593, 'MALUEKA', 14);
INSERT INTO `quartier` VALUES (594, 'REGIDESO', 14);
INSERT INTO `quartier` VALUES (595, 'KIMBUALA', 14);
INSERT INTO `quartier` VALUES (596, 'BUMBA', 14);
INSERT INTO `quartier` VALUES (597, 'DJELO BINZA', 14);
INSERT INTO `quartier` VALUES (598, 'KIKENDA', 14);
INSERT INTO `quartier` VALUES (599, 'LUBUDI', 14);
INSERT INTO `quartier` VALUES (600, 'MANENGA', 14);
INSERT INTO `quartier` VALUES (601, 'NGOMBA KINKUSA', 14);
INSERT INTO `quartier` VALUES (602, 'PUNDA', 14);
INSERT INTO `quartier` VALUES (603, 'PIGEON', 14);
INSERT INTO `quartier` VALUES (604, 'IPN', 14);
INSERT INTO `quartier` VALUES (605, 'DELVAUX', 14);
INSERT INTO `quartier` VALUES (606, 'BANGU', 14);
INSERT INTO `quartier` VALUES (607, 'LONZO', 14);
INSERT INTO `quartier` VALUES (608, 'CONGO', 14);
INSERT INTO `quartier` VALUES (609, 'CONGO', 14);
INSERT INTO `quartier` VALUES (610, 'à preciser', 14);
INSERT INTO `quartier` VALUES (611, 'à preciser', 14);
INSERT INTO `quartier` VALUES (612, 'UELE', 22);
INSERT INTO `quartier` VALUES (613, 'MATEBA', 20);
INSERT INTO `quartier` VALUES (614, 'test', 1);

-- ----------------------------
-- Table structure for service_assiette
-- ----------------------------
DROP TABLE IF EXISTS `service_assiette`;
CREATE TABLE `service_assiette`  (
  `id_serviceAssiette` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ministere` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `description` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `active` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'true',
  PRIMARY KEY (`id_serviceAssiette`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of service_assiette
-- ----------------------------
INSERT INTO `service_assiette` VALUES (1, 'TRANSPORTS ET VOIES DE COMMUNICATION', 'TRANSPORT ET VOIES DE COMMUNICATION', 'DESCRIPTION', 'true');
INSERT INTO `service_assiette` VALUES (2, 'IPMEA', 'Ministère de l\'industrie, Petites et Moyennes Entreprises province du Katanga', 'ECO', 'true');
INSERT INTO `service_assiette` VALUES (3, 'SPORTS ET LOISIRS', 'SPORTS', 'SPL', 'true');
INSERT INTO `service_assiette` VALUES (4, 'DGRK', 'Ministère des Finances Provincial', '', 'true');

-- ----------------------------
-- Table structure for signataire
-- ----------------------------
DROP TABLE IF EXISTS `signataire`;
CREATE TABLE `signataire`  (
  `idSignataire` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fonction` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`idSignataire`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of signataire
-- ----------------------------

-- ----------------------------
-- Table structure for signataire_taxe
-- ----------------------------
DROP TABLE IF EXISTS `signataire_taxe`;
CREATE TABLE `signataire_taxe`  (
  `idSignataire` int(11) NOT NULL,
  `idExercice` int(11) NOT NULL,
  `idTaxe` int(11) NOT NULL,
  PRIMARY KEY (`idSignataire`, `idExercice`, `idTaxe`) USING BTREE,
  INDEX `fk_SignataireTaxe_Signataire1_idx`(`idSignataire`) USING BTREE,
  INDEX `fk_tblsignatairetaxe_tblexercice1_idx`(`idExercice`) USING BTREE,
  INDEX `fk_tblsignatairetaxe_tbltaxe1_idx`(`idTaxe`) USING BTREE,
  CONSTRAINT `fk_SignataireTaxe_Signataire1` FOREIGN KEY (`idSignataire`) REFERENCES `signataire` (`idSignataire`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tblsignatairetaxe_tblexercice1` FOREIGN KEY (`idExercice`) REFERENCES `exercice` (`id_exercice`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tblsignatairetaxe_tbltaxe1` FOREIGN KEY (`idTaxe`) REFERENCES `taxe` (`id_taxe`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of signataire_taxe
-- ----------------------------

-- ----------------------------
-- Table structure for site
-- ----------------------------
DROP TABLE IF EXISTS `site`;
CREATE TABLE `site`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `province` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `id_commune` int(11) NULL DEFAULT NULL,
  `lieu` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `code` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `active` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'true',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_commune`(`id_commune`) USING BTREE,
  CONSTRAINT `site_ibfk_1` FOREIGN KEY (`id_commune`) REFERENCES `commune` (`id_commune`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of site
-- ----------------------------
INSERT INTO `site` VALUES (35, 'KINSHASA', 4, 'MARCHE CENTRALE', '01', 'true');
INSERT INTO `site` VALUES (36, 'KINSHASA', 15, 'MARCHE KATO', '02', 'true');
INSERT INTO `site` VALUES (37, 'KINSHASA', 11, 'MARCHE GAMBELA', '03', 'true');
INSERT INTO `site` VALUES (38, 'KINSAHSA', 5, 'MARCHE DE LA LIBERTE', '04', 'true');
INSERT INTO `site` VALUES (39, 'KINSAHSA', 6, 'MARCHE MATETE', '05', 'true');
INSERT INTO `site` VALUES (40, 'KINSHASA', 15, 'MARCHE ZIGIDA', '06', 'true');
INSERT INTO `site` VALUES (41, 'KINSHASA', 3, 'AGENCE DE LA GOMBE', '07', 'true');
INSERT INTO `site` VALUES (42, 'KINSHASA', 19, 'AGENCE DE KINTAMBO', '08', 'true');
INSERT INTO `site` VALUES (43, 'KINSHASA', 17, 'AGENCE DE L\'UPN', '09', 'true');
INSERT INTO `site` VALUES (44, 'KINSHASA', 21, 'AGENCE  DE RP NGABA', '10', 'true');
INSERT INTO `site` VALUES (45, 'KINSHASA', 13, 'AGENCE DE VICTOIRE', '11', 'true');
INSERT INTO `site` VALUES (46, 'KINSHASA', 20, 'AGENCE DE LIMETE', '12', 'true');
INSERT INTO `site` VALUES (47, 'KINSHASA', 7, 'AGENCE DE NDJILI', '13', 'true');
INSERT INTO `site` VALUES (48, 'KINSHASA', 1, 'MAISON COMMUNALE DE BANDALUNGWA', '14', 'true');
INSERT INTO `site` VALUES (49, 'KINSHASA', 2, 'MAISON COMMUNALE DE BARUMBU', '15', 'true');
INSERT INTO `site` VALUES (50, 'KINSHASA', 14, 'MAISON COMMUNALE DE NGALIEMA', '16', 'true');
INSERT INTO `site` VALUES (51, 'KINSHASA', 11, 'MAISON COMMUNALE DE KASA-VUBU', '17', 'true');
INSERT INTO `site` VALUES (52, 'KINSHASA', 15, 'MAISON COMMUNALE DE KINSHASA', '18', 'true');
INSERT INTO `site` VALUES (53, 'KINSHASA', 9, 'MAISON COMMUNALE DE MALUKU', '19', 'true');
INSERT INTO `site` VALUES (54, 'KINSHASA', 12, 'MAISON COMMUNALE DE NGIRI-NGIRI', '20', 'true');

-- ----------------------------
-- Table structure for societe
-- ----------------------------
DROP TABLE IF EXISTS `societe`;
CREATE TABLE `societe`  (
  `idSociete` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `idArticleBudgetaire` int(11) NOT NULL,
  `nom` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `post_nom` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `adresseActivite` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `photo` longblob NULL,
  `sigle` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `numeroImpot` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `numPatente` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `datePatente` date NULL DEFAULT NULL,
  `nrc` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `idnat` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `formeJuridique` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `dateCreation` date NULL DEFAULT NULL,
  `natureActivite` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `nbreTravailleur` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `nationalite` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `avenue` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `numero` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `telephone` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `quartier` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `ville` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `commune` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `province` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `pays` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `date_save` datetime(0) NULL DEFAULT NULL,
  `proprietaire` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `debut_activite` date NULL DEFAULT NULL,
  `production_moyenne` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `masse_salariale` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `chiffre_affaire` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `valeur_investissement` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `capaciteMachine` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `raison_sociale` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `nationaliteProprietaire` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `numeroServiceUrbain` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `responsable` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idSociete`) USING BTREE,
  UNIQUE INDEX `nom_UNIQUE`(`nom`) USING BTREE,
  INDEX `fk_tblSociete_tblarticlebudgetaire1_idx`(`idArticleBudgetaire`) USING BTREE,
  CONSTRAINT `fk_tblSociete_tblarticlebudgetaire1` FOREIGN KEY (`idArticleBudgetaire`) REFERENCES `article_budgetaire` (`id_article_budgetaire`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of societe
-- ----------------------------

-- ----------------------------
-- Table structure for tarif
-- ----------------------------
DROP TABLE IF EXISTS `tarif`;
CREATE TABLE `tarif`  (
  `idTarif` int(11) NOT NULL AUTO_INCREMENT,
  `id_taxe` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `id_article_budgetaire` int(11) NOT NULL,
  `id_exercice` int(11) NOT NULL,
  `echeance` int(1) NULL DEFAULT NULL,
  `montant` decimal(18, 2) NOT NULL,
  `devise` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idTarif`) USING BTREE,
  INDEX `fk_tblTarif_Categorie1_idx`(`id_categorie`) USING BTREE,
  INDEX `fk_tblTarif_tblArticleBudgetaire1`(`id_article_budgetaire`) USING BTREE,
  INDEX `fk_tbltarif_tblExercice1_idx`(`id_exercice`) USING BTREE,
  INDEX `fk_tblTarif_tblTaxe1`(`id_taxe`) USING BTREE,
  CONSTRAINT `fk_tblTarif_Categorie1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tblTarif_tblArticleBudgetaire1` FOREIGN KEY (`id_article_budgetaire`) REFERENCES `article_budgetaire` (`id_article_budgetaire`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tblTarif_tblTaxe1` FOREIGN KEY (`id_taxe`) REFERENCES `taxe` (`id_taxe`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbltarif_tblexercice1` FOREIGN KEY (`id_exercice`) REFERENCES `exercice` (`id_exercice`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 108 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tarif
-- ----------------------------
INSERT INTO `tarif` VALUES (1, 1, 1, 5, 1, 1, 45000.00, 'CDF');
INSERT INTO `tarif` VALUES (2, 1, 1, 6, 1, 1, 60000.00, 'CDF');
INSERT INTO `tarif` VALUES (3, 1, 1, 7, 1, 1, 60000.00, 'CDF');
INSERT INTO `tarif` VALUES (4, 1, 1, 8, 1, 1, 70000.00, 'CDF');
INSERT INTO `tarif` VALUES (5, 1, 1, 9, 1, 1, 70000.00, 'CDF');
INSERT INTO `tarif` VALUES (6, 1, 1, 10, 1, 1, 80000.00, 'CDF');
INSERT INTO `tarif` VALUES (7, 1, 1, 11, 1, 1, 80000.00, 'CDF');
INSERT INTO `tarif` VALUES (8, 1, 2, 1, 1, 1, 25000.00, 'CDF');
INSERT INTO `tarif` VALUES (9, 1, 2, 2, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (10, 1, 2, 3, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (11, 1, 2, 4, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (12, 1, 2, 5, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (13, 1, 2, 6, 1, 1, 60000.00, 'CDF');
INSERT INTO `tarif` VALUES (14, 1, 2, 7, 1, 1, 60000.00, 'CDF');
INSERT INTO `tarif` VALUES (15, 1, 2, 8, 1, 1, 70000.00, 'CDF');
INSERT INTO `tarif` VALUES (16, 1, 2, 9, 1, 1, 70000.00, 'CDF');
INSERT INTO `tarif` VALUES (17, 1, 2, 10, 1, 1, 80000.00, 'CDF');
INSERT INTO `tarif` VALUES (18, 1, 2, 11, 1, 1, 80000.00, 'CDF');
INSERT INTO `tarif` VALUES (19, 1, 2, 13, 1, 1, 10000.00, 'CDF');
INSERT INTO `tarif` VALUES (20, 2, 1, 12, 1, 1, 0.00, 'CDF');
INSERT INTO `tarif` VALUES (21, 2, 1, 25, 1, 1, 70000.00, 'CDF');
INSERT INTO `tarif` VALUES (32, 2, 1, 26, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (33, 2, 1, 27, 1, 1, 210000.00, 'CDF');
INSERT INTO `tarif` VALUES (34, 2, 1, 28, 1, 1, 110000.00, 'CDF');
INSERT INTO `tarif` VALUES (35, 2, 1, 29, 1, 1, 210000.00, 'CDF');
INSERT INTO `tarif` VALUES (36, 2, 1, 30, 1, 1, 110000.00, 'CDF');
INSERT INTO `tarif` VALUES (37, 2, 1, 31, 1, 1, 80000.00, 'CDF');
INSERT INTO `tarif` VALUES (38, 2, 1, 32, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (39, 2, 1, 33, 1, 1, 210000.00, 'CDF');
INSERT INTO `tarif` VALUES (40, 2, 1, 34, 1, 1, 110000.00, 'CDF');
INSERT INTO `tarif` VALUES (41, 2, 1, 34, 1, 1, 70000.00, 'CDF');
INSERT INTO `tarif` VALUES (42, 2, 1, 36, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (43, 2, 1, 37, 1, 1, 110000.00, 'CDF');
INSERT INTO `tarif` VALUES (44, 2, 1, 38, 1, 1, 50000.00, 'CDF');
INSERT INTO `tarif` VALUES (45, 2, 1, 39, 1, 1, 80000.00, 'CDF');
INSERT INTO `tarif` VALUES (46, 2, 1, 40, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (47, 2, 1, 41, 1, 1, 110000.00, 'CDF');
INSERT INTO `tarif` VALUES (48, 2, 1, 42, 1, 1, 15600.00, 'CDF');
INSERT INTO `tarif` VALUES (49, 2, 1, 43, 1, 1, 150000.00, 'CDF');
INSERT INTO `tarif` VALUES (50, 2, 1, 44, 1, 1, 80000.00, 'CDF');
INSERT INTO `tarif` VALUES (51, 3, 1, 5, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (52, 3, 2, 14, 1, 1, 30000.00, 'CDF');
INSERT INTO `tarif` VALUES (53, 3, 2, 15, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (54, 3, 2, 16, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (55, 3, 2, 17, 1, 1, 40000.00, 'CDF');
INSERT INTO `tarif` VALUES (56, 3, 2, 18, 1, 1, 50000.00, 'CDF');
INSERT INTO `tarif` VALUES (57, 3, 2, 19, 1, 1, 75000.00, 'CDF');
INSERT INTO `tarif` VALUES (58, 3, 2, 20, 1, 1, 50000.00, 'CDF');
INSERT INTO `tarif` VALUES (59, 3, 2, 21, 1, 1, 10000.00, 'CDF');
INSERT INTO `tarif` VALUES (60, 13, 2, 22, 1, 1, 20000.00, 'CDF');
INSERT INTO `tarif` VALUES (61, 13, 2, 23, 1, 1, 30000.00, 'CDF');
INSERT INTO `tarif` VALUES (62, 13, 2, 24, 1, 1, 15000.00, 'CDF');
INSERT INTO `tarif` VALUES (63, 14, 1, 45, 1, 1, 25000.00, 'CDF');
INSERT INTO `tarif` VALUES (64, 14, 1, 46, 1, 1, 47000.00, 'CDF');
INSERT INTO `tarif` VALUES (65, 14, 1, 47, 1, 1, 75000.00, 'CDF');
INSERT INTO `tarif` VALUES (66, 14, 1, 48, 1, 1, 94000.00, 'CDF');
INSERT INTO `tarif` VALUES (67, 14, 1, 49, 1, 1, 120000.00, 'CDF');
INSERT INTO `tarif` VALUES (68, 14, 1, 50, 1, 1, 150000.00, 'CDF');
INSERT INTO `tarif` VALUES (69, 14, 1, 51, 1, 1, 200000.00, 'CDF');
INSERT INTO `tarif` VALUES (70, 1, 1, 1, 1, 1, 35000.00, 'CDF');
INSERT INTO `tarif` VALUES (71, 1, 1, 2, 1, 1, 45000.00, 'CDF');
INSERT INTO `tarif` VALUES (72, 1, 1, 3, 1, 1, 45001.00, 'CDF');
INSERT INTO `tarif` VALUES (73, 1, 2, 4, 1, 2, 45000.00, 'CDF');
INSERT INTO `tarif` VALUES (74, 15, 2, 1, 1, 1, 65.00, 'USD');
INSERT INTO `tarif` VALUES (75, 15, 2, 1, 1, 2, 95.00, 'USD');
INSERT INTO `tarif` VALUES (76, 15, 1, 1, 1, 1, 120.00, 'USD');
INSERT INTO `tarif` VALUES (77, 15, 1, 1, 1, 2, 145.00, 'USD');
INSERT INTO `tarif` VALUES (78, 15, 1, 2, 1, 1, 145.00, 'USD');
INSERT INTO `tarif` VALUES (79, 15, 2, 2, 1, 1, 145.00, 'USD');
INSERT INTO `tarif` VALUES (80, 15, 2, 2, 1, 2, 75.00, 'USD');
INSERT INTO `tarif` VALUES (81, 15, 1, 2, 1, 2, 75.00, 'USD');
INSERT INTO `tarif` VALUES (82, 1, 1, 4, 1, 1, 45500.00, 'CDF');
INSERT INTO `tarif` VALUES (83, 15, 2, 4, 1, 1, 180.00, 'USD');
INSERT INTO `tarif` VALUES (84, 15, 1, 4, 1, 1, 210.00, 'USD');
INSERT INTO `tarif` VALUES (85, 16, 1, 52, 1, 1, 35000.00, 'CDF');
INSERT INTO `tarif` VALUES (86, 16, 1, 53, 1, 1, 45000.00, 'CDF');
INSERT INTO `tarif` VALUES (87, 7, 2, 54, 1, 1, 45000.00, 'CDF');
INSERT INTO `tarif` VALUES (88, 17, 1, 55, 1, NULL, 35000.00, 'CDF');
INSERT INTO `tarif` VALUES (89, 17, 1, 56, 1, NULL, 25000.00, 'CDF');
INSERT INTO `tarif` VALUES (90, 17, 1, 57, 1, NULL, 45000.00, 'CDF');
INSERT INTO `tarif` VALUES (91, 17, 1, 58, 1, NULL, 55000.00, 'CDF');
INSERT INTO `tarif` VALUES (92, 15, 1, 3, 1, 1, 70.00, 'USD');
INSERT INTO `tarif` VALUES (93, 15, 1, 3, 1, 2, 95.00, 'USD');
INSERT INTO `tarif` VALUES (94, 15, 2, 7, 1, 2, 140.00, 'USD');
INSERT INTO `tarif` VALUES (95, 15, 2, 7, 1, 1, 70.00, 'USD');
INSERT INTO `tarif` VALUES (96, 15, 1, 7, 1, 1, 70.00, 'USD');
INSERT INTO `tarif` VALUES (97, 15, 1, 7, 1, 2, 140.00, 'USD');
INSERT INTO `tarif` VALUES (98, 15, 2, 9, 1, 2, 180.00, 'USD');
INSERT INTO `tarif` VALUES (99, 15, 2, 3, 1, 1, 70.00, 'USD');
INSERT INTO `tarif` VALUES (100, 15, 2, 3, 1, 2, 120.00, 'USD');
INSERT INTO `tarif` VALUES (101, 15, 2, 5, 1, 1, 70.00, 'USD');
INSERT INTO `tarif` VALUES (102, 15, 2, 5, 1, 2, 120.00, 'USD');
INSERT INTO `tarif` VALUES (103, 15, 1, 5, 1, 1, 70.00, 'USD');
INSERT INTO `tarif` VALUES (104, 15, 1, 5, 1, 2, 120.00, 'USD');
INSERT INTO `tarif` VALUES (105, 15, 1, 9, 1, 2, 160.00, 'USD');
INSERT INTO `tarif` VALUES (106, 15, 1, 9, 1, 1, 80.00, 'USD');
INSERT INTO `tarif` VALUES (107, 3, 2, 3, 1, 1, 45000.00, 'USD');

-- ----------------------------
-- Table structure for tarif_detail_montant
-- ----------------------------
DROP TABLE IF EXISTS `tarif_detail_montant`;
CREATE TABLE `tarif_detail_montant`  (
  `id_tarif` int(11) NOT NULL,
  `id_detail_tarif` int(11) NOT NULL,
  `montant` decimal(18, 2) NOT NULL,
  PRIMARY KEY (`id_tarif`, `id_detail_tarif`) USING BTREE,
  INDEX `fk_tbltarif_detail_montant_tbldetail_tarif1_idx`(`id_detail_tarif`) USING BTREE,
  CONSTRAINT `fk_tbltarif_detail_montant_tbldetail_tarif1` FOREIGN KEY (`id_detail_tarif`) REFERENCES `detail_tarif` (`id_detail`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbltarif_detail_montant_tbltarif1` FOREIGN KEY (`id_tarif`) REFERENCES `tarif` (`idTarif`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tarif_detail_montant
-- ----------------------------

-- ----------------------------
-- Table structure for taux
-- ----------------------------
DROP TABLE IF EXISTS `taux`;
CREATE TABLE `taux`  (
  `idtaux` int(11) NOT NULL AUTO_INCREMENT,
  `valeur` double(18, 2) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`idtaux`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 321 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of taux
-- ----------------------------
INSERT INTO `taux` VALUES (318, 1800.00, '2020-09-10');
INSERT INTO `taux` VALUES (319, 1900.00, '2020-09-08');
INSERT INTO `taux` VALUES (320, 2000.00, '2020-09-09');

-- ----------------------------
-- Table structure for taxation
-- ----------------------------
DROP TABLE IF EXISTS `taxation`;
CREATE TABLE `taxation`  (
  `id_taxation` int(11) NOT NULL AUTO_INCREMENT,
  `id_exercice` int(11) NOT NULL,
  `id_taxe` int(11) NOT NULL,
  `id_site` int(10) NOT NULL,
  `num_taxation` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `date_taxation` datetime(0) NOT NULL,
  `id_agent` int(11) NOT NULL,
  `nom_declarant` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telephone_declarant` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `montant` int(11) NULL DEFAULT NULL,
  `montant_global` int(11) NULL DEFAULT NULL,
  `devise` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `id_compte` int(11) NULL DEFAULT NULL,
  `taux` double(18, 2) NULL DEFAULT NULL,
  `date_validation` datetime(0) NULL DEFAULT NULL,
  `id_validateur` int(11) NULL DEFAULT NULL,
  `state` enum('tax','ord','att') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'tax',
  `active` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'true',
  `date_creation` datetime(0) NULL DEFAULT NULL,
  `id_contribuable` int(11) NULL DEFAULT NULL,
  `penalite` int(11) NULL DEFAULT 0,
  `avis` enum('favorable','non favorable') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'favorable',
  `nombre_acte` int(11) NULL DEFAULT NULL,
  `echeance` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_taxation`) USING BTREE,
  INDEX `fk_tblTaxation_tblTaxe1_idx`(`id_taxe`) USING BTREE,
  INDEX `fk_tbltaxation_tblexercice1_idx`(`id_exercice`) USING BTREE,
  INDEX `fk_tblTaxation_tblville`(`id_site`) USING BTREE,
  INDEX `id_agent`(`id_agent`) USING BTREE,
  INDEX `id_compte`(`id_compte`) USING BTREE,
  INDEX `id_validateur`(`id_validateur`) USING BTREE,
  INDEX `id_contribuable`(`id_contribuable`) USING BTREE,
  CONSTRAINT `fk_tblTaxation_tblTaxe1` FOREIGN KEY (`id_taxe`) REFERENCES `taxe` (`id_taxe`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tblTaxation_tblville` FOREIGN KEY (`id_site`) REFERENCES `site` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbltaxation_tblexercice1` FOREIGN KEY (`id_exercice`) REFERENCES `exercice` (`id_exercice`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `taxation_ibfk_2` FOREIGN KEY (`id_agent`) REFERENCES `agent` (`id_agent`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `taxation_ibfk_3` FOREIGN KEY (`id_compte`) REFERENCES `compte` (`id_compte`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `taxation_ibfk_4` FOREIGN KEY (`id_validateur`) REFERENCES `agent` (`id_agent`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `taxation_ibfk_6` FOREIGN KEY (`id_contribuable`) REFERENCES `contribuable` (`id_contribuable`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 61 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of taxation
-- ----------------------------
INSERT INTO `taxation` VALUES (55, 1, 1, 41, '1055/TD/2020', '2020-09-15 16:26:40', 18, 'malonda', '+243', 25000, 27500, 'CDF', 1, 1800.00, '2020-09-17 08:50:41', 18, 'att', 'true', '2020-09-15 16:26:40', 22, 10, 'favorable', 1, '1');
INSERT INTO `taxation` VALUES (58, 1, 1, 41, '1058/TD/2020', '2020-09-15 18:31:09', 18, 'malonda', '+243', 25000, 27500, 'CDF', NULL, 1800.00, NULL, NULL, 'tax', 'true', '2020-09-15 18:31:09', 22, 10, 'favorable', 1, '1');
INSERT INTO `taxation` VALUES (59, 1, 15, 41, '1059/CTCH/2020', '2020-09-15 19:14:54', 18, 'BRIELLE', '+243', 95, 143, 'USD', NULL, 1800.00, NULL, NULL, 'tax', 'true', '2020-09-15 19:14:54', 23, 50, 'favorable', 1, '2');
INSERT INTO `taxation` VALUES (60, 1, 1, 41, '1060/TD/2020', '2020-09-17 08:41:14', 18, 'malonda', '+243', 25000, 27500, 'CDF', NULL, 1800.00, NULL, NULL, 'tax', 'true', '2020-09-17 08:41:14', 23, 10, 'favorable', 1, '1');

-- ----------------------------
-- Table structure for taxe
-- ----------------------------
DROP TABLE IF EXISTS `taxe`;
CREATE TABLE `taxe`  (
  `id_taxe` int(11) NOT NULL AUTO_INCREMENT,
  `id_type_objet` int(11) NOT NULL,
  `id_service_assiette` int(11) NOT NULL,
  `designation` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `libelle` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `delai_jour` int(11) NOT NULL,
  `designation_document` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `periodicite` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `active` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'true',
  PRIMARY KEY (`id_taxe`) USING BTREE,
  INDEX `fk_tblTaxe_tblTypeObjet2`(`id_type_objet`) USING BTREE,
  INDEX `fk_tbltaxe_tblServiceAssiette1_idx`(`id_service_assiette`) USING BTREE,
  CONSTRAINT `fk_tblTaxe_tblTypeObjet2` FOREIGN KEY (`id_type_objet`) REFERENCES `type_objet` (`id_type_objet`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tbltaxe_tblServiceAssiette1` FOREIGN KEY (`id_service_assiette`) REFERENCES `service_assiette` (`id_serviceAssiette`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of taxe
-- ----------------------------
INSERT INTO `taxe` VALUES (1, 1, 1, 'TAXE DE STATIONNEMENT ANNUEL DANS LA VILLE 2020', 'TD', 'libelleXXX', 7, 'STATIONNEMENT DANS LA VILLE', NULL, 'true');
INSERT INTO `taxe` VALUES (2, 3, 2, 'FICHE DE RECENSEMENT', 'FR', 'libelleXXX', 7, 'FICHE DE RECENSEMENT PME', NULL, 'true');
INSERT INTO `taxe` VALUES (3, 1, 1, 'AUTORISATION DE TRANSPORT', 'AUTO', 'libelleXXX', 7, 'AUTORISATION DE TRANSPORT URBAIN VEHICULE', NULL, 'true');
INSERT INTO `taxe` VALUES (4, 3, 1, 'CERTIFICAT ENREGISTREMENT', 'CE', 'libelleXXX', 7, 'CERTIFICAT D\'ENREGISTREMENT ANNUEL', NULL, 'true');
INSERT INTO `taxe` VALUES (5, 3, 2, 'OUVERTURE ACTIVITE', 'OA', 'libelleXXX', 7, 'PERMIS D\'OUVERTURE D\'UNE ACTIVITE COMMERCIALE, ARTISANALE', NULL, 'true');
INSERT INTO `taxe` VALUES (6, 3, 2, 'LICENCE', 'LL', 'libelleXXX', 7, 'LICENCE DE VENTE DES PRODUITS ET BOISSONS FABRIQUES A BASE D\'ALCOOL.', NULL, 'true');
INSERT INTO `taxe` VALUES (7, 2, 2, 'AUTORISATION ACCES CIMETIERE', 'AU', 'libelleXXX', 7, 'AUTORISATION ACCES CIMETIERE', NULL, 'true');
INSERT INTO `taxe` VALUES (8, 2, 2, 'AUTORISATION DE SORTIE', 'AS', 'libelleXXX', 7, 'AUTORISATION DE SORTIE', NULL, 'true');
INSERT INTO `taxe` VALUES (9, 1, 2, 'AUTORISATION TAXI MOTO', 'TM', 'libelleXXX', 7, 'AUTORISATION TAXI MOTO', NULL, 'true');
INSERT INTO `taxe` VALUES (10, 3, 2, 'TAXE D\'ASSAINISSEMENT', 'TA', 'libelleXXX', 7, 'TAXE ASSAINISSEMENT', NULL, 'true');
INSERT INTO `taxe` VALUES (11, 2, 3, 'TAXE D\'INHUMATION', 'INH', 'libelleXXX', 7, 'EXPLOITATION DES CASINOS', NULL, 'true');
INSERT INTO `taxe` VALUES (12, 1, 1, 'ANNUEL', 'STAT', '', 7, 'STATION    NEMENT', NULL, 'true');
INSERT INTO `taxe` VALUES (13, 1, 1, 'TAXE SUR LA NUMEROTATION DE TRANSPORT EN COMMUN DANS LA VILLE DE LUBUMBASHI', 'NUM', '', 7, 'NUMEROTATION', NULL, 'true');
INSERT INTO `taxe` VALUES (14, 3, 2, 'RECENSEMENT ANUEL DES PETITES ET MOYENNES INDUSTRIES', 'PMI', '', 8, 'RECENSEMENT ANNUEL DES PETITES ET MOYENNES INDUSTRIES', NULL, 'true');
INSERT INTO `taxe` VALUES (15, 1, 1, 'CONTROLE TECHNIQUE', 'CTCH', 'TEST', 7, 'CERTIFICAT DE CONTROLE TECHNIQUE', NULL, 'true');
INSERT INTO `taxe` VALUES (16, 3, 2, '-', 'PTE', '', 7, 'PATENTE', NULL, 'true');
INSERT INTO `taxe` VALUES (17, 4, 4, 'PATENTE', 'P.01', '', 7, 'DOCUMENT PATENTE', NULL, 'true');

-- ----------------------------
-- Table structure for type_objet
-- ----------------------------
DROP TABLE IF EXISTS `type_objet`;
CREATE TABLE `type_objet`  (
  `id_type_objet` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_type_objet`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of type_objet
-- ----------------------------
INSERT INTO `type_objet` VALUES (1, 'VEHICULE', NULL);
INSERT INTO `type_objet` VALUES (2, 'PERSONNE', NULL);
INSERT INTO `type_objet` VALUES (3, 'SOCIETE', NULL);
INSERT INTO `type_objet` VALUES (4, 'PATENTE', NULL);

-- ----------------------------
-- Table structure for vehicule
-- ----------------------------
DROP TABLE IF EXISTS `vehicule`;
CREATE TABLE `vehicule`  (
  `id_vehicule` int(11) NOT NULL AUTO_INCREMENT,
  `id_article_budgetaire` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `id_contribuable` int(11) NOT NULL,
  `numero_chassis` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `numero_plaque` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `model` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `marque` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `couleur` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `charge_utile` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `mise_en_circulation` date NOT NULL,
  `date_creation` datetime(0) NULL DEFAULT NULL,
  `active` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'true',
  `id_agent` int(11) NULL DEFAULT NULL,
  `id_site` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id_vehicule`) USING BTREE,
  UNIQUE INDEX `numeroChassis_UNIQUE`(`numero_chassis`) USING BTREE,
  UNIQUE INDEX `numeroPlaque_UNIQUE`(`numero_plaque`) USING BTREE,
  INDEX `fk_tblVehicule_tblcategorie1_idx`(`id_categorie`) USING BTREE,
  INDEX `fk_tblVehicule_tblarticlebudgetaire1_idx`(`id_article_budgetaire`) USING BTREE,
  INDEX `fk_tblvehicule_tblpersonne`(`id_contribuable`) USING BTREE,
  INDEX `id_agent`(`id_agent`) USING BTREE,
  INDEX `id_site`(`id_site`) USING BTREE,
  CONSTRAINT `fk_tblVehicule_tblarticlebudgetaire1` FOREIGN KEY (`id_article_budgetaire`) REFERENCES `article_budgetaire` (`id_article_budgetaire`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tblVehicule_tblcategorie1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `vehicule_ibfk_1` FOREIGN KEY (`id_contribuable`) REFERENCES `contribuable` (`id_contribuable`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `vehicule_ibfk_2` FOREIGN KEY (`id_agent`) REFERENCES `agent` (`id_agent`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `vehicule_ibfk_3` FOREIGN KEY (`id_site`) REFERENCES `site` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vehicule
-- ----------------------------
INSERT INTO `vehicule` VALUES (16, 1, 2, 22, 'super!!!!', 'zazazazazazaz', 'azazaza', 'TOYOTA', 'blue', '17tb', '2020-09-02', '2020-09-15 14:58:57', 'true', 18, 41);
INSERT INTO `vehicule` VALUES (17, 1, 2, 23, 'fhuj5968522', 'bz8569', 'QQD', 'DQD', 'QDD', 'DQDQ', '2020-01-08', '2020-09-15 19:14:16', 'true', 18, 41);

-- ----------------------------
-- View structure for v_all_agent
-- ----------------------------
DROP VIEW IF EXISTS `v_all_agent`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_all_agent` AS select `agent`.`id_agent` AS `id_agent`,`agent`.`nom` AS `nom`,`agent`.`prenom` AS `prenom`,`agent`.`matricule` AS `matricule`,`agent`.`sexe` AS `sexe`,`agent`.`login` AS `login`,`agent`.`password` AS `password`,`agent`.`id_site` AS `id_site`,`agent`.`peutTaxer` AS `peutTaxer`,`agent`.`peutApurer` AS `peutApurer`,`agent`.`id_fonction` AS `id_fonction`,`agent`.`peutEncoder` AS `peutEncoder`,`agent`.`peutOrdonnancer` AS `peutOrdonnancer`,`agent`.`peutAdministrer` AS `peutAdministrer`,`agent`.`peutFaireRapport` AS `peutFaireRapport`,`agent`.`peutImprimer` AS `peutImprimer`,`agent`.`peutSite` AS `peutSite`,`agent`.`peutStock` AS `peutStock`,`agent`.`active` AS `active`,`agent`.`slug` AS `slug`,`fonction`.`libelle_fonction` AS `libelle_fonction`,`site`.`lieu` AS `lieu`,`site`.`id_commune` AS `id_commune` from ((`agent` join `fonction` on(`agent`.`id_fonction` = `fonction`.`id_fonction`)) join `site` on(`agent`.`id_site` = `site`.`id`));

-- ----------------------------
-- View structure for v_all_commune
-- ----------------------------
DROP VIEW IF EXISTS `v_all_commune`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_all_commune` AS select `commune`.`id_commune` AS `id_commune`,`commune`.`libelle_commune` AS `libelle_commune`,`commune`.`id_district` AS `id_district`,`district`.`libelle_district` AS `libelle_district` from (`commune` join `district` on(`commune`.`id_district` = `district`.`id_district`));

-- ----------------------------
-- View structure for v_all_compte
-- ----------------------------
DROP VIEW IF EXISTS `v_all_compte`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_all_compte` AS select `compte`.`num_compte` AS `num_compte`,`compte`.`id_compte` AS `id_compte`,`compte`.`id_banque` AS `id_banque`,`banque`.`libelle_banque` AS `libelle_banque`,`banque`.`active` AS `active` from (`compte` join `banque` on(`compte`.`id_banque` = `banque`.`id_banque`));

-- ----------------------------
-- View structure for v_all_contribuable
-- ----------------------------
DROP VIEW IF EXISTS `v_all_contribuable`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_all_contribuable` AS select `contribuable`.`id_contribuable` AS `id_contribuable`,`contribuable`.`nom` AS `nom`,`contribuable`.`telephone` AS `telephone`,`contribuable`.`ville` AS `ville`,`district`.`libelle_district` AS `libelle_district`,`commune`.`libelle_commune` AS `libelle_commune`,`quartier`.`libelle_quartier` AS `libelle_quartier`,`contribuable`.`avenue` AS `avenue`,`contribuable`.`numero` AS `numero`,`contribuable`.`date_creation` AS `date_creation`,`contribuable`.`active` AS `active`,`contribuable`.`id_site` AS `id_site`,`contribuable`.`id_agent` AS `id_agent`,`contribuable`.`observation` AS `observation`,`contribuable`.`id_district` AS `id_district`,`contribuable`.`id_commune` AS `id_commune`,`contribuable`.`id_quartier` AS `id_quartier` from (((`contribuable` join `quartier` on(`contribuable`.`id_quartier` = `quartier`.`id_quartier`)) join `commune` on(`contribuable`.`id_commune` = `commune`.`id_commune`)) join `district` on(`contribuable`.`id_district` = `district`.`id_district`));

-- ----------------------------
-- View structure for v_all_contribuables_contains_vehicules
-- ----------------------------
DROP VIEW IF EXISTS `v_all_contribuables_contains_vehicules`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_all_contribuables_contains_vehicules` AS select `contribuable`.`id_contribuable` AS `id_contribuable`,`contribuable`.`nom` AS `nom` from (`contribuable` join `vehicule` on(`contribuable`.`id_contribuable` = `vehicule`.`id_contribuable`)) group by `contribuable`.`id_contribuable`;

-- ----------------------------
-- View structure for v_all_quartier
-- ----------------------------
DROP VIEW IF EXISTS `v_all_quartier`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_all_quartier` AS select `quartier`.`id_quartier` AS `id_quartier`,`quartier`.`libelle_quartier` AS `libelle_quartier`,`quartier`.`id_commune` AS `id_commune`,`commune`.`libelle_commune` AS `libelle_commune` from (`quartier` join `commune` on(`quartier`.`id_commune` = `commune`.`id_commune`));

-- ----------------------------
-- View structure for v_all_tarif
-- ----------------------------
DROP VIEW IF EXISTS `v_all_tarif`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_all_tarif` AS select `tarif`.`montant` AS `montant`,`taxe`.`description` AS `code_taxe`,`tarif`.`id_taxe` AS `id_taxe`,`tarif`.`id_categorie` AS `id_categorie`,`tarif`.`id_article_budgetaire` AS `id_article_budgetaire`,`tarif`.`id_exercice` AS `id_exercice`,`exercice`.`annee` AS `exercice`,`tarif`.`devise` AS `devise`,`tarif`.`echeance` AS `echeance` from ((`tarif` join `taxe` on(`tarif`.`id_taxe` = `taxe`.`id_taxe`)) join `exercice` on(`tarif`.`id_exercice` = `exercice`.`id_exercice`));

-- ----------------------------
-- View structure for v_all_taxation
-- ----------------------------
DROP VIEW IF EXISTS `v_all_taxation`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_all_taxation` AS select `taxation`.`id_taxation` AS `id_taxation`,`taxation`.`id_exercice` AS `id_exercice`,`taxation`.`id_taxe` AS `id_taxe`,`taxation`.`id_site` AS `id_site`,`taxation`.`devise` AS `devise`,`taxation`.`num_taxation` AS `num_taxation`,date_format(`taxation`.`date_taxation`,'%d-%m-%Y') AS `date_taxation`,`taxation`.`taux` AS `taux`,`taxation`.`date_creation` AS `date_creation`,`taxation`.`active` AS `active`,`taxation`.`state` AS `state`,`taxation`.`date_validation` AS `date_validation`,`exercice`.`annee` AS `exercice`,`site`.`lieu` AS `lieu`,`taxateur`.`nom` AS `nom_taxateur`,`taxateur`.`prenom` AS `prenom_taxateur`,`validateur`.`nom` AS `nom_validateur`,`validateur`.`prenom` AS `prenom_validateur`,`taxation`.`id_contribuable` AS `id_contribuable`,`contribuable`.`nom` AS `redevable`,`taxation`.`montant` AS `montant`,`taxe`.`description` AS `description`,`taxation`.`penalite` AS `penalite`,`taxe`.`designation` AS `taxe`,`taxation`.`telephone_declarant` AS `telephone_declarant`,`taxation`.`nom_declarant` AS `nom_declarant`,`taxation`.`nombre_acte` AS `nombre_acte`,`taxation`.`avis` AS `avis`,`taxation`.`id_validateur` AS `id_validateur`,`taxation`.`id_compte` AS `id_compte`,`taxation`.`id_agent` AS `id_agent`,`detail_taxation`.`id_vehicule` AS `id_vehicule`,`vehicule`.`numero_chassis` AS `numero_chassis`,`vehicule`.`numero_plaque` AS `numero_plaque`,`vehicule`.`model` AS `model`,`vehicule`.`marque` AS `marque`,`vehicule`.`couleur` AS `couleur`,`vehicule`.`charge_utile` AS `charge_utile`,`taxation`.`echeance` AS `echeance`,`taxation`.`montant_global` AS `montant_global` from ((((((((`taxation` join `exercice` on(`taxation`.`id_exercice` = `exercice`.`id_exercice`)) join `taxe` on(`taxation`.`id_taxe` = `taxe`.`id_taxe`)) join `site` on(`taxation`.`id_site` = `site`.`id`)) left join `agent` `taxateur` on(`taxation`.`id_agent` = `taxateur`.`id_agent`)) left join `agent` `validateur` on(`taxation`.`id_validateur` = `validateur`.`id_agent`)) join `contribuable` on(`taxation`.`id_contribuable` = `contribuable`.`id_contribuable`)) join `detail_taxation` on(`taxation`.`id_taxation` = `detail_taxation`.`id_taxation`)) join `vehicule` on(`detail_taxation`.`id_vehicule` = `vehicule`.`id_vehicule`)) group by `taxation`.`id_taxation`;

-- ----------------------------
-- View structure for v_all_taxe_articles
-- ----------------------------
DROP VIEW IF EXISTS `v_all_taxe_articles`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_all_taxe_articles` AS select `taxe`.`designation` AS `taxe`,`type_objet`.`designation` AS `type_objet`,`type_objet`.`id_type_objet` AS `id_type_objet`,`article_budgetaire`.`designation` AS `article_budgetaire`,`article_budgetaire`.`id_article_budgetaire` AS `id_article_budgetaire`,`taxe`.`id_taxe` AS `id_taxe` from (`article_budgetaire` left join (`taxe` join `type_objet` on(`taxe`.`id_type_objet` = `type_objet`.`id_type_objet`)) on(`type_objet`.`id_type_objet` = `article_budgetaire`.`id_type_objet`)) where `type_objet`.`id_type_objet` = 1;

-- ----------------------------
-- View structure for v_all_vehicule
-- ----------------------------
DROP VIEW IF EXISTS `v_all_vehicule`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_all_vehicule` AS select `vehicule`.`id_vehicule` AS `id_vehicule`,`article_budgetaire`.`designation` AS `article_budgetaire`,`categorie`.`designation` AS `categorie`,`contribuable`.`nom` AS `nom`,`vehicule`.`numero_chassis` AS `numero_chassis`,`vehicule`.`numero_plaque` AS `numero_plaque`,`vehicule`.`model` AS `model`,`vehicule`.`marque` AS `marque`,`vehicule`.`couleur` AS `couleur`,`vehicule`.`charge_utile` AS `charge_utile`,`vehicule`.`mise_en_circulation` AS `mise_en_circulation`,`vehicule`.`active` AS `active`,`vehicule`.`date_creation` AS `date_creation`,`vehicule`.`id_agent` AS `id_agent`,`vehicule`.`id_site` AS `id_site`,`vehicule`.`id_contribuable` AS `id_contribuable`,`vehicule`.`id_categorie` AS `id_categorie`,`vehicule`.`id_article_budgetaire` AS `id_article_budgetaire` from (((`vehicule` join `article_budgetaire` on(`vehicule`.`id_article_budgetaire` = `article_budgetaire`.`id_article_budgetaire`)) join `categorie` on(`vehicule`.`id_categorie` = `categorie`.`id_categorie`)) join `contribuable` on(`vehicule`.`id_contribuable` = `contribuable`.`id_contribuable`));

-- ----------------------------
-- View structure for v_all_vehicules_taxations
-- ----------------------------
DROP VIEW IF EXISTS `v_all_vehicules_taxations`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_all_vehicules_taxations` AS select `detail_taxation`.`montant` AS `montant`,`detail_taxation`.`devise` AS `devise`,`taxation`.`id_taxation` AS `id_taxation`,`vehicule`.`numero_chassis` AS `numero_chassis`,`vehicule`.`numero_plaque` AS `numero_plaque`,`vehicule`.`model` AS `model`,`vehicule`.`marque` AS `marque`,`vehicule`.`couleur` AS `couleur`,`vehicule`.`charge_utile` AS `charge_utile`,`article_budgetaire`.`designation` AS `designation` from (((`taxation` join `detail_taxation` on(`taxation`.`id_taxation` = `detail_taxation`.`id_taxation`)) join `vehicule` on(`detail_taxation`.`id_vehicule` = `vehicule`.`id_vehicule`)) join `article_budgetaire` on(`vehicule`.`id_article_budgetaire` = `article_budgetaire`.`id_article_budgetaire`));

-- ----------------------------
-- View structure for v_check_taxation
-- ----------------------------
DROP VIEW IF EXISTS `v_check_taxation`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_check_taxation` AS select `taxation`.`id_taxe` AS `id_taxe`,`detail_taxation`.`id_vehicule` AS `id_vehicule`,`vehicule`.`id_article_budgetaire` AS `id_article_budgetaire`,`vehicule`.`numero_chassis` AS `numero_chassis`,`vehicule`.`numero_plaque` AS `numero_plaque`,`taxe`.`designation` AS `taxe` from (((`taxation` join `detail_taxation` on(`taxation`.`id_taxation` = `detail_taxation`.`id_taxation`)) join `vehicule` on(`detail_taxation`.`id_vehicule` = `vehicule`.`id_vehicule`)) join `taxe` on(`taxation`.`id_taxe` = `taxe`.`id_taxe`));

-- ----------------------------
-- View structure for v_id_taxation_tarif
-- ----------------------------
DROP VIEW IF EXISTS `v_id_taxation_tarif`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_id_taxation_tarif` AS select `vehicule`.`id_article_budgetaire` AS `id_article_budgetaire`,`vehicule`.`id_categorie` AS `id_categorie`,`taxation`.`id_taxe` AS `id_taxe`,`ngds`.`taxation`.`id_vehicule` AS `id_vehicule` from (`taxation` join `vehicule` on(`ngds`.`taxation`.`id_vehicule` = `ngds`.`vehicule`.`id_vehicule`)) group by `ngds`.`taxation`.`id_vehicule`;

-- ----------------------------
-- View structure for v_note_calcul
-- ----------------------------
DROP VIEW IF EXISTS `v_note_calcul`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_note_calcul` AS select `taxe`.`designation` AS `acte_generateur`,`service_assiette`.`designation` AS `service_taxateur`,`taxation`.`num_taxation` AS `num_taxation`,`taxation`.`nombre_acte` AS `nombre_acte`,`taxation`.`montant_global` AS `montant_global`,date_format(`taxation`.`date_taxation`,'%d-%m-%Y') AS `date_taxation`,`agent`.`nom` AS `nom_taxateur`,`fonction`.`libelle_fonction` AS `qualite_taxateur`,`contribuable`.`nom` AS `contribuable`,`contribuable`.`telephone` AS `telephone_contribuable`,`contribuable`.`avenue` AS `avenue`,`contribuable`.`numero` AS `numero`,`commune`.`libelle_commune` AS `commune`,`taxation`.`devise` AS `devise`,`taxation`.`id_taxation` AS `id_taxation`,`arrete`.`numero_arrete` AS `numero_arrete`,`taxe`.`description` AS `description` from (((((((`taxation` join `taxe` on(`taxation`.`id_taxe` = `taxe`.`id_taxe`)) join `service_assiette` on(`taxe`.`id_service_assiette` = `service_assiette`.`id_serviceAssiette`)) join `agent` on(`taxation`.`id_agent` = `agent`.`id_agent`)) join `fonction` on(`agent`.`id_fonction` = `fonction`.`id_fonction`)) join `contribuable` on(`taxation`.`id_contribuable` = `contribuable`.`id_contribuable`)) join `commune` on(`contribuable`.`id_commune` = `commune`.`id_commune`)) join `arrete` on(`taxe`.`id_taxe` = `arrete`.`id_taxe`)) where `taxation`.`state` = 'ord' or `taxation`.`state` = 'att';

-- ----------------------------
-- View structure for v_part_dosec
-- ----------------------------
DROP VIEW IF EXISTS `v_part_dosec`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_part_dosec` AS select `taxation`.`num_taxation` AS `num_taxation`,date_format(`taxation`.`date_taxation`,'%d-%m-%Y') AS `date_taxation`,date_format(`attestation`.`date_attestation`,'%d-%m-%Y') AS `date_attestation`,`attestation`.`montant` AS `montant`,`taxe`.`designation` AS `taxe`,`attestation`.`montant` * 0.45 AS `part_dosec`,`attestation`.`montant` * 0.55 AS `part_ministere` from ((`taxation` join `attestation` on(`taxation`.`id_taxation` = `attestation`.`id_taxation`)) join `taxe` on(`taxation`.`id_taxe` = `taxe`.`id_taxe`));

-- ----------------------------
-- View structure for v_taxation_ord
-- ----------------------------
DROP VIEW IF EXISTS `v_taxation_ord`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_taxation_ord` AS select `taxation`.`num_taxation` AS `num_taxation`,`taxation`.`montant` AS `montant`,`taxation`.`montant_global` AS `montant_global`,`taxation`.`devise` AS `devise`,`taxation`.`penalite` AS `penalite`,`taxation`.`id_taxation` AS `id_taxation`,date_format(`taxation`.`date_taxation`,'%d-%m-%Y') AS `date_taxation`,date_format(`taxation`.`date_validation`,'%d-%m-%Y') AS `date_validation`,`contribuable`.`nom` AS `nom`,`taxe`.`description` AS `taxe` from ((`taxation` join `contribuable` on(`taxation`.`id_contribuable` = `contribuable`.`id_contribuable`)) join `taxe` on(`taxation`.`id_taxe` = `taxe`.`id_taxe`)) where `taxation`.`state` = 'ord';

-- ----------------------------
-- Triggers structure for table document_mvt
-- ----------------------------
DROP TRIGGER IF EXISTS `update_stock_insert`;
delimiter ;;
CREATE TRIGGER `update_stock_insert` AFTER INSERT ON `document_mvt` FOR EACH ROW BEGIN
	IF NEW.type_mvt = 1 THEN
		UPDATE tbltaxe  SET stock_current = stock_current + NEW.qte WHERE idtaxe = NEW.id_document_taxe;
	ELSEIF NEW.type_mvt= 21 THEN
		UPDATE tbltaxe  SET stock_current = stock_current - NEW.qte WHERE idtaxe = NEW.id_document_taxe;
	ELSEIF NEW.type_mvt = 3 THEN
		UPDATE tbltaxe SET stock_current = NEW.qte WHERE idtaxe = NEW.id_document_taxe;
	END IF; 
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table document_mvt
-- ----------------------------
DROP TRIGGER IF EXISTS `update_stock_update`;
delimiter ;;
CREATE TRIGGER `update_stock_update` AFTER UPDATE ON `document_mvt` FOR EACH ROW BEGIN
	IF NEW.type_mvt = 1  AND NEW.date_cancel IS NOT NULL THEN
		UPDATE tbltaxe  SET stock_current = stock_current - NEW.qte WHERE idtaxe = NEW.id_document_taxe;
	ELSEIF NEW.type_mvt= 21 AND NEW.date_cancel IS NOT NULL  THEN
		UPDATE tbltaxe  SET stock_current = stock_current + NEW.qte WHERE idtaxe = NEW.id_document_taxe;
	END IF;
    
    
    END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
