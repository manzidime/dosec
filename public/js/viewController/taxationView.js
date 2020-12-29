import {proprietesTaxation} from '../modelController/taxationModel';
import {getOneTaxe} from '../modelController/taxeModel';

const renderEcheance = async (idTaxe)=>{
    const taxe = await getOneTaxe(idTaxe)
    if(taxe.duree===6 || idTaxe==15){
        return `
            <select class="form-control form-control-sm required rounded-0" name="wizard-echeance" id="echeance">
                <option selected="selected" disabled="disabled" value="">Choix échéance</option>
                <option value="${taxe.duree}(x1)">Premier semestre</option>
                <option value="${taxe.duree}(x2)">Deuxième semestre</option>
            </select>
        `
    }
    else if(taxe.duree===12){
        return `
            <select class="form-control form-control-sm required rounded-0" name="wizard-echeance" id="echeance">
                <option value="${taxe.duree}">Annuelle</option>
            </select>
        `
    }
    else if(taxe.duree===3){
        return `
            <select class="form-control form-control-sm required rounded-0" name="wizard-echeance" id="echeance">
                <option value="${taxe.duree}">Trimestrielle</option>
            </select>
        `
    }
    else{
        return `
            <select class="form-control form-control-sm rounded-0 required" name="wizard-echeance" id="echeance" required="">
                <option selected readonly="" value="${taxe.duree}">Mensuelle</option>
            </select>
        `;
    }
}

const renderExercice = async (idTaxe)=>{
    const taxe = await getOneTaxe(idTaxe)
    return `
        <select class="form-control form-control-sm exercice required rounded-0" name="wizard-echeance">
            ${taxe.exercice?taxe.exercice.split(',').map(el=>`<option value="${el}">${el}</option>`).join(''):`<option value="${new Date().getFullYear()}">${new Date().getFullYear()}</option>`                                           } 
        </select>
    `
}

