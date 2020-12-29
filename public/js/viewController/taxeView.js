const renderService = (service)=>{
    return service.map(el=>{
        return `
            <option value="${el.id_serviceAssiette}">${el.designation}</option>
        `
    }).join('')
}

const renderType = (type)=>{
    return type.map(el=>{
        return `
            <option value="${el.id_type_objet}">${el.designation}</option>
        `
    }).join('')
}

const renderClass = (el)=>{
    if(el.active === 'false') return 'bg-danger'
}

const renderBtn = (el) => {
    if (el.active === 'false') {
        return `
            <button class="btn btn-primary btn-restore-taxe btn-sm rounded-0" data-id="${el.id_taxe}">
                <i class="feather icon-refresh-ccw"></i>
            </button>
        
        `;
    }
    else {
        return `
            <button class="btn btn-danger btn-delete-taxe btn-sm rounded-0" data-id="${el.id_taxe}">
                <i class="feather icon-trash-2"></i>
            </button>
        `;
    }
};

const listTax = (data,container,type,service) => {
    return data.map((el,index)=>{
        return  `
          <tr class="row-data" data-row="${el.id_taxe}">
            <td class="${renderClass(el)}">${el.type}</td>
            <td class="${renderClass(el)}">${el.service}</td>
            <td class="${renderClass(el)}">${el.designation}</td>
            <td class="${renderClass(el)}">${el.description}</td>
            <td class="${renderClass(el)}">${el.delai_jour}</td>
            <td class="${renderClass(el)}">${!el.periodicite?'non définie':el.periodicite}</td>
            <td>
              <a class="btn btn-info btn-sm rounded-0 mr-1 btn-edit-taxe" href="#" data-toggle="modal" data-title="Operation" data-id="${el.id_taxe}" data-target=".bd-example-modal-lg-${el.id_taxe}">
                    <i class="feather icon-edit"></i>
              </a>
              <div class="modal fade bd-example-modal-lg-${el.id_taxe}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                  <div class="modal-content rounded-0">
                    <div class="modal-header bg-primary py-2">
                      <h5 class="modal-title text-light" id="myLargeModalLabel">Details</h5>
                      <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                      <div class="card-body">
                        <form class="needs-validation form-update-taxe" novalidate="">
                          <div class="container-alert-${el.id_taxe}"></div>
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="floating-label" for="type">Type objet</label>
                                <select class="form-control form-control-sm type" required="">
                                    <option value="${el.id_type}" selected disabled>${el.type}</option>
                                    ${renderType(type)}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="floating-label" for="service">Service</label>
                                <select class="form-control form-control-sm service" required="">
                                  <option value="${el.id_service}" selected disabled>${el.service}</option>
                                  ${renderService(service)}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="floating-label" for="designation">Designation</label>
                                <input class="form-control form-control-sm designation" value="${el.designation}" type="text" required=""/>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="floating-label" for="description">Description</label>
                                <input class="form-control form-control-sm description" value="${el.description}" type="text" required=""/>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label class="floating-label" for="delai">Delai</label>
                                <input class="form-control form-control-sm delai" type="number" value="${el.delai_jour}" required=""/>
                              </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                  <label class="floating-label">Périodicité</label>
                                  <div class="input-daterange input-group" class="pc-datepicker-6">
                                    <input class="form-control periodicite-start form-control-sm rounded-0" type="text"/>
                                    <div class="input-group-append"><span class="input-group-text"><i>à</i></span></div>
                                    <input class="form-control periodicite-end form-control-sm rounded-0" type="text"/>
                                  </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                              <div class="float-right">
                                <button class="btn btn-success btn-sm btn-update-taxe save-add rounded-0 mr-2" type="submit">Enregistrer</button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span class="cont-button-tax">
                    ${renderBtn(el)}
              </span>
             </td>
          </tr>
    `
    }).join('')
}

export const template = (data,container,type,service)=>{
    container.innerHTML = `<table class="table table-striped table-bordered" id="footer-search2">
            <thead>
                <tr>
                  <th>Type</th>
                  <th>Service</th>
                  <th>Designation</th>
                  <th>Description</th>
                  <th>Delai</th>
                  <th>Periodicite</th>
                  <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${listTax(data,container,type,service)}
            </tbody>
            <tfoot>
                <tr>
                  <th>Type</th>
                  <th>Service</th>
                  <th>Designation</th>
                  <th>Description</th>
                  <th>Delai</th>
                  <th>Periodicite</th>
                  <th>Action</th>
                </tr>
            </tfoot>
        </table>`
}