//Render district
const renderDistrict = (district) => {
    return district.map(el => {
        return `
            <option value="${el.id_district}">${el.libelle_district}</option>
        `;
    })
    .join('');
};

//Render button delete and restore
const renderBtn = (el,user) => {
    if(user.administrer){
        if (el.active === 'false') {
            return `
            <button class="btn btn-primary btn-restore-contribuable btn-sm rounded-0" data-row="${el.id_contribuable}">
                <i class="feather icon-refresh-ccw"></i>
            </button>
        
        `;
        }
        else {
            return `
            <button class="btn btn-danger btn-delete-contribuable btn-sm rounded-0" data-row="${el.id_contribuable}">
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
            <a class="btn btn-info btn-sm rounded-0 mr-1 btn-edit" href="#" data-toggle="modal" data-title="Operation" data-target=".bd-example-modal-lg-${el.id_contribuable}">
                <i class="feather icon-edit"></i>
            </a>
        `
    }
    else{
        return ''
    }
}

const template = (data, district,user) => {
    return data.map(el=>{
        return `<tr class="row-data" data-row="${data.id_contribuable}">
            <td class="${el.active === 'false'?'bg-danger':''}">${el.nom}</td>
            <td class="${el.active === 'false'?'bg-danger':''}">${el.numero}-${el.avenue}-Q/${el.libelle_quartier}-C/${el.libelle_commune}</td>
            <td class="${el.active === 'false'?'bg-danger':''}">${el.telephone}</td>
            <td class="">
              ${renderBtnEdit(el,user)}
              <div class="modal fade bd-example-modal-lg-${el.id_contribuable}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                  <div class="modal-content rounded-0">
                    <div class="modal-header py-2 bg-primary">
                      <h5 class="modal-title h4 text-light" id="myLargeModalLabel">Mises à jour : ${el.nom.toUpperCase()}</h5>
                      <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="card-body">
                        <form class="needs-validation form-update-contribuable" data-id="${el.id_contribuable}">
                          <div class="container-alert-${el.id_contribuable}"></div>
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="" for="nom_personne">Nom</label>
                                <span class="text-danger">*</span>
                                <input class="form-control rounded-0 form-control-sm nom_personne" type="text" value="${el.nom}" required=""/>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="" for="telephone">T&eacute;l&eacute;phone</label>
                                <span class="text-danger">*</span>
                                <input class="form-control rounded-0 form-control-sm telephone" type="text" value="${el.telephone}" required=""/>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group fill">
                                <label class="" for="ville">Ville</label>
                                <input class="form-control form-control-sm rounded-0 ville" type="text" value="${el.ville}" disabled="disabled"/>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group fill">
                                <label class="" for="district">District</label>
                                <span class="text-danger">*</span>
                                <select class="form-control form-control-sm rounded-0 district" required="">
                                    <option value="${el.id_district}" disabled="" selected="">${el.libelle_district}</option>
                                    ${renderDistrict(district)}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="" for="commune">Commune</label>
                                <span class="text-danger">*</span>
                                <select class="form-control form-control-sm rounded-0 commune-${el.id_commune} commune" required="">
                                  <option value="${el.id_commune}" disabled="" selected="">${el.libelle_commune}</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="" for="quartier">Quartier</label>
                                <span class="text-danger">*</span>
                                <select class="form-control form-control-sm rounded-0 quartier" required="">
                                  <option value="${el.id_quartier}" disabled="disabled" selected="selected">${el.libelle_quartier}</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="" for="avenue">Avenue</label>
                                <span class="text-danger">*</span>
                                <input class="form-control form-control-sm rounded-0 avenue" type="text" value="${el.avenue}" required=""/>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="" for="numero">Num&eacute;ro</label>
                                <span class="text-danger">*</span>
                                <input class="form-control form-control-sm rounded-0 numero" type="text" value="${el.numero}" required=""/>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="" for="observation">Observation</label>
                                <input class="form-control form-control-sm rounded-0 observation" type="text" value="${el.observation}" required=""/>
                              </div>
                            </div>
                            <div class="col-md-12 text-right">
                              <button class="btn btn-success rounded-0 btn-sm mr-2 btn-update-contribuable" type="submit">Enregistrer</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                <span class="cont-button-contri">
                    ${renderBtn(el,user)}
                </span>
            </td>
          </tr>              
    `;

    }).join('')
};

export const listContribuable = (data,district,container,user)=>{
    container.innerHTML = `<table class=" table table-striped table-bordered" id="footer-search">
            <thead>
                <tr>
                  <th>Nom</th>
                  <th>Adresse</th>
                  <th>Téléphone</th>
                  <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${template(data,district,user)}
            </tbody>
            <tfoot>
                <tr>
                  <th>Nom</th>
                  <th>Adresse</th>
                  <th>Téléphone</th>
                  <th>Action</th>
                </tr>
            </tfoot>
        </table>`
}