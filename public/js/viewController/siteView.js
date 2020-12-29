import dom from '../utils/dom';

//Render sites
const renderCommune = (commune) => {
    return commune.map(el => {
        return `
            <option value="${el.id_commune}">${el.libelle_commune}</option>
        `;
    })
    .join();
};

//Render taxes
const renderTaxes = (data) => {
    return data.map(el => {
        return `
            <option value="${el.id_taxe}">${el.designation}</option>
        `;
    }).join();
};

//render btn
const renderBtn = (el) => {
    if (el.active === 'false') {
        return `
            <button class="btn btn-primary btn-restore-site btn-sm rounded-0" data-row="${el.id}">
                <i class="feather icon-refresh-ccw"></i>
            </button>
        `;
    }
    else {
        return `
            <button class="btn btn-danger btn-delete-site btn-sm rounded-0" data-row="${el.id}">
                <i class="feather icon-trash-2"></i>
            </button>
        `;
    }
};

const rows = (data, commune,taxes) => {
    return data.map(el=>{
        return `
            <tr class="ligne-${el.id}" data-id2="${el.id}">
              <td class="${el.active === 'false'?'bg-danger':''}">${el.province}</td>
              <td class="${el.active === 'false'?'bg-danger':''}">${el.commune}</td>
              <td class="${el.active === 'false'?'bg-danger':''}">${el.lieu}</td>
              <td class="${el.active === 'false'?'bg-danger':''}">${el.code}</td>
              <td class="${el.active === 'false'?'bg-danger':''}">${el.designation_operation}</td>
              <td class="col-action-site">
                <a class="btn btn-info btn-sm rounded-0 mr-1" data-id="${el.id}" href="#" data-toggle="modal" data-title="Operation" data-target=".bd-example-modal-lg-${el.id}">
                    <i class="feather icon-edit"></i>
                </a>
                <div class="modal fade bd-example-modal-lg-${el.id}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
                  <div class="modal-dialog modal-xl">
                    <div class="modal-content rounded-0">
                      <div class="modal-header bg-primary py-2">
                        <h5 class="modal-title text-light" id="myLargeModalLabel">Mises à jour du site : ${el.lieu}</h5>
                        <button class="close close-${el.id}" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                        <div class="alert-update-site-${el.id}"></div>
                        <div class="card-body">
                          <form class="needs-validation form-update-site" novalidate="" data-id="${el.id}">
                              <div class="container-error"></div>  
                              <div class="row">
                                  <div class="col-md-3">
                                    <div class="form-group">
                                      <label class="floating-label" for="province">Province</label>
                                      <input class="form-control form-control-sm rounded-0 province" type="text" disabled="" required="" value="KINSHASA"/>
                                    </div>
                                  </div>
                                  <div class="col-md-3">
                                    <div class="form-group">
                                      <label class="floating-label" for="commune-site">Commune</label>
                                      <span class="text-danger">*</span>
                                      <select class="form-control form-control-sm commune-site" required="">
                                        <option value="${el.id_commune}" selected="" disabled="">${el.commune}</option>
                                        ${renderCommune(commune)}
                                      </select>
                                    </div>
                                  </div>
                                  <div class="col-md-3">
                                    <div class="form-group fill">
                                      <label class="floating-label" for="lieu">Lieu</label>
                                      <span class="text-danger">*</span>
                                      <input class="form-control form-control-sm lieu" value="${el.lieu}" type="text" required=""/>
                                    </div>
                                  </div>
                                  <div class="col-md-3">
                                    <div class="form-group">
                                      <label class="floating-label" for="code">Code</label>
                                      <span class="text-danger">*</span>
                                      <input class="form-control form-control-sm code" value="${el.code}" type="text" required=""/>
                                    </div>
                                  </div>
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label class="floating-label" for="operation">Opération</label>
                                      <span class="text-danger">*</span>
                                      <select class="form-control form-control-sm operation" required="">
                                        <option value="${el.operation}" selected="" disabled="">${el.designation_operation}</option>
                                        ${renderTaxes(taxes)}
                                      </select>
                                    </div>
                                  </div>
                                  <div class="col-sm-12">
                                    <div class="float-right">
                                      <button class="btn btn-success btn-update-site btn-sm rounded-0 mr-2" type="submit">Enregistrer</button>
                                    </div>
                                  </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="cont-button-site">
                    ${renderBtn(el)}
                </span>
              </td>
            </tr>
        `;
    }).join('')
};

export const listSite = (data,commune,taxes,container)=>{
    container.innerHTML=`   
        <table class="table table-striped table-bordered nowrap" id="footer-search">
          <thead>
            <tr>
              <th>Ville</th>
              <th>Commune</th>
              <th>Lieu</th>
              <th>Code</th>
              <th>Opération</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${rows(data,commune,taxes)}
          </tbody>
          <tfoot>
            <tr>
              <th>Ville</th>
              <th>Commune</th>
              <th>Lieu</th>
              <th>Code</th>
              <th>Opération</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
    `
}