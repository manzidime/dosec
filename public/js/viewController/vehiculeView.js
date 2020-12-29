const renderCategorie = (categorie) => {
    return categorie.map(el => {
        return `
            <option value="${el.id_categorie}">${el.designation}</option>
        `;
    })
    .join('');
};

const renderType = (type)=>{
    return type.map(el=>{
        if(el.id_type_objet===1){
            return `
            <option value="${el.id_type_objet}">${el.designation}</option>
        `
        }

    }).join('')
}

const renderArticle = (article)=>{
    const articles =  article.filter(el=>{
        if(el.id_type===1){
            return el
        }

    })

    return articles.map(el=>{
        return `
            <option value="${el.id_article}">${el.designation}</option>
        `
    }).join('')
}

//Render button delete and restore
const renderBtn = (el,user) => {
    if(user.administrer){
        if (el.active === 'false') {
            return `
            <button class="btn btn-primary btn-restore-vehicule btn-sm rounded-0" data-row="${el.id_propriete}">
                <i class="feather icon-refresh-ccw"></i>
            </button>
        
        `;
        }
        else {
            return `
            <button class="btn btn-danger btn-delete-vehicule btn-sm rounded-0" data-row="${el.id_propriete}">
                <i class="feather icon-trash-2"></i>
            </button>
        `;
        }
    }
    else{
        return ''
    }
};

const renderBtnEdit = (el,user)=>{
    if(user.encoder || user.administrer){
        return `
             <a class="btn btn-info btn-sm rounded-0 mr-1 btn-edit" href="#" data-toggle="modal" data-title="Operation" 
            data-target=".bd-example-modal-lg-${el.id_propriete}">
                <i class="feather icon-edit"></i>
            </a>
        `
    }
    else{
        return ''
    }
}

const template = (data, categorie,type,articles,user) => {
    return data.map(el=>{
        return `
        <tr class="row-data" data-row="${el.id_propriete}">
          <td class="${el.active === 'false'?'bg-danger':''}">${el.contribuable}</td>
          <td class="${el.active === 'false'?'bg-danger':''}">${el.numero_plaque}</td>
          <td class="${el.active === 'false'?'bg-danger':''}">${el.article_budgetaire}</td>
          <td class="${el.active === 'false'?'bg-danger':''}">${el.model}</td>
          <td class="${el.active === 'false'?'bg-danger':''}">${el.marque}</td>
          <td class="${el.active === 'false'?'bg-danger':''}">${el.couleur}</td>
          <td>
            ${renderBtnEdit(el,user)}
            <div class="modal fade bd-example-modal-lg-${el.id_propriete}" tabindex="-1" role="dialog" 
            aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
              <div class="modal-dialog modal-xl">
                <div class="modal-content rounded-0">
                  <div class="modal-header bg-primary py-2">
                    <h5 class="modal-title text-light h4" id="myLargeModalLabel">Mises à jour</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  </div>
                  <div class="modal-body">
                    <div class="card-body">
                      <form class="needs-validation form-update-vehicule" novalidate="" data-id="${el.id_propriete}">
                        <div class="container-alert-${el.id_propriete}"></div>
                        <div class="row">
                          <div class="col-sm-3">
                            <div class="form-group">
                              <label class="floating-label" for="contribuable">Contribuable</label>
                              <span class="text-danger">*</span>
                              <select class="form-control  form-control-sm contribuable">
                                <option value="${el.id_contribuable}" disabled="disabled" readonly selected="selected">${el.contribuable}</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-group fill">
                              <label class="floating-label" for="category">Catégorie</label>
                              <span class="text-danger">*</span>
                              <select class="category form-control rounded-0 form-control-sm">
                                <option value="${el.id_categorie}" disabled="disabled" selected="selected">${el.categorie}</option>
                                ${renderCategorie(categorie)}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-group fill">
                              <label class="floating-label" for="type">Type</label>
                              <span class="text-danger">*</span>
                              <select class="type form-control form-control-sm rounded-0">
                                ${renderType(type)}   
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-group">
                              <label class="floating-label" for="articles">Article Budgétaire</label>
                              <span class="text-danger">*</span>
                              <select class="form-control form-control-sm article budge">
                                <option value="${el.id_article_budgetaire}" disabled="disabled" selected="">${el.article_budgetaire}</option>
                                ${renderArticle(articles)}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-group">
                              <label class="floating-label" for="chassis">Num&eacute;ro chassis</label>
                              <span class="text-danger">*</span>
                              <input class="form-control rounded-0 form-control-sm chassis" type="text" value="${el.numero_chassis}" required=""/>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-group">
                              <label class="floating-label" for="plaque">Num&eacute;ro plaque</label>
                              <span class="text-danger">*</span>
                              <input class="form-control rounded-0 form-control-sm plaque" type="text" value="${el.numero_plaque}" required=""/>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-group">
                              <div class="form-group fill">
                                <label class="floating-label" for="model">Model</label>
                                <span class="text-danger">*</span>
                                <input class="form-control rounded-0 form-control-sm model" type="text" value="${el.model}"/>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-group">
                              <label class="floating-label" for="marque">marque</label>
                              <span class="text-danger">*</span>
                              <input class="form-control rounded-0 form-control-sm marque" type="text" value="${el.marque}"/>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-group fill">
                              <label class="floating-label" for="couleur">Couleur</label>
                              <span class="text-danger">*</span>
                              <input class="couleur form-control rounded-0 form-control-sm" type="text" value="${el.couleur}"/>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-group fill">
                              <label class="floating-label" for="charge">Charge utile</label>
                              <span class="text-danger">*</span>
                              <input class="form-control rounded-0 form-control-sm charge" type="text" value="${el.charge_utile}"/>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div class="form-group fill">
                              <label class="floating-label" for="circulation">Date mise en circulation</label>
                              <span class="text-danger">*</span>
                              <input class="circulation form-control rounded-0 form-control-sm" id="pc-datepicker-1" value="${el.mise_en_circulation}" type="text"/>
                            </div>
                          </div>
                          <div class="col-sm-12 text-right">
                            <button class="btn btn-success rounded-0 btn-sm mr-2 btn-update-vehicule" type="submit">Enregistrer</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span class="cont-button-veh">
                ${renderBtn(el,user)}
            </span>
          </td>
        </tr>
    `;
    }).join('')
};

export const listVehicule = (data,categorie,type,articles,container,user)=>{
    container.innerHTML = `<table class=" table table-striped table-bordered" id="footer-search">
            <thead>
                <tr>
                  <th>Contribuable</th>
                  <th>Plaque</th>
                  <th>Article</th>
                  <th>Modèle</th>
                  <th>Marque</th>
                  <th>Couleur</th>
                  <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${template(data, categorie,type,articles,user)}
            </tbody>
            <tfoot>
                <tr>
                  <th>Contribuable</th>
                  <th>Plaque</th>
                  <th>Article</th>
                  <th>Modèle</th>
                  <th>Marque</th>
                  <th>Couleur</th>
                  <th>Action</th>
                </tr>
            </tfoot>
        </table>`
}