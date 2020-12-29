const renderType = (type, service) => {
    let types;
    if (service == 1) {
        types = type.filter(el => {
            return el.id_type_objet === 1;
        });
    } else if (service == 2) {
        types = type.filter(el => {
            return el.id_type_objet === 3;
        });
    }else if(service == 4){
        types = type.filter(el => {
            return el.id_type_objet === 4;
        });
    }
    else {
        types = type.filter(el => {
            return el.id_type_objet === 2;
        });
    }

    return types.map(el => {
        return `<option value="${el.id_type_objet}">${el.designation}</option>`;
    }).join('');

};

const renderCategorie = (categorie,service) => {
    let categories
    if(service==2){
        categories = categorie.filter(el=>{
            return el.id_categorie===1
        })
    }
    else if(service==4){
        categories = categorie.filter(el=>{
            return el.id_categorie===1 || el.id_categorie===2
        })
    }
    else{
        categories = categorie.filter(el=>{
            return el
        })
    }

    return categories.map(el => {
        return `<option value="${el.id_categorie}">${el.designation}</option>`;
    }).join('');
};

export const formulaireVehicule = (container, contribuable, type, categorie, service) => {
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
                      <th>Nom</th>
                      <td>${contribuable.nom}</td>
                    </tr>
                    <tr>
                      <th>Téléphone</th>
                      <td>${contribuable.telephone}</td>
                    </tr>
                    <tr>
                      <th>Ville</th>
                      <td>${contribuable.ville}</td>
                    </tr>
                    <tr>
                      <th>District</th>
                      <td>${contribuable.libelle_district}</td>
                    </tr>
                    <tr>
                      <th>Commune</th>
                      <td>${contribuable.libelle_commune}</td>
                    </tr>
                    <tr>
                      <th>Quartier</th>
                      <td>${contribuable.libelle_quartier}</td>
                    </tr>
                    <tr>
                      <th>Avenue</th>
                      <td>${contribuable.avenue}</td>
                    </tr> 
                    <tr>
                      <th>N°</th>
                      <td>${contribuable.numero}</td>
                    </tr>
                  </table>
                </div>
            </div>
        </div>  
        <div class="col-md-8">
            <div class="card">
                <div class="card-header py-2 bg-primary">
                  <h5 class="text-light">Information sur le vehicule</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-4">
                          <div class="form-group fill">
                            <label class="floating-label" for="category">Catégorie</label>
                            <select class="form-control form-control-sm rounded-0" id="category">
                              <option value="" selected="" disabled="">Veillez choisir une categorie</option>
                              ${renderCategorie(categorie,service)}
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group fill">
                            <label class="floating-label" for="type">Type</label>
                            <select class="form-control form-control-sm rounded-0" id="type">
                                <option value="" selected="" disabled="">Veillez choisir un type d'article</option>
                                ${renderType(type, service)}
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <label class="floating-label" for="articles">Article Budgétaire</label>
                          <select class="js-example-basic-single col-sm-12" id="articles" style="width: 100%"></select>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label class="floating-label" for="chassis">Num&eacute;ro chassis</label>
                            <input class="form-control form-control-sm rounded-0" autocomplete="off" type="text" id="chassis"/>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label class="floating-label" for="plaque">Num&eacute;ro plaque</label>
                            <input class="form-control form-control-sm rounded-0" autocomplete="off" type="text" id="plaque"/>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <div class="form-group fill">
                              <label class="floating-label" for="model">Model</label>
                              <input class="form-control form-control-sm rounded-0" autocomplete="off" type="text" id="model"/>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label class="floating-label" for="marque">marque</label>
                            <input class="form-control form-control-sm rounded-0" autocomplete="off" type="text" id="marque"/>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group fill">
                            <label class="floating-label" for="couleur">Couleur</label>
                            <input class="form-control form-control-sm rounded-0" autocomplete="off" id="couleur" type="text"/>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group fill">
                            <label class="floating-label" for="charge">Charge utile</label>
                            <input class="form-control form-control-sm rounded-0" autocomplete="off" type="text" id="charge"/>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group fill">
                            <label class="floating-label" for="pc-datepicker-1">Date mise en circulation</label>
                            <input class="circulation form-control form-control-sm rounded-0" autocomplete="off" type="text" id="pc-datepicker-1"/>
                          </div>
                        </div>
                        <div class="col-sm-12 text-right">
                          <button class="btn btn-success rounded-0 btn-sm mr-2 btn-new-propriete-vehicule" type="submit">Enregistrer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = template;
};

export const formulaireArticle = (container, type, contribuable, categorie, service) => {
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
                      <th>Nom</th>
                      <td>${contribuable.nom}</td>
                    </tr>
                    <tr>
                      <th>Téléphone</th>
                      <td>${contribuable.telephone}</td>
                    </tr>
                    <tr>
                      <th>Ville</th>
                      <td>${contribuable.ville}</td>
                    </tr>
                    <tr>
                      <th>District</th>
                      <td>${contribuable.libelle_district}</td>
                    </tr>
                    <tr>
                      <th>Commune</th>
                      <td>${contribuable.libelle_commune}</td>
                    </tr>
                    <tr>
                      <th>Quartier</th>
                      <td>${contribuable.libelle_quartier}</td>
                    </tr>
                    <tr>
                      <th>Avenue</th>
                      <td>${contribuable.avenue}</td>
                    </tr> 
                    <tr>
                      <th>N°</th>
                      <td>${contribuable.numero}</td>
                    </tr>
                  </table>
                </div>
            </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-header py-2 bg-primary">
              <h5 class="text-light">Article budgétaire</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group fill">
                    <label class="floating-label" for="category">Type d'article budgétaire</label>
                    <span class="text-danger">*</span>
                    <select class="form-control form-control-sm rounded-0" id="type">
                      <option value="" selected="" disabled="">Veillez choisir un type d'article</option>
                      ${renderType(type, service)}
                    </select>
                  </div>
                </div>
                <div class="col-sm-4">
                  <label class="floating-label" for="articles">Article Budgétaire</label>
                  <span class="text-danger">*</span>
                  <select class="js-example-basic-single col-sm-12 required" id="articles" style="width: 100%"></select>
                </div>
                <div class="col-sm-4">
                  <label class="floating-label" for="articles">Catégorie</label>
                  <span class="text-danger">*</span>
                  <select class="form-control form-control-sm rounded-0 required" id="categorie">
                    ${renderCategorie(categorie,service)}
                  </select>
                </div>
                <div class="col-sm-12 text-right">
                  <button class="btn btn-success rounded-0 btn-new-propriete-article btn-sm mr-2" type="submit">Enregistrer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
    container.innerHTML = template;
};