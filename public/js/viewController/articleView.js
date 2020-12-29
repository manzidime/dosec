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
            <button class="btn btn-primary btn-restore-article btn-sm rounded-0" data-id="${el.id_article}">
                <i class="feather icon-refresh-ccw"></i>
            </button>
        
        `;
    }
    else {
        return `
            <button class="btn btn-danger btn-delete-article btn-sm rounded-0" data-id="${el.id_article}">
                <i class="feather icon-trash-2"></i>
            </button>
        `;
    }
};

const listArticle = (data,container,type) => {
    return data.map(el=>{
        return  `
          <tr class="row-data" data-row="${el.id_article}">
            <td class="${renderClass(el)}">${el.type}</td>
            <td class="${renderClass(el)}">${el.designation}</td>
            <td class="${renderClass(el)}">${el.description}</td>
            <td>
              <a class="btn btn-info btn-sm rounded-0 mr-1 btn-edit-article" href="#" data-toggle="modal" data-title="Operation" data-id="${el.id_article}" data-target=".bd-example-modal-lg-${el.id_article}">
                    <i class="feather icon-edit"></i>
              </a>
              <div class="modal fade bd-example-modal-lg-${el.id_article}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                  <div class="modal-content rounded-0">
                    <div class="modal-header">
                      <h5 class="modal-title h4" id="myLargeModalLabel">Details</h5>
                      <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                      <div class="card-body">
                        <form class="needs-validation form-update-article" novalidate="">
                          <div class="container-alert-${el.id_article}"></div>
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
                            <div class="col-md-12">
                              <div class="float-right">
                                <button class="btn btn-success btn-sm btn-update-article save-add rounded-0 mr-2" type="submit">Enregistrer</button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span class="cont-button-art">
                ${renderBtn(el)}
              </span>
             </td>
          </tr>
    `
    }).join('')
}

export const templateArticle = (data,container,type)=>{
    container.innerHTML = `<table class=" table table-striped table-bordered" id="footer-search">
            <thead>
                <tr>
                  <th>Type</th>
                  <th>Designation</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${listArticle(data,container,type)}
            </tbody>
            <tfoot>
                <tr>
                  <th>Type</th>
                  <th>Designation</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
            </tfoot>
        </table>`
}