/*Description des fonctions "countOccurences" et "occurenceArticle":
    -Les deux fonctions commence par compter le nombre des mots dans un tableau
    -Cherche les mots qui sont identiques et les regroupent
    -Formate l'affichage en affichant que les éléments uniques et signifient le nombre de fois que ce mot est repeté
*/
function countOccurences(tab){
    var result = {};
    tab.forEach(function(elem){
        if(elem in result){
            result[elem] = ++result[elem];
        }
        else{
            result[elem] = 1;
        }
    });
    return result;
}
const occurenceArticle = (body)=>{
    const article = body.montant.map(el=>el.article)

    const occurence = countOccurences(article);
    const keys = Object.keys(occurence)
    const values = Object.values(occurence)

    return keys.map((el,index)=>{
        const obj = {}
        obj['article']=`${el}(x${values[index]})`
        return obj
    })
}
const renderCompte = (compte) => {
    return compte.map(el => {
        return `
            <option value="${el.id_compte}">${el.libelle_banque + '(' + el.num_compte + ')'}</option>
        `;
    }).join('');
};
const renderClass = (el) => {
    if (el.avis === 'non favorable' && el.active === 'true') return 'bg-warning';
    else if (el.avis === 'non favorable' && el.active === 'false') return 'bg-danger';
    else if (el.active === 'false') return 'bg-danger';
};
const renderBtn = (el,user) => {
    if(user.administrer){
        if (el.active === 'false') {
            return `
            <button class="btn btn-primary btn-restore-taxation btn-sm rounded-0" data-id="${el.id_taxation}">
                <i class="feather icon-refresh-ccw"></i>
            </button>
        
        `;
        } else {
            return `
            <button class="btn btn-danger btn-delete-taxation btn-sm rounded-0" data-id="${el.id_taxation}">
                <i class="feather icon-trash-2"></i>
            </button>
        `;
        }
    }
    else{
        return ''
    }
};
const renderBtnOrdonnancer = (el,user)=>{
    if(user.administrer || user.ordonnancer){
        return `
            <a class="btn btn-success mr-1 btn-sm rounded-0 btn-validate-taxation" href="#" data-toggle="modal" data-title="Validation" data-target=".validation-taxation-${el.id_taxation}">
                <i class="feather icon-check"></i>
              </a>
        `
    }
    else{
        return ''
    }
}
const renderArticleTaxation = (article)=>{
    return article.map(el=>{
        return `${el.article}`
    }).join('')
}
const renderMontantPropriete = (montant)=>{
    return montant.map(el=>{
        return `${el.article}: <strong>${el.montantArticle} ${el.devise}</strong>; `
    }).join('')
}
const vehiculesParContribuable = (vehicules) => {
    if (vehicules.length >= 1) {
        return vehicules.map(el => {
            return `
            <tr>
                <td style="font-size: 12px">${el.article_budgetaire}</td>    
                <td style="font-size: 12px">${el.numero_chassis}</td>    
                <td  style="font-size: 12px">${el.numero_plaque}</td>    
<!--                <td style="font-size: 11px">${el.model}</td>    -->
<!--                <td style="font-size: 11px">${el.marque}</td>    -->
<!--                <td style="font-size: 11px">${el.couleur}</td>    -->
                    <td class="text-center">
                    <div class="custom-control custom-checkbox custom-control-inline">
                      <input class="custom-control-input input-success propriete" data-article="${el.id_article_budgetaire}" data-designation="${el.article_budgetaire}" data-categorie="${el.id_categorie}" value="${el.id_propriete}" id="v-${el.id_propriete}" type="checkbox" required=""/>
                      <label class="custom-control-label" for="v-${el.id_propriete}"></label>
                    </div>
                </td>    
            </tr>
        `;
        }).join('');
    } else {
        return `
            <tr>
                <td class="text-center bg-danger" style="font-size: 13px" colspan="7">Aucune propriété n'est trouvée! 
                Le contribuable soit n'a pas encore de proprieté soit aucune de ses propriétés 
                n'est compatible avec cette opération</td>    
            </tr>
        `;
    }

};
const autreProprieteParContribuable = (vehicule) => {
    if (vehicule.length >= 1) {
        return vehicule.map(el => {
            return `
            <tr>
                <td style="font-size: 11px">${el.article_budgetaire}</td>     
                <td class="text-center">
                    <div class="custom-control custom-checkbox custom-control-inline">
                      <input class="custom-control-input input-success propriete" id="v-${el.id_propriete}" value="${el.id_propriete}" type="checkbox"  data-article="${el.id_article_budgetaire}" data-designation="${el.article_budgetaire}" data-categorie="${el.id_categorie}" required=""/>
                      <label class="custom-control-label" for="v-${el.id_propriete}"></label>
                    </div>
                </td>    
            </tr>
        `;
        }).join('');
    } else {
        return `
            <tr>
                <td class="text-center bg-danger" style="font-size: 13px" colspan="7">Aucune propriété n'est trouvée! 
                Le contribuable soit n'a pas encore de proprieté soit aucune de ses propriétés 
                n'est compatible avec cette opération</td>    
            </tr>
        `;
    }

};
const renderTableArticle = (service, taxe, vehicules, propriete) => {
    if (service == 1) {
        if (taxe == 15) {
            return `
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th style="font-size: 11px">Article</th>
                            <th style="font-size: 11px">Plaque</th>
                            <th style="font-size: 11px">Chassis</th>
<!--                            <th style="font-size: 10px">Model</th>-->
<!--                            <th style="font-size: 10px">Marque</th>-->
<!--                            <th style="font-size: 10px">Couleur</th>-->
                            <th style="font-size: 11px">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vehiculesParContribuable(vehicules)}
                    </tbody>
                </table>
            </div>
        `;
        }
        return `
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th style="font-size: 10px">Article</th>
                            <th style="font-size: 10px">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${autreProprieteParContribuable(vehicules)}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        return `
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th style="font-size: 10px">Article</th>
                            <th style="font-size: 10px">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${autreProprieteParContribuable(propriete)}
                    </tbody>
                </table>
            </div>
        `;
    }
};
const renderDetail = async(service, taxe, vehicules, propriete, taux) => {
    return `
            <div class="col-md-8">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header py-2 bg-primary">
                          <h5 class="text-light">Detail de la taxation</h5>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div class="col-sm-4">
                              <div class="form-group">
                                <label class="floating-label" for="nom_declarant">Nom déclarant</label>
                                <span class="text-danger">*</span>
                                <input class="form-control rounded-0 required form-control-sm" name="wizard-nom_declarant"  type="text" id="nom_declarant" />
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <label class="floating-label" for="telephone_declarant">Téléphone déclarant</label>
                                <span class="text-danger">*</span>
                                <input class="form-control rounded-0 form-control-sm required" name="wizard-telephone_declarant" type="text" id="telephone_declarant"/>
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group fill">
                                <label class="floating-label" for="Exercice">Exercice</label>
                                <span class="text-danger">*</span>
                                ${await renderExercice(taxe)}
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group fill">
                                <label class="floating-label" for="echeance">Echéance</label>
                                <span class="text-danger">*</span>
                                ${await renderEcheance(taxe)}
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <label class="floating-label" for="penalite">Penalite</label>
                              <span class="text-danger">*</span>
                              <input class="form-control rounded-0 required form-control-sm" name="wizard-penalite" type="number" id="penalite"/>
                            </div>
                            <div class="col-sm-4">
                              <label class="floating-label" for="taux">Taux</label>
                              <span class="text-danger">*</span>
                              <input class="form-control rounded-0 required form-control-sm" type="number" name="wizard-taux" readonly selected id="taux" value="${taux[0].valeur}"/>
                              <input class="form-control rounded-0 form-control-sm" type="hidden" readonly selected id="devise" value="${taux[0].devise}"/>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header py-2 bg-primary">
                          <h5 class="text-light">Choix propriété</h5>
                        </div>
                        <div class="card-body">
                          <div class="row">
                            <div class="col-sm-12">
                                ${renderTableArticle(service, taxe, vehicules, propriete)}
                            </div>
                            <div class="col-sm-12 text-right">
                              <button class="btn btn-success rounded-0 btn-validate-taxation btn-sm mr-2" type="button">Enregistrer</button>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
};
const titresTablePropriete = (taxe)=>{
    if(taxe===15){
        return `
            <tr>
                <th class="bg-dark text-light f-w-300">Nombre</th>
                <th class="bg-dark text-light f-w-300">Désignation</th>
                <th class="bg-dark text-light f-w-300">Montant</th>
                <th class="bg-dark text-light f-w-300">Devise</th>
                <th class="bg-dark text-light f-w-300">Chassis</th>
                <th class="bg-dark text-light f-w-300">Plaque</th>
                <th class="bg-dark text-light f-w-300">Model</th>
                <th class="bg-dark text-light f-w-300">Marque</th>
                <th class="bg-dark text-light f-w-300">Couleur</th>
          </tr>
        `
    }
    else{
        return `
            <tr>
                <th class="bg-dark text-light f-w-300">Nombre</th>
                <th class="bg-dark text-light f-w-300">Designation</th>
                <th class="bg-dark text-light f-w-300">Montant</th>
                <th class="bg-dark text-light f-w-300">Devise</th>
          </tr>
        `
    }
}
const tdTablePropriete = async(taxe,taxation)=>{
    const data = await proprietesTaxation(taxation);
    if(taxe===15){
        return data.map((el,index)=>{
            return `<tr>
                    <td>${index + 1}</td>
                    <td>${el.article}</td>
                    <td>${el.montant}</td>
                    <td>${el.devise}</td>
                    <td>${el.numero_chassis}</td>
                    <td>${el.numero_plaque}</td>
                    <td>${el.model}</td>
                    <td>${el.marque}</td>
                    <td>${el.couleur}</td>
                </tr>
        `
        }).join('')
    }
    else{
        return data.map((el,index)=>{
            return `<tr>
                    <td>${index + 1}</td>
                    <td>${el.article}</td>
                    <td>${el.montant}</td>
                    <td>${el.devise}</td>
                </tr>
        `
        }).join('')
    }
}
const templateTaxation = async(data, compte,user) => {
    const x = data.map(async(el, index) => {
        return `
          <tr class="row-data" data-row="${el.id_taxation}">
            <td class="${renderClass(el)}">${el.redevable}</td>
            <td class="${renderClass(el)}">${el.description}</td>
            <td class="${renderClass(el)}">${el.date_taxation}</td>
            <td class="${renderClass(el)}">${el.devise && el.devise === 'CDF' ?
            Math.round((el.montant * 1 / el.taux) * 100) / 100 : Math.round(el.montant * 100) / 100} USD</td>
            <td class="${renderClass(el)}">${el.devise && el.devise === 'USD' ?
            Math.round((el.montant * 1 * el.taux) * 100) / 100 : Math.round(el.montant * 100) / 100} CDF</td>
            <td>
              <a class="btn btn-info btn-sm rounded-0 mr-1 btn-edit" href="#" data-toggle="modal" data-title="Operation" data-id1="${el.id_taxation}" data-target=".bd-example-modal-lg-${el.id_taxation}">
                    <i class="feather icon-edit"></i>
              </a>
              ${renderBtnOrdonnancer(el,user)}
              <div class="modal fade bd-example-modal-lg-${el.id_taxation}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                  <div class="modal-content rounded-0">
                    <div class="modal-header bg-primary py-2">
                      <h5 class="modal-title text-light" id="myLargeModalLabel">Details</h5>
                      <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                      <div class="card-body">
                        <form class="needs-validation form-update-taxation" novalidate="" data-id="">
                          <table class="table table-sm table-borderless">
                            <tbody>
                              <tr>
                                <th class="bg-dark text-light f-w-300" scope="row">Taxe</th>
                                <td>${el.taxe}</td>
                              </tr>
                              <tr>
                                <th class="bg-dark text-light f-w-300" scope="row">Montant</th>
                                <td>${el.montant}</td>
                              </tr>
                              <tr>
                                <th class="bg-dark text-light f-w-300" scope="row">Pénalité</th>
                                <td>${Math.round((el.montant * 1) * (el.penalite * 1) / 100)}</td>
                              </tr>
                              <tr>
                                <th class="bg-dark text-light f-w-300" scope="row">Montant global</th>
                                <td>${el.montant_global}</td>
                              </tr>
                              <tr>
                                <th class="bg-dark text-light f-w-300" scope="row">Nom déclarant</th>
                                <td>${el.nom_declarant}</td>
                              </tr>
                              <tr>
                                <th class="bg-dark text-light f-w-300" scope="row">Téléphone déclarant</th>
                                <td>${el.telephone_declarant}</td>
                              </tr>
                              <tr>
                                <th class="bg-dark text-light f-w-300" scope="row">Contribuable</th>
                                <td>${el.redevable}</td>
                              </tr>
                              <tr>
                                <th class="bg-dark text-light f-w-300" scope="row">Observation</th>
                                <td>${el.observation?el.observation:''}</td>
                              </tr>
                              <tr>
                                <th class="bg-dark text-light f-w-300" scope="row">Proprieté</th>
                                <td>
                                  <table class="table table-sm">
                                    <thead>
                                      ${titresTablePropriete(el.id_taxe)}
                                    </thead>
                                    <tbody>
                                        ${await tdTablePropriete(el.id_taxe,el.id_taxation)}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal fade validation-taxation-${el.id_taxation}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
                  <div class="modal-dialog modal-xl">
                    <div class="modal-content rounded-0">
                      <div class="modal-header bg-primary py-2">
                        <h5 class="modal-title text-light" id="myLargeModalLabel">Validation Taxation</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                        <div class="card-body">
                          <form class="needs-validation form-validation-taxation" novalidate="" data-id="${el.id_taxation}">
                            <div class="container-alert-${el.id_taxation}"></div>
                            <div class="row row-avis">
                              <div class="col-sm-4">
                                <div class="form-group">
                                  <label class="floating-label" for="">Montant</label>
                                  <input class="form-control rounded-0 form-control-sm montant" type="text" disabled="disabled" value="${!el.montant ?
            0 + ' ' + el.devise : el.montant + ' ' + el.devise}" required=""/>
                                </div>
                              </div>
                              <div class="col-sm-4">
                                <div class="form-group">
                                  <label class="floating-label" for="">Pénalités</label>
                                  <input class="form-control rounded-0 form-control-sm penalite" type="text" disabled="disabled" value="${!el.penalite ?
            0 + ' ' + el.devise : Math.round((el.montant * 1) * (el.penalite * 1) / 100) + ' ' + el.devise}" required=""/>
                                </div>
                              </div>
                              <div class="col-sm-4">
                                <div class="form-group">
                                  <label class="floating-label" for="">Mont global</label>
                                  <input class="form-control rounded-0 form-control-sm montant_global" type="text" disabled="disabled" value="${!el.montant_global ?
            0 + ' ' + el.devise : el.montant_global + ' ' + el.devise}" required=""/>
                                </div>
                              </div>
                              <div class="col-sm-4">
                                <label class="floating-label" for="">Mode de paiement</label>
                                <select class="form-control compte form-control-sm rounded-0">
                                    ${renderCompte(compte)}
                                </select>
                              </div>
                              <div class="col-sm-4">
                                <label class="floating-label" for="avis">Avis</label>
                                <select class="form-control avis form-control-sm rounded-0" required>
                                  
                                  <option selected value="favorable">Favorable</option>
                                  <option value="non favorable">Non favorable</option>
                                </select>
                              </div>
                              <div class="col-sm-12 my-3">
                                <label class="floating-label" for="observation">Observation</label>
                                <input class="form-control rounded-0 form-control-sm observation-taxe" type="text" disabled="disabled"/>
                              </div>
                              <div class="col-sm-12 text-right">
                                <button class="btn btn-success btn-valid-taxation rounded-0 btn-sm mr-2" type="submit">Valider</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              ${renderBtn(el,user)}
             </td>
          </tr>
    `;
    })
    return await Promise.all(x)
};
export const resumeTaxation = (container,body) => {
    container.innerHTML = '';
    container.innerHTML = `
        <div class="col-md-12">
            <div class="card">
            <div class="row">
                <div class="col-md-12">
                    <div class="card-header py-2 bg-primary">
                        <h5 class="text-light">Confirmez avant de valider</h5>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <tr class="f-12">
                                <th class="wid-40">Taxe</th>
                                <td>${body.montant[0].taxe}</td>
                            </tr>
                            <tr class="f-12">
                                <th>Nombre article</th>
                                <td>${body.montant.length}</td>
                            </tr>
                            <tr class="f-12">
                                <th>Articles</th>
                                <td>${renderArticleTaxation(occurenceArticle(body))}</td>
                            </tr>
                            <tr class="f-12">
                                <th>Echeance</th>
                                <td>${body.echeance==12?'Annuelle':body.echeance==6?'Semestrielle':body.echeance=='6(x1)'?'Premier semestre':body.echeance=='6(x2)'?'Deuxième semestre':'Mensuelle'}</td>
                            </tr>
                            <tr class="f-12">
                                <th>Exercice</th>
                                <td>2020</td>
                            </tr>
                            <tr class="f-12">
                                <th>Nom declarant</th>
                                <td>${body.nom_declarant}</td>
                            </tr>
                            <tr class="f-12">
                                <th>Téléphone declarant</th>
                                <td>${body.telephone_declarant}</td>
                            </tr>
                            <tr class="f-12">
                                <th>Penalite</th>
                                <td><strong>${body.penalite?body.penalite:0} %</strong></td>
                            </tr>
                            <tr class="f-12">
                                <th>Montant par article</th>
                                <td>${renderMontantPropriete(body.montant)}</td>
                            </tr>
                            <tr class="f-12">
                                <th>Montant global</th>
                                <td><strong>${body.sumMontant} USD</strong></td>
                            </tr>
                            <tr class="f-12">
                                <th>Montant global avec penalité</th>
                                <td>${body.montantTotal} USD</td>
                            </tr>
                        </table>
                        <div class="col-md-12 text-right">
                            <button class="bg-primary btn btn-sm rounded-0 text-light confirme" type="button">Valider</button>
                            <button class="bg-danger btn btn-sm rounded-0 text-light cancel">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>   
            </div>
        </div>
    `;
};
export const listTaxation = async(data, compte, container,user) => {
    container.innerHTML = `<table class=" table table-striped table-bordered" id="footer-search">
            <thead>
                <tr >
                  <th>Redevable</th>
                  <th>Taxe</th>
                  <th>Date taxation</th>
                  <th>Montant USD</th>
                  <th>Montant CDF</th>
                  <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${await templateTaxation(data, compte,user) }
            </tbody>
            <tfoot>
                <tr>
                  <th>Redevable</th>
                  <th>Taxe</th>
                  <th>Date taxation</th>
                  <th>Montant USD</th>
                  <th>Montant CDF</th>
                  <th>Action</th>
                </tr>
            </tfoot>
        </table>`;
};
export const formulaire = async(container, contribuable, vehicules, propriete, service, taxe, taux) => {
    container.innerHTML = '';
    const template = `
        <div class="col-md-4">
            <div class="card">
                <div class="card-header py-2 bg-primary">
                  <h5 class="text-light">Identité du contribuable</h5>
                </div>
                <div class="card-body">
                  <table class="table table-bordered">
                    <tr>
                      <th class="f-12">Nom</th>
                      <td class="f-12">${contribuable.nom}</td>
                    </tr>
                    <tr>
                      <th class="f-12">Téléphone</th>
                      <td class="f-12">${contribuable.telephone}</td>
                    </tr>
                    <tr>
                      <th class="f-12">Ville</th>
                      <td class="f-12">${contribuable.ville}</td>
                    </tr>
                    <tr>
                      <th class="f-12">District</th>
                      <td class="f-12">${contribuable.libelle_district}</td>
                    </tr>
                    <tr>
                      <th class="f-12">Commune</th>
                      <td class="f-12">${contribuable.libelle_commune}</td>
                    </tr>
                    <tr>
                      <th class="f-12">Quartier</th>
                      <td class="f-12">${contribuable.libelle_quartier}</td>
                    </tr>
                    <tr>
                      <th class="f-12">Avenue</th>
                      <td class="f-12">${contribuable.avenue}</td>
                    </tr> 
                    <tr>
                      <th class="f-12">N°</th>
                      <td class="f-12">${contribuable.numero}</td>
                    </tr>
                  </table>
                </div>
            </div>
        </div>
        ${await renderDetail(service, taxe, vehicules, propriete, taux)}
        `;
    container.innerHTML = template;
};

