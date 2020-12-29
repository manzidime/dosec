import dom from '../utils/dom';

//render btn
const renderBtn = (el) => {
    if (el.active === 'false') {
        return `
            <button class="btn btn-primary btn-restore-service btn-sm rounded-0" data-row="${el.id_serviceAssiette}">
                <i class="feather icon-check"></i>
            </button>
        
        `;
    }
    else {
        return `
            <button class="btn btn-danger btn-delete-service btn-sm rounded-0" data-row="${el.id_serviceAssiette}">
                <i class="feather icon-trash-2"></i>
            </button>
        `;
    }
};

const templateAllService = (el) => {
    const template = `
        <tr class="ligne-${el.id_serviceAssiette}" data-id2="${el.id_serviceAssiette}">
          <td class="${el.active === 'false'?'bg-danger':''}">${el.designation}</td>
          <td class="${el.active === 'false'?'bg-danger':''}">${el.ministere}</td>
          <td class="${el.active === 'false'?'bg-danger':''}">${el.description}</td>
          <td class="col-action-site">
            <a class="btn btn-info btn-sm rounded-0 mr-1" data-id="${el.id_serviceAssiette}" href="#" data-toggle="modal" data-title="Operation" data-target=".bd-example-modal-lg-${el.id_serviceAssiette}">
                <i class="feather icon-edit"></i>
            </a>
            <div class="modal fade bd-example-modal-lg-${el.id_serviceAssiette}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true">
              <div class="modal-dialog modal-xl">
                <div class="modal-content rounded-0">
                  <div class="modal-header">
                    <h5 class="modal-title h4" id="myLargeModalLabel">Mises à jour du service : ${el.designation}</h5>
                    <button class="close close-${el.id_serviceAssiette}" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  </div>
                  <div class="modal-body">
                    <div class="card-body">
                      <form class="needs-validation form-update-service" novalidate="" data-id="${el.id_serviceAssiette}">
                          <div class="row">
                            <div class="col-sm-4">
                              <div class="form-group">
                                <label class="floating-label" for="designation">Service</label>
                                <input class="form-control form-control-sm rounded-0 designation" value="${el.designation}" type="text" required=""/>
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group fill">
                                <label class="floating-label" for="ministere">Ministère</label>
                                <input class="form-control form-control-sm ministere" value="${el.ministere}" type="text" required=""/>
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <label class="floating-label" for="description">Description</label>
                                <input class="form-control form-control-sm description" value="${el.description}" type="text" required=""/>
                              </div>
                            </div>
                            <div class="col-sm-12">
                              <div class="float-right">
                                <button class="btn btn-success btn-sm save-add rounded-0 mr-2" type="submit">Enregistrer</button>
                                <button class="btn btn-danger btn-sm rounded-0" type="Reset">Annuler</button>
                              </div>
                            </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ${renderBtn(el)}
          </td>
        </tr>
    `;
        document.querySelector('.content-table')
        .insertAdjacentHTML('beforeend', template);
};

export const searchService = (data, input,container, rows, page)=>{
    let matches = data.filter(el=>{
        const regex = new RegExp(`${input}`, 'gi')
        return el.designation.match(regex) || el.ministere.match(regex) || el.description.match(regex)
    })

    if(input.length === 0){
        matches = data
    }

    displayService(matches, container, rows, page)
}

export const displayService =  (items, wrapper, rows_per_page, page)=> {
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];
        templateAllService(item)
    }
}

export const paginationService = (items, pagination, rows_per_page,current_page,container)=> {
    pagination.innerHTML = "";

    let page_count = Math.ceil(items.length / rows_per_page);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButton(i, items,current_page,rows_per_page,container);
        pagination.appendChild(btn);
    }
}

function PaginationButton (page, items, current_page,rows,container) {

    let button = document.createElement('button');
    button.setAttribute('class', 'btn rounded-0 py-2 px-3')
    button.setAttribute('type', 'button')
    button.innerText = page;

    if (current_page === page){
        // button.classList.remove('btn-light')
        button.classList.add('btn-primary')
    }

    button.addEventListener('click', function () {
        current_page = page;
        displayService(items, container, rows, current_page);

        let current_btn = document.querySelector('#pagination button.btn-primary');
        current_btn.classList.remove('btn-primary');

        button.classList.add('btn-primary');
    });

    return button;
}