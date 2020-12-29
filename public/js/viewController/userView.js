const checkbox = (data, id, index, label) => {
    let input;
    if (data === 1) {
        input = `
            <input class="custom-control-input input-success ${id}" type="checkbox" checked="checked" id="${id}-${index}"/>
            <label class="custom-control-label" for="${id}-${index}">${label}</label>
        `;
    }
    else {
        input = `
            <input class="custom-control-input input-success ${id}" type="checkbox" id="${id}-${index}"/>
            <label class="custom-control-label" for="${id}-${index}">${label}</label> 
        `;
    }
    return input;
};

//Render sites
const renderSite = (sites) => {
    return sites.map(el => {
        return `
            <option value="${el.id}">${el.lieu}</option>
        `;
    }).join();
};

//Render fonction
const renderFonction = (fonctions) => {
    return fonctions.map(el => {
        return `
            <option value="${el.id_fonction}">${el.libelle_fonction}</option>
        `;
    }).join();
};

//render btn
const renderBtn = (el)=>{
    if(el.active === 'false'){
        return `
            <a class="btn btn-primary btn-restore-user btn-sm rounded-0" href="#" data-row="${el.id_agent}">
                <i class="feather icon-refresh-ccw"></i>
            </a>
        
        `
    }
    else{
        return `
            <a class="btn btn-danger btn-delete-user btn-sm rounded-0" href="#" data-row="${el.id_agent}">
                <i class="feather icon-trash-2"></i>
            </a>
        `
    }
}


const rows = (data, site, fonction) => {
        return data.map((el,index)=>{
            return `
                <tr >
                  <td class="${el.active === 'false'?'bg-danger':''}">${el.nom}</td>
                  <td class="${el.active === 'false'?'bg-danger':''}">${el.prenom}</td>
                  <td class="${el.active === 'false'?'bg-danger':''}">${el.matricule}</td>
                  <td class="${el.active === 'false'?'bg-danger':''}">${el.sexe}</td>
                  <td class="${el.active === 'false'?'bg-danger':''}">${el.libelle_fonction}</td>
                  <td class="${el.active === 'false'?'bg-danger':''}">${el.login}</td>
                  <td>
                    <a class="btn btn-info btn-sm rounded-0 mr-1" href="#" data-toggle="modal" data-title="Operation" data-target=".bd-example-modal-lg-${el.id_agent}">
                        <i class="feather icon-edit"></i>
                    </a>
                    <div class="modal fade bd-example-modal-lg-${el.id_agent}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
                      <div class="modal-dialog modal-xl">
                        <div class="modal-content rounded-0">
                          <div class="modal-header bg-primary py-2">
                            <h5 class="modal-title text-light" id="myLargeModalLabel">Mises à jour de l'agent : ${el.nom}</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          </div>
                          <div class="modal-body">
                            <div class="alert-update-user-${el.id_agent}"></div>
                            <div class="card-body">
                              <form class="needs-validation form-update-user" data-id="${el.id_agent}">
                                <div class="container-error"></div>
                                <div class="row">
                                  <div class="col-sm-4">
                                    <div class="form-group">
                                      <label class="floating-label" for="">Nom</label>
                                      <span class="text-danger">*</span>
                                      <input class="nom form-control form-control-sm rounded-0" type="text"  value="${el.nom}"/>
                                    </div>
                                  </div>
                                  <div class="col-sm-4">
                                    <div class="form-group fill">
                                      <label class="floating-label" for="">Pr&eacute;nom</label>
                                      <span class="text-danger">*</span>
                                      <input class="form-control form-control-sm prenom" type="text"  value="${el.prenom}" aria-describedby="loginHelp"/>
                                      <small class="form-text text-muted" id="loginHelp">Attention! la modification du prénom entraine le changement du login.</small>
                                    </div>
                                  </div>
                                  <div class="col-sm-4">
                                    <div class="form-group">
                                      <label class="floating-label" for="">Sexe</label>
                                      <span class="text-danger">*</span>
                                      <select class="sexe form-control form-control-sm" >
                                        <option value="${el.sexe}" selected="" disabled="">${el.sexe}</option>
                                        <option value="masculin">Masculin</option>
                                        <option value="">Féminin</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="col-sm-4">
                                    <div class="form-group">
                                      <label class="floating-label" for="">Site</label>
                                      <span class="text-danger">*</span>
                                      <select class="site form-control form-control-sm" >
                                        <option value="${el.id_site}" selected="" disabled="">${el.lieu}</option>
                                        ${renderSite(site)}
                                      </select>
                                    </div>
                                  </div>
                                  <div class="col-sm-4">
                                    <div class="form-group fill">
                                      <label class="floating-label" for="">Matricule</label>
                                      <span class="text-danger">*</span>
                                      <input class="matricule form-control form-control-sm" type="text" aria-describedby="matriculeHelp"  value="${el.matricule}"/>
                                      <small class="form-text text-muted" id="lmatriculeHelp">Attention! la modification du matricule entraine le changement du login.</small>
                                    </div>
                                  </div>
                                  <div class="col-sm-4">
                                    <div class="form-group">
                                      <label class="floating-label" for="">Fonctions</label>
                                      <span class="text-danger">*</span>
                                      <select class="fonction form-control form-control-sm" >
                                        <option value="${el.id_fonction}" selected="" disabled="">${el.libelle_fonction}</option>
                                        ${renderFonction(fonction)}
                                      </select>
                                    </div>
                                  </div>
                                  <div class="col-sm-12">
                                    <h5 class="ml-0 p-0">Role*</h5>
                                  </div>
                                  <div class="col-sm-12">
                                    <div class="row">
                                      <div class="col-sm-4">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                          ${checkbox(el.taxer, 'taxer', index, 'Taxation')}
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                          ${checkbox(el.ordonnancer, 'ordonnancer', index, 'Ordonnancement')}
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                          ${checkbox(el.apurer, 'apurer', index, 'Apurement')}
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                          ${checkbox(el.encoder, 'encoder', index, 'Encodage')}
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                          ${checkbox(el.imprimer, 'imprimer', index, 'Impression des documents')}
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                            ${checkbox(el.rapport, 'rapport', index, 'Gestion des rapports')}
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                          ${checkbox(el.administrer, 'admin', index, 'Administration')}
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                          ${checkbox(el.gerer, 'gerer', index, 'Gestion des centres')}
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                          ${checkbox(el.stocker, 'stocker', index, 'Gestion de stock')}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-sm-12">
                                    <div class="float-right">
                                      <button class="btn btn-success btn-sm rounded-0 mr-2" type="submit">Enregistrer</button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span class="cont-button-user">
                        ${renderBtn(el)}
                    </span>
                  </td>
                </tr>
            `;
        }).join('')
};

export const templateUser = (data,site,fonction,container)=>{
    container.innerHTML = `<table class="table table-striped table-bordered" id="footer-search">
            <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Matricule</th>
                  <th>Sexe</th>
                  <th>Fonction</th>
                  <th>Login</th>
                  <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${rows(data,site,fonction)}
            </tbody>
            <tfoot>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Matricule</th>
                  <th>Sexe</th>
                  <th>Fonction</th>
                  <th>Login</th>
                  <th>Action</th>
                </tr>
            </tfoot>
        </table>`
}