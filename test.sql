CREATE TABLE `agent`  ();

CREATE TABLE `article_budgetaire`  ();

CREATE TABLE `attestation`  ();

CREATE TABLE `banque`  ();

CREATE TABLE `categorie`  ();

CREATE TABLE `compte`  ();

CREATE TABLE `fonction`  ();

CREATE TABLE `redevable`  ();

CREATE TABLE `service_assiete`  ();

CREATE TABLE `taux`  ();

CREATE TABLE `taxation`  ();

CREATE TABLE `taxation_valide`  ();

CREATE TABLE `taxe`  ();

CREATE TABLE `vehicule`  ();

ALTER TABLE `agent` ADD CONSTRAINT `fk_agent_fonction_1` FOREIGN KEY () REFERENCES `fonction` ();
ALTER TABLE `compte` ADD CONSTRAINT `fk_compte_banque_1` FOREIGN KEY () REFERENCES `banque` ();
ALTER TABLE `vehicule` ADD CONSTRAINT `fk_vehicule_redevable_1` FOREIGN KEY () REFERENCES `redevable` ();

