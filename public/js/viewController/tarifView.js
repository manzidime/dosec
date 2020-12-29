import dom from '../utils/dom';

export const renderEcheance = (idTaxe,taxeData,container,periodicite)=>{
    container.innerHTML=''
    periodicite.innerHTML=''
    const [taxe] = taxeData.filter(el=>el.id_taxe==idTaxe)
    if(taxe){
        container.innerHTML=`<option value="${taxe.duree}" selected="" disabled="">${taxe.duree} mois</option>`
        if(taxe.duree===6){
            periodicite.innerHTML = `<option value="6(x1)">Premier semestre</option><option value="6(x2)">Deuxième semestre</option>`
        }
        else if(taxe.duree===3){
            periodicite.innerHTML = `<option value="3(x1)">Premier trimestre</option>
                <option value="3(x2)">Deuxième trimestre</option>
                <option value="3(x3)">Troisième trimestre</option>
                <option value="3(x4)">Quartrième trimestre</option>`
        }
        else{
            periodicite.innerHTML = `<option value="">Annuelle</option>`
        }
    }
}

//render btn
const renderBtn = (el) => {
    if (el.active === 'false') {
        return `
            <button class="btn btn-primary btn-restore-tarif btn-sm rounded-0" data-row="${el.id_tarif}">
                <i class="feather icon-check"></i>
            </button>
        
        `;
    } else {
        return `
            <button class="btn btn-danger btn-delete-tarif btn-sm rounded-0" data-row="${el.id_tarif}">
                <i class="feather icon-trash-2"></i>
            </button>
        `;
    }
};

//renderTaxe
const renderTaxe = (taxe) => {
    return taxe.map(el => {
        return `
            <option value="${el.id_taxe}">${el.designation}</option>
        `;
    }).join('');
};

const renderCategorie = (categorie) => {
    return categorie.map(el => {
        return `
            <option value="${el.id_categorie}">${el.designation}</option>
        `;
    }).join('');
};

const renderArticle = (article) => {
    return article.map(el => {
        return `<option value="${el.id_article}">${el.designation}</option>`
    }).join('');
};

const rows = (data, taxe, categorie, article) => {
    return data.map(el=>{
        return `
        <tr class="ligne-${el.id_tarif}" data-id2="${el.id_tarif}">
          <td class="${el.active === 'false' ? 'bg-danger' : ''}">${el.code_taxe}</td>
          <td class="${el.active === 'false' ? 'bg-danger' : ''}">${el.categorie}</td>
          <td class="${el.active === 'false' ? 'bg-danger' : ''}">${el.article}</td>
          <td class="${el.active === 'false' ? 'bg-danger' : ''}">${el.exercice}</td>
          <td class="${el.active === 'false' ? 'bg-danger' : ''}">${el.echeance === '6(x1)' ? 'premier semestre' : el.echeance === '6(x2)' ? 'premier semestre':el.echeance === '3(x1)' ? 'premier trimestre':el.echeance === '3(x2)' ? 'deuxième trimestre':el.echeance === '12' ? 'Annuelle':
            'Mensuelle'}</td>
          <td class="${el.active === 'false' ? 'bg-danger' : ''}">${el.montant}</td>
          <td class="${el.active === 'false' ? 'bg-danger' : ''}">${el.devise}</td>
          <td class="col-action-site">
            <a class="btn btn-info btn-sm rounded-0 mr-1" data-id="${el.id_tarif}" href="#" data-toggle="modal" data-title="Operation" data-target=".bd-example-modal-lg-${el.id_tarif}">
                <i class="feather icon-edit"></i>
            </a>
            <div class="modal fade bd-example-modal-lg-${el.id_tarif}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
              <div class="modal-dialog modal-xl">
                <div class="modal-content rounded-0">
                  <div class="modal-header bg-primary py-2">
                    <h5 class="modal-title text-light" id="myLargeModalLabel">Mises à jour du tarif</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  </div>
                  <div class="modal-body">
                    <div class="card-body">
                        <form class="needs-validation form-update-tarif" data-id="${el.id_tarif}" novalidate="">
                          <div class="container-error"></div>
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="floating-label" for="categorie">Taxe</label>
                                <span class="text-danger">*</span>
                                <select class="form-control form-control-sm taxe-tarif" required="">
                                  <option value="${el.id_taxe}" selected="" disabled="">${el.taxe}</option>
                                  ${renderTaxe(taxe)}  
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="floating-label" for="categorie">Categories</label>
                                <span class="text-danger">*</span>
                                <select class="form-control form-control-sm categorie" required="">
                                  <option value="${el.id_categorie}" selected="" disabled="">${el.categorie}</option>
                                  ${renderCategorie(categorie)}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="d-block" for="article">Articles</label>
<!--                                <span class="text-danger">*</span>-->
                                <select class="form-control form-control-sm article js-example-basic-single2" style="width:100%">
                                  <option value="${el.id_article_budgetaire}" selected="" disabled="">${el.article}</option>
                                  ${renderArticle(article)}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group fill">
                                <label class="floating-label" for="exercice">Exercice</label>
                                <span class="text-danger">*</span>
                                <select class="form-control form-control-sm exercice-tarif" required="">
                                  <option value="${el.exercice}" selected="" disabled="">${el.exercice}</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="floating-label" for="echeance-tarif">Echeance</label>
                                <span class="text-danger">*</span>
                                <select class="form-control form-control-sm echeance-tarif" required="">
                                    <option value="${el.echeance}" selected="" disabled="">${el.echeance}</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="floating-label" for="periodicite">Periodicite</label>
                                <select class="form-control form-control-sm periodicite" required=""> 
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="floating-label" for="montant">Montant</label>
                                <span class="text-danger">*</span>
                                <input class="form-control form-control-sm montant" value="${el.montant}" type="number" required=""/>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="floating-label" for="montant">Devise</label>
                                <span class="text-danger">*</span>
                                <select class="form-control form-control-sm devise" required="">
                                    <option selected="" readonly="" value="${el.devise}">${el.devise}</option> 
                                    <option value="CDF">CDF</option> 
                                    <option value="USD">USD</option> 
                                </select>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="float-right">
                                <button class="btn btn-primary btn-sm btn-update-tarif rounded-0 mr-2" type="submit">Enregistrer</button>
                              </div>
                            </div>
                          </div>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span class="cont-button-tarif d-inline-block">
                ${renderBtn(el)}
            </span>
          </td>
        </tr>
    `;
    }).join('')
};

export const listTarif = (data, taxe, categorie, article, container) => {
    container.innerHTML = `
        <table class="table table-striped table-bordered nowrap" id="footer-search">
          <thead>
            <tr>
              <th>Taxe</th>
              <th>Caterogie</th>
              <th>Article budgétaire</th>
              <th>exercice</th>
              <th>echeance</th>
              <th>montant</th>
              <th>devise</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            ${rows(data, taxe, categorie, article)}
          </tbody>
          <tfoot>
            <tr>
              <th>Taxe</th>
              <th>Caterogie</th>
              <th>Article budgétaire</th>
              <th>exercice</th>
              <th>echeance</th>
              <th>montant</th>
              <th>devise</th>
              <th>action</th>
            </tr>
          </tfoot>
        </table>
    `;
